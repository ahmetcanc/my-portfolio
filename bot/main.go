package main

import (
	"bytes"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"regexp"
	"sort"
	"strings"
	"time"
)

const (
	blogFilePath     = "../src/data/blog.json"
	groqURL          = "https://api.groq.com/openai/v1/chat/completions"
	goDownloadsURL   = "https://go.dev/dl/?mode=json"
	goBlogFeedURL    = "https://go.dev/blog/feed.atom"
	modelName        = "llama-3.3-70b-versatile"
	maxAttempts      = 4
	recentPostsLimit = 12
	goBlogLimit      = 5
)

var slugPattern = regexp.MustCompile(`^[a-z0-9]+(?:-[a-z0-9]+)*$`)
var unsupportedScriptPattern = regexp.MustCompile(`[\p{Han}\p{Hiragana}\p{Katakana}\p{Hangul}]`)

var stopWords = map[string]struct{}{
	"a": {}, "an": {}, "and": {}, "architecture": {}, "backend": {}, "control": {},
	"deep": {}, "design": {}, "dive": {}, "for": {}, "golang": {}, "in": {},
	"into": {}, "mastering": {}, "of": {}, "or": {}, "patterns": {}, "system": {},
	"the": {}, "to": {}, "with": {},
}

type LocalizedString struct {
	TR string `json:"tr"`
	EN string `json:"en"`
}

type BlogPost struct {
	ID      string          `json:"id"`
	Slug    string          `json:"slug"`
	Date    string          `json:"date"`
	Title   LocalizedString `json:"title"`
	Excerpt LocalizedString `json:"excerpt"`
	Content LocalizedString `json:"content"`
}

type Request struct {
	Model          string    `json:"model"`
	Messages       []Message `json:"messages"`
	ResponseFormat *Format   `json:"response_format,omitempty"`
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type Format struct {
	Type string `json:"type"`
}

type Response struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

type GoRelease struct {
	Version string `json:"version"`
	Stable  bool   `json:"stable"`
}

type AtomFeed struct {
	Entries []AtomEntry `xml:"entry"`
}

type AtomEntry struct {
	Title   string `xml:"title"`
	Updated string `xml:"updated"`
	Link    struct {
		Href string `xml:"href,attr"`
	} `xml:"link"`
	Summary string `xml:"summary"`
}

func main() {
	apiKey := strings.TrimSpace(os.Getenv("GEMINI_API_KEY"))
	if apiKey == "" {
		log.Fatal("ERROR: GEMINI_API_KEY environment variable not set!")
	}

	posts, err := loadPosts(blogFilePath)
	if err != nil {
		log.Fatal(err)
	}

	recentPosts := summarizeRecentPosts(posts, recentPostsLimit)
	goSources := fetchGoSourceSummary()
	feedback := ""
	var newPost BlogPost

	for attempt := 1; attempt <= maxAttempts; attempt++ {
		prompt := buildPrompt(recentPosts, goSources, feedback)
		candidate, raw, err := generatePost(apiKey, prompt)
		if err != nil {
			feedback = fmt.Sprintf("Previous attempt failed because the response was invalid: %v. Return only valid JSON.", err)
			log.Printf("Attempt %d failed: %v", attempt, err)
			continue
		}

		candidate.ID = fmt.Sprintf("%d", time.Now().Unix())
		candidate.Date = time.Now().Format("2006-01-02")

		if err := validatePost(candidate, posts); err != nil {
			feedback = fmt.Sprintf("Previous attempt was rejected: %v. Pick a different topic and return higher quality content.", err)
			log.Printf("Attempt %d rejected: %v\nRaw content: %s", attempt, err, raw)
			continue
		}

		newPost = candidate
		break
	}

	if newPost.Slug == "" {
		log.Fatalf("failed to generate a unique high-quality post after %d attempts", maxAttempts)
	}

	if err := appendPost(blogFilePath, newPost); err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Successfully added new blog post: %s\n", newPost.Title.TR)
}

func loadPosts(filePath string) ([]BlogPost, error) {
	fileData, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("blog.json not found: %w", err)
	}

	var posts []BlogPost
	if err := json.Unmarshal(fileData, &posts); err != nil {
		return nil, fmt.Errorf("json parse error: %w", err)
	}

	return posts, nil
}

