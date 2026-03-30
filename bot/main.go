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

func main() {
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		log.Fatal("ERROR: GEMINI_API_KEY environment variable not set!")
	}

	prompt := `You are an expert Senior Backend Engineer and Golang Developer.
	Instead of writing generic news, write a highly technical, deep-dive blog post about ONE specific advanced concept or best practice in Golang, System Design, or Backend Architecture (e.g., "Advanced Concurrency Patterns in Go", "Optimizing gRPC performance", "Building Event-Driven Microservices").
	
	CRITICAL RULES:
	1. Title: The title MUST be specific to the chosen technical topic (e.g., "Mastering Goroutines", NOT "Golang Updates").
	2. Translation Quality: You must write in BOTH flawless, native English ("en") and flawless, native Turkish ("tr"). 
	3. NO LANGUAGE MIXING: Ensure the Turkish text contains NO words from other languages (like Vietnamese or Spanish). Use perfect, professional Turkish grammar.
	4. Output STRICTLY as a JSON object. No preamble, no introductory text.
	
	JSON Schema:
	{
		"slug": "kebab-case-specific-english-slug",
		"title": {
			"tr": "Konuya Özel Çarpıcı ve Teknik Türkçe Başlık",
			"en": "Specific and Catchy English Title"
		},
		"excerpt": {
			"tr": "2 cümlelik, merak uyandıran kusursuz Türkçe özet.",
			"en": "A compelling 2-sentence summary in English."
		},
		"content": {
			"tr": "Markdown formatında, detaylı, kod örnekli ve profesyonel bir Türkçe ile yazılmış teknik makale.",
			"en": "Detailed technical article with code examples in Markdown, written in fluent English."
		}
	}`

	reqBody := Request{
		Model: "llama-3.3-70b-versatile",
		Messages: []Message{
			{Role: "user", Content: prompt},
		},
		ResponseFormat: &Format{Type: "json_object"},
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		log.Fatalf("Request body marshal error: %v", err)
	}

	req, err := http.NewRequest("POST", "https://api.groq.com/openai/v1/chat/completions", bytes.NewBuffer(jsonData))
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
