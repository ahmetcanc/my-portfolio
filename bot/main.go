package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

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

type GroqRequest struct {
	Model          string        `json:"model"`
	Messages       []GroqMessage `json:"messages"`
	ResponseFormat *GroqFormat   `json:"response_format,omitempty"`
}

type GroqMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type GroqFormat struct {
	Type string `json:"type"`
}

type GroqResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

func main() {
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		log.Fatal("ERROR: GEMINI_API_KEY environment variable not set!")
	}

	prompt := `You are a Senior Backend Engineer, Golang Expert, and Tech Blogger.
	Your task is to identify and analyze the most significant developments in the Backend, Golang, and Developer AI ecosystem from the past 7 days.
	
	Choose 1 or 2 of the most impactful topics. Write an engaging, insightful blog post where you:
	1. Report the actual news, tool, or development.
	2. Provide your expert commentary and analysis on how this affects backend developers.
	
	You must output the result STRICTLY as a valid JSON object. Do not include any introductory text.
	The content must be provided in both Turkish ("tr") and English ("en"). Use Markdown formatting inside the "content" fields.
	
	JSON Schema:
	{
		"slug": "kebab-case-short-english-slug",
		"title": {
			"tr": "Turkish Title",
			"en": "English Title"
		},
		"excerpt": {
			"tr": "A compelling 2-sentence summary in Turkish.",
			"en": "A compelling 2-sentence summary in English."
		},
		"content": {
			"tr": "Detailed Turkish content with your commentary, using Markdown.",
			"en": "Detailed English content with your commentary, using Markdown."
		}
	}`

	reqBody := Request{
		Model: "llama3-70b-8192",
<<<<<<< Updated upstream
		Messages: []Message{
			{Role: "system", Content: prompt},
=======
		Messages: []GroqMessage{
			{Role: "user", Content: prompt},
>>>>>>> Stashed changes
		},
		ResponseFormat: &Format{Type: "json_object"},
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		log.Fatalf("Request body marshal error: %v", err)
	}

	req, err := http.NewRequest("POST", "https://api..com/openai/v1/chat/completions", bytes.NewBuffer(jsonData))
	if err != nil {
		log.Fatalf("Request creation error: %v", err)
	}

	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 60 * time.Second}

	fmt.Println("Waiting for  (Llama 3) AI Response...")
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("API request failed: %v", err)
	}
	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Failed to read response body: %v", err)
	}

	if resp.StatusCode != http.StatusOK {
		log.Fatalf("API Error: %d - %s", resp.StatusCode, string(bodyBytes))
	}

	var Resp Response
	if err := json.Unmarshal(bodyBytes, &Resp); err != nil {
		log.Fatalf("Failed to parse  response: %v\nRaw: %s", err, string(bodyBytes))
	}

	if len(Resp.Choices) == 0 {
		log.Fatal("AI returned empty response.")
	}

	rawContent := Resp.Choices[0].Message.Content
	rawContent = strings.TrimPrefix(rawContent, "```json\n")
	rawContent = strings.TrimSuffix(rawContent, "\n```")

	var newPost BlogPost
	err = json.Unmarshal([]byte(rawContent), &newPost)
	if err != nil {
		log.Fatalf("JSON Parse Error on AI output: %v\nRaw Content: %s", err, rawContent)
	}

	newPost.ID = fmt.Sprintf("%d", time.Now().Unix())
	newPost.Date = time.Now().Format("2006-01-02")

	updateJSONFile(newPost)
}

func updateJSONFile(newPost BlogPost) {
	filePath := "../src/data/blog.json"

	fileData, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatalf("Blog.json Not Found: %v", err)
	}

	var posts []BlogPost
	if err := json.Unmarshal(fileData, &posts); err != nil {
		log.Fatalf("JSON Parse Error: %v", err)
	}

	posts = append([]BlogPost{newPost}, posts...)

	updatedData, err := json.MarshalIndent(posts, "", "  ")
	if err != nil {
		log.Fatalf("JSON Marshal Error: %v", err)
	}

	if err := os.WriteFile(filePath, updatedData, 0644); err != nil {
		log.Fatalf("Blog.json Write Error: %v", err)
	}

	fmt.Printf("Successfully added new blog post: %s\n", newPost.Title.TR)
}
