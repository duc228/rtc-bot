package main

import (
	"log"
	"rct_server/configs"
	v1 "rct_server/internal/api/routes/v1"
	"rct_server/migrations"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	server := gin.Default()

	loadEnv()

	configs.DBConnect()

	migrations.Migrate()

	v1.InitRoutes(server)

	// getRoutes()
	// server.GET("/exter", controllers.GetExternal)
	// server.POST("/api/exter", controllers.PostExternal)

	// server.GET("/api", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{"message": "rtc_sever"})
	// })

	server.Run()
}

// func getRoutes() {

// 	apiRoute := server.Group("/api")
// 	v1 := apiRoute.Group("/v1")

// 	routes.UserRoutes(v1.Group("/user"))
// 	routes.AuthRoutes(v1.Group("/auth"))
// 	routes.ConversationRoutes(v1.Group("/conversation"))
// 	routes.MessageRoutes(v1.Group("/message"))
// }

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Err while load .env file")
	}
}
