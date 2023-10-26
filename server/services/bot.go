package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"rct_server/dto"
)

var botURL = "http://rtc_bot:5005/webhooks/rest/webhook"

func CallBot(sender string, message string) []dto.BotResponse {
	botURL = os.Getenv("BOT_URI")
	if botURL == "" {
		botURL = "http://rtc_bot:5005/webhooks/rest/webhook"
	}

	botRequest := dto.BotRequest{
		Sender:  sender,
		Message: message,
	}

	body, err := json.Marshal(botRequest)
	if err != nil {
		fmt.Println("Error:", err)
		panic(err.Error())

	}

	r, err := http.NewRequest("POST", botURL, bytes.NewBuffer(body))
	if err != nil {
		fmt.Println(err.Error())
		panic(err)
	}

	client := &http.Client{}
	res, err := client.Do(r)
	if err != nil {
		fmt.Println("Error sending request:", err)
		panic(err.Error())

	}

	defer res.Body.Close()

	var response []dto.BotResponse

	if err := json.NewDecoder(res.Body).Decode(&response); err != nil {
		fmt.Println("Error decoding JSON:", err)
	}

	// fmt.Printf("\nhiii %v\n", response[0].Text)

	return response

	// var response interface{}
	// // var jsons dto.BotResponse
	// resBody, err := io.ReadAll(res.Body)
	// if err != nil {
	// 	fmt.Println(err.Error())

	// 	fmt.Println("Error reading response body:", err)
	// 	panic(err.Error())

	// }
	// fmt.Println("Response:", resBody)

	// errr := json.Unmarshal(resBody, &response)
	// if errr != nil {
	// 	fmt.Println(err.Error())

	// 	panic(err.Error())
	// }

	// return response
}
