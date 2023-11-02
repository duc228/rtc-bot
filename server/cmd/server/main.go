package main

import (
	"rct_server/configs"
	v1 "rct_server/internal/api/routes/v1"
	"rct_server/migrations"

	"github.com/gin-gonic/gin"
)

func main() {

	server := gin.Default()

	configs.LoadEnv()

	configs.DBConnect()

	migrations.Migrate()

	v1.InitRoutes(server)

	server.Run()
}