func summarizeRecentPosts(posts []BlogPost, limit int) string {
	if len(posts) == 0 {
		return "- No prior posts yet."
	}

	if len(posts) < limit {
		limit = len(posts)
	}

	var lines []string
	for i := 0; i < limit; i++ {
		post := posts[i]
		lines = append(lines, fmt.Sprintf("- slug: %s | title: %s", post.Slug, post.Title.EN))
	}

	return strings.Join(lines, "\n")
}

func fetchGoSourceSummary() string {
	var sections []string

	if releaseSummary, err := fetchGoReleaseSummary(); err != nil {
		log.Printf("Go release source unavailable: %v", err)
		sections = append(sections, "- Latest Go release: unavailable from go.dev/dl at generation time.")
	} else {
		sections = append(sections, releaseSummary)
	}

	if blogSummary, err := fetchGoBlogSummary(goBlogLimit); err != nil {
		log.Printf("Go blog source unavailable: %v", err)
		sections = append(sections, "- Recent Go blog posts: unavailable from go.dev/blog/feed.atom at generation time.")
	} else {
		sections = append(sections, blogSummary)
	}

	return strings.Join(sections, "\n")
}

func fetchGoReleaseSummary() (string, error) {
	body, err := fetchURL(goDownloadsURL)
	if err != nil {
		return "", err
	}

	var releases []GoRelease
	if err := json.Unmarshal(body, &releases); err != nil {
		return "", fmt.Errorf("parse go releases: %w", err)
	}

	if len(releases) == 0 {
		return "", fmt.Errorf("no Go releases returned")
	}

	var stableVersions []string
	for _, release := range releases {
		if release.Stable {
			stableVersions = append(stableVersions, release.Version)
		}
		if len(stableVersions) == 2 {
			break
		}
	}

	if len(stableVersions) == 0 {
		stableVersions = append(stableVersions, releases[0].Version)
	}

	return fmt.Sprintf("- Latest official Go stable versions from go.dev/dl: %s.", strings.Join(stableVersions, ", ")), nil
}

func fetchGoBlogSummary(limit int) (string, error) {
	body, err := fetchURL(goBlogFeedURL)
	if err != nil {
		return "", err
	}

	var feed AtomFeed
	if err := xml.Unmarshal(body, &feed); err != nil {
		return "", fmt.Errorf("parse Go blog feed: %w", err)
	}

	if len(feed.Entries) == 0 {
		return "", fmt.Errorf("no Go blog entries returned")
	}

	if len(feed.Entries) < limit {
		limit = len(feed.Entries)
	}

	lines := []string{"- Recent official Go blog posts:"}
	for i := 0; i < limit; i++ {
		entry := feed.Entries[i]
		lines = append(lines, fmt.Sprintf("  - %s (%s) %s", strings.TrimSpace(entry.Title), shortDate(entry.Updated), strings.TrimSpace(entry.Link.Href)))
	}

	return strings.Join(lines, "\n"), nil
}

func fetchURL(url string) ([]byte, error) {
	client := &http.Client{Timeout: 20 * time.Second}
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}
	req.Header.Set("User-Agent", "my-portfolio-blog-bot/1.0")

	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("fetch %s: %w", url, err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read %s: %w", url, err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("%s returned %d: %s", url, resp.StatusCode, string(body))
	}

	return body, nil
}

func shortDate(value string) string {
	if len(value) >= len("2006-01-02") {
		return value[:len("2006-01-02")]
	}

	return value
}

