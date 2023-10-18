package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PostResponse struct {
	UserId    int    `json:"userId"`
	Id        int    `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

type Post struct {
	Id     int    `json:"id"`
	Title  string `json:"title"`
	Body   string `json:"body"`
	UserId int    `json:"userId"`
}

func GetExternal(c *gin.Context) {
	resp, err := http.Get("https://jsonplaceholder.cypress.io/todos/11")
	if err != nil {
		print(err)
	}

	// Close the body
	defer resp.Body.Close()

	var post PostResponse

	// Decode the JSON response
	if err := json.NewDecoder(resp.Body).Decode(&post); err != nil {
		print(err)
	}

	// Print the result on the console
	fmt.Printf("UserId: %v\n", post.UserId)
	fmt.Printf("Id: %v\n", post.Id)
	fmt.Printf("Title: %v\n", post.Title)
	fmt.Printf("Completed: %v\n", post.Completed)

	c.JSON(200, gin.H{
		"data": post,
	})
}

func PostExternal(c *gin.Context) {
	fmt.Printf("UserId:\n")
	posturl := "http://exter:6001/"

	body := []byte(`{
		"title": "Post 1231",
		"body": "Post description",
		"userId": 1
	}`)

	r, err := http.NewRequest("POST", posturl, bytes.NewBuffer(body))
	if err != nil {
		panic(err)
	}

	r.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	res, err := client.Do(r)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}

	defer res.Body.Close()

	var jons interface{}
	resBody, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return
	}
	fmt.Println("Response:", resBody)

	errr := json.Unmarshal(resBody, &jons)
	if errr != nil {
		panic(err.Error())
	}
	c.JSON(200, gin.H{
		"data": string(resBody),
		"daa":  jons,
		// "data1": string(responseBody),
	})
}
