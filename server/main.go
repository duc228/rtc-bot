package main

import (
	"fmt"
	"log"
	"os"
	"rct_server/configs"
	"rct_server/controllers"
	"rct_server/migrations"
	"rct_server/routes"
	"rct_server/socket"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var server = gin.Default()

func main() {

	// server.Use(cors.New(CORSConfig()))

	loadEnv()

	configs.DBConnect()

	migrations.Migrate()

	// Websocket
	// server.GET("/ws", socket.ConnectWS)
	// hub := socket.NewHub()
	// wsHandler := socket.NewHandler(hub)
	// go hub.Run()

	getRoutes()
	// WsRoutes(server, wsHandler)
	server.GET("/exter", controllers.GetExternal)
	server.POST("/api/exter", controllers.PostExternal)

	server.Run()
}

func WsRoutes(rg *gin.Engine, wsHandler *socket.Handler) {

	rg.POST("/ws/createRoom", wsHandler.CreateRoom)
	rg.GET("/ws/joinRoom/:roomId", wsHandler.JoinRoom)
	rg.GET("/ws/getRooms", wsHandler.GetRooms)
	rg.GET("/ws/getClients/:roomId", wsHandler.GetClients)
}

func getRoutes() {

	apiRoute := server.Group("/api")
	// v1 := apiRoute.Group("/v1")

	routes.UserRoutes(apiRoute.Group("/user"))
	routes.AuthRoutes(apiRoute.Group("/auth"))
	routes.ConversationRoutes(apiRoute.Group("/conversation"))
	routes.MessageRoutes(apiRoute.Group("/message"))
}

func CORSConfig() cors.Config {

	client := os.Getenv("CLIENT_URI")
	fmt.Println("Client URI %v", client)
	if client == "" {
		client = "http://localhost:5173"
	}

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{client}
	corsConfig.AllowCredentials = true
	corsConfig.AddAllowHeaders("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers", "Content-Type", "X-XSRF-TOKEN", "Accept", "Origin", "X-Requested-With", "Authorization")
	corsConfig.AddAllowMethods("GET", "POST", "PUT", "DELETE")
	return corsConfig
}

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Err while load .env file")
	}
}
