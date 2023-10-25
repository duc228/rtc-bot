package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"rct_server/dto"
)

var botURL = "http://rtc_bot:5005/webhooks/rest/webhook"

func CallBot(sender string, message string) dto.BotResponse {

	botRequest := dto.BotRequest{
		Sender:  sender,
		Message: message,
	}

	body, err := json.Marshal(botRequest)
	if err != nil {
		fmt.Println("Error:", err)
		// return
		panic(err)
	}

	r, err := http.NewRequest("POST", botURL, bytes.NewBuffer(body))
	if err != nil {
		panic(err)
	}

	r.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	res, err := client.Do(r)
	if err != nil {
		fmt.Println("Error sending request:", err)
		// return
		panic(err)

	}

	defer res.Body.Close()

	// var response interface{}
	var response interface{} = dto.BotResponse{}
	resBody, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		panic(err)

		// return
	}
	fmt.Println("Response:", resBody)

	errr := json.Unmarshal(resBody, &response)
	if errr != nil {
		panic(err.Error())
	}
	return response
}
