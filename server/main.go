package main

import (
	"fmt"
	"log"
	"os"
	"rct_server/configs"
	"rct_server/migrations"
	"rct_server/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var server = gin.Default()

func main() {

	server.Use(cors.New(CORSConfig()))

	loadEnv()

	configs.DBConnect()

	migrations.Migrate()

	getRoutes()
	server.Run()
}

func getRoutes() {

	apiRoute := server.Group("/api")
	v1 := apiRoute.Group("/v1")

	routes.UserRoutes(v1.Group("/user"))
	routes.AuthRoutes(v1.Group("/auth"))
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
