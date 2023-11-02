package bot

// func CallBot(sender string, message string) []en.BotResponse {
// 	botURL = os.Getenv("BOT_URI")
// 	if botURL == "" {
// 		botURL = "http://rtc_bot:5005/webhooks/rest/webhook"
// 	}

// 	botRequest := dto.BotRequest{
// 		Sender:  sender,
// 		Message: message,
// 	}

// 	body, err := json.Marshal(botRequest)
// 	if err != nil {
// 		fmt.Println("Error:", err)
// 		// panic(err.Error())
// 		return make([]dto.BotResponse, 0)

// 	}

// 	r, err := http.NewRequest("POST", botURL, bytes.NewBuffer(body))
// 	if err != nil {
// 		fmt.Println(err.Error())
// 		// panic(err)
// 		return make([]dto.BotResponse, 0)

// 	}

// 	client := &http.Client{}
// 	res, err := client.Do(r)
// 	if err != nil {
// 		fmt.Println("Error sending request:", err)
// 		// panic(err.Error())
// 		return make([]dto.BotResponse, 0)

// 	}

// 	defer res.Body.Close()

// 	var response []dto.BotResponse

// 	if err := json.NewDecoder(res.Body).Decode(&response); err != nil {
// 		fmt.Println("Error decoding JSON:", err)
// 		return make([]dto.BotResponse, 0)

// 	}

// 	// fmt.Printf("\nhiii %v\n", response[0].Text)

// 	return response
// }
