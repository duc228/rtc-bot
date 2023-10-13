package routes

import (
	"rct_server/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(rg *gin.RouterGroup) {

	rg.GET("/", controllers.GetAllUsers)
	rg.GET("/info", controllers.GetInfo)
}
