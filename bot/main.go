package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
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

func main() {
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		log.Fatal("ERROR: GEMINI_API_KEY environment variable not set!")
	}

	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		log.Fatalf("The client could not be created: %v", err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-2.0-flash")
	model.ResponseMIMEType = "application/json"

	prompt := `You are a Senior Backend Engineer, Golang Expert, and Tech Blogger.
	Your task is to identify and analyze the most significant developments in the Backend, Golang, and Developer AI ecosystem from the recent period (past 7 days).
	This could be a new Go package, a framework update, a new AI model release, or a shift in backend architecture trends.
	
	Choose 1 or 2 of the most impactful topics. Write an engaging, insightful blog post where you:
	1. Report the actual news, tool, or development.
	2. Provide your expert commentary and analysis on how this affects backend developers, its pros/cons, and how it changes the way we write Go code.
	
	You must output the result STRICTLY as a valid JSON object. Do not include any introductory or concluding text outside the JSON.
	The content must be provided in both Turkish ("tr") and English ("en"). Use Markdown formatting inside the "content" fields for readability (e.g., bold text, lists, or code blocks).
	
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

	fmt.Println("Waiting for AI Response...")
	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		log.Fatalf("Error generating content: %v", err)
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		log.Fatal("AI response is empty.")
	}

	rawResponse := fmt.Sprintf("%v", resp.Candidates[0].Content.Parts[0])

	rawResponse = strings.TrimPrefix(rawResponse, "```json\n")
	rawResponse = strings.TrimSuffix(rawResponse, "\n```")

	var newPost BlogPost
	err = json.Unmarshal([]byte(rawResponse), &newPost)
	if err != nil {
		log.Fatalf("JSON Parse Error: %v\nRaw Response: %s", err, rawResponse)
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