func buildPrompt(recentPosts, goSources, feedback string) string {
	sections := []string{
		"You are an expert Senior Backend Engineer and Golang Developer.",
		"Write a highly technical, deep-dive blog post about ONE specific advanced concept in Golang, System Design, or Backend Architecture.",
		"When discussing recent Go releases or Go project news, rely only on the official Go source summary below.",
		"CRITICAL RULES:",
		"1. The title MUST be specific to the chosen technical topic.",
		"2. You MUST write in BOTH flawless, native English (en) AND flawless, native Turkish (tr).",
		"3. Ensure the Turkish text contains no mixed-language artifacts or broken wording.",
		"4. The topic must be materially different from the recent posts listed below.",
		"5. Avoid generic concurrency/channel/goroutine overviews unless the angle is clearly advanced and different from previous posts.",
		"6. Output STRICTLY as a valid JSON object. No preamble, no markdown formatting around the JSON itself.",
		"7. The slug must be unique, kebab-case, and aligned with the topic.",
		"8. Each content field must be a substantial Markdown article with concrete tradeoffs, implementation details, and at least one valid code example when relevant.",
		"9. Do not invent APIs, functions, packages, or kernel capabilities. If the topic needs code, use compilable or explicitly pseudocode examples.",
		"10. Do not use Chinese, Japanese, Korean, Cyrillic, or other non-Turkish/non-English script characters anywhere in the response.",
		"11. If the official source summary does not mention a claimed recent Go release or feature, do not claim it exists.",
		"JSON Schema:",
		`{
  "slug": "kebab-case-specific-english-slug",
  "title": {
    "tr": "Konuya Ozel Carpici ve Teknik Turkce Baslik",
    "en": "Specific and Catchy English Title"
  },
  "excerpt": {
    "tr": "2 cumlelik, merak uyandiran kusursuz Turkce ozet.",
    "en": "A compelling 2-sentence summary in English."
  },
  "content": {
    "tr": "Markdown formatinda, detayli, kod ornekli Turkce teknik makale.",
    "en": "Detailed technical article with code examples in Markdown, written in fluent English."
  }
}`,
		"Official Go source summary:",
		goSources,
		"Recent posts to avoid repeating:",
		recentPosts,
	}

	if feedback != "" {
		sections = append(sections, "Additional correction from the previous attempt:", feedback)
	}

	return strings.Join(sections, "\n\n")
}

