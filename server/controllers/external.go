package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"rct_server/dto"

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
	// posturl := "http://exter:6001/"
	posturl := "http://rtc_bot:5005/webhooks/rest/webhook"

	botRequest := dto.BotRequest{
		Sender:  "sender",
		Message: "hi",
	}

	body, err := json.Marshal(botRequest)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	r, err := http.NewRequest("POST", posturl, bytes.NewBuffer(body))
	if err != nil {
		fmt.Println(err.Error())
		panic(err)
	}

	client := &http.Client{}
	res, err := client.Do(r)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}

	defer res.Body.Close()

	var response []dto.BotResponse
	// var jsons dto.BotResponse
	resBody, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err.Error())

		fmt.Println("Error reading response body:", err)
		return
	}
	fmt.Println("Response:", resBody)

	errr := json.Unmarshal(resBody, &response)
	if errr != nil {
		fmt.Println(err.Error())

		panic(err.Error())
	}

	c.JSON(200, gin.H{
		"data_string": string(resBody),
		"data":        response,
		// "data1": string(responseBody),
	})
}
