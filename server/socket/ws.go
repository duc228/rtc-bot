package socket

// var upgrader = websocket.Upgrader{
// 	// Solve cross-domain problems
// 	CheckOrigin: func(r *http.Request) bool {
// 		return true
// 	},
// } // use default options

// func ConnectWS(c *gin.Context) {
// 	//Upgrade get request to webSocket protocol
// 	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
// 	if err != nil {
// 		log.Print("upgrade:", err)
// 		return
// 	}
// 	defer ws.Close()
// 	for {
// 		//read data from ws
// 		mt, message, err := ws.ReadMessage()
// 		if err != nil {
// 			log.Println("read:", err)
// 			break
// 		}
// 		log.Printf("recv: %s", message)

// 		//write ws data
// 		err = ws.WriteMessage(mt, message)
// 		if err != nil {
// 			log.Println("write:", err)
// 			break
// 		}
// 	}
// }