func generatePost(apiKey, prompt string) (BlogPost, string, error) {
	reqBody := Request{
		Model: modelName,
		Messages: []Message{
			{Role: "user", Content: prompt},
		},
		ResponseFormat: &Format{Type: "json_object"},
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return BlogPost{}, "", fmt.Errorf("request body marshal error: %w", err)
	}

	req, err := http.NewRequest("POST", groqURL, bytes.NewBuffer(jsonData))
	if err != nil {
		return BlogPost{}, "", fmt.Errorf("request creation error: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 90 * time.Second}

	resp, err := client.Do(req)
	if err != nil {
		return BlogPost{}, "", fmt.Errorf("api request failed: %w", err)
	}
	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return BlogPost{}, "", fmt.Errorf("failed to read response body: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return BlogPost{}, string(bodyBytes), fmt.Errorf("api error: %d - %s", resp.StatusCode, string(bodyBytes))
	}

	var apiResp Response
	if err := json.Unmarshal(bodyBytes, &apiResp); err != nil {
		return BlogPost{}, string(bodyBytes), fmt.Errorf("failed to parse response: %w", err)
	}

	if len(apiResp.Choices) == 0 {
		return BlogPost{}, string(bodyBytes), fmt.Errorf("AI returned empty response")
	}

	rawContent := strings.TrimSpace(apiResp.Choices[0].Message.Content)
	rawContent = strings.TrimPrefix(rawContent, "```json")
	rawContent = strings.TrimPrefix(rawContent, "```")
	rawContent = strings.TrimSuffix(rawContent, "```")
	rawContent = strings.TrimSpace(rawContent)

	var newPost BlogPost
	if err := json.Unmarshal([]byte(rawContent), &newPost); err != nil {
		return BlogPost{}, rawContent, fmt.Errorf("json parse error on AI output: %w", err)
	}

	return newPost, rawContent, nil
}

func validatePost(newPost BlogPost, posts []BlogPost) error {
	if err := validateRequiredFields(newPost); err != nil {
		return err
	}

	if !slugPattern.MatchString(newPost.Slug) {
		return fmt.Errorf("slug must be lowercase kebab-case: %s", newPost.Slug)
	}

	if len(newPost.Excerpt.EN) < 120 || len(newPost.Excerpt.TR) < 120 {
		return fmt.Errorf("excerpt is too short for a technical article")
	}

	if len(newPost.Content.EN) < 900 || len(newPost.Content.TR) < 900 {
		return fmt.Errorf("content is too short for a deep-dive post")
	}

	if hasUnsupportedScript(newPost) {
		return fmt.Errorf("post contains unsupported script characters")
	}

	for _, post := range posts {
		if post.Slug == newPost.Slug {
			return fmt.Errorf("slug already exists: %s", newPost.Slug)
		}

		titleSimilarity := similarityScore(post.Title.EN, newPost.Title.EN)
		slugSimilarity := similarityScore(post.Slug, newPost.Slug)
		if titleSimilarity >= 0.60 || slugSimilarity >= 0.75 {
			return fmt.Errorf("topic is too similar to an existing post: %s", post.Title.EN)
		}
	}

	return nil
}

func hasUnsupportedScript(post BlogPost) bool {
	values := []string{
		post.Slug,
		post.Title.TR,
		post.Title.EN,
		post.Excerpt.TR,
		post.Excerpt.EN,
		post.Content.TR,
		post.Content.EN,
	}

	for _, value := range values {
		if unsupportedScriptPattern.MatchString(value) {
			return true
		}
	}

	return false
}

func validateRequiredFields(post BlogPost) error {
	fields := map[string]string{
		"slug":       post.Slug,
		"title.tr":   post.Title.TR,
		"title.en":   post.Title.EN,
		"excerpt.tr": post.Excerpt.TR,
		"excerpt.en": post.Excerpt.EN,
		"content.tr": post.Content.TR,
		"content.en": post.Content.EN,
	}

	for name, value := range fields {
		if strings.TrimSpace(value) == "" {
			return fmt.Errorf("missing required field: %s", name)
		}
	}

	return nil
}

func similarityScore(a, b string) float64 {
	aTokens := tokenize(a)
	bTokens := tokenize(b)
	if len(aTokens) == 0 || len(bTokens) == 0 {
		return 0
	}

	intersection := 0
	union := make(map[string]struct{}, len(aTokens)+len(bTokens))
	for token := range aTokens {
		union[token] = struct{}{}
		if _, ok := bTokens[token]; ok {
			intersection++
		}
	}
	for token := range bTokens {
		union[token] = struct{}{}
	}

	return float64(intersection) / float64(len(union))
}

func tokenize(input string) map[string]struct{} {
	normalized := strings.ToLower(input)
	normalized = strings.NewReplacer("-", " ", "_", " ", ":", " ", "/", " ").Replace(normalized)

	parts := strings.FieldsFunc(normalized, func(r rune) bool {
		return (r < 'a' || r > 'z') && (r < '0' || r > '9')
	})

	tokens := make(map[string]struct{}, len(parts))
	for _, part := range parts {
		if len(part) < 3 {
			continue
		}
		if _, blocked := stopWords[part]; blocked {
			continue
		}
		tokens[part] = struct{}{}
	}

	return tokens
}

func appendPost(filePath string, newPost BlogPost) error {
	posts, err := loadPosts(filePath)
	if err != nil {
		return err
	}

	posts = append([]BlogPost{newPost}, posts...)
	sort.SliceStable(posts, func(i, j int) bool {
		return posts[i].Date > posts[j].Date
	})

	updatedData, err := json.MarshalIndent(posts, "", "  ")
	if err != nil {
		return fmt.Errorf("json marshal error: %w", err)
	}

	if err := os.WriteFile(filePath, updatedData, 0644); err != nil {
		return fmt.Errorf("blog.json write error: %w", err)
	}

	return nil
}
