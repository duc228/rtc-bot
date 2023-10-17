package routes

import (
	"rct_server/controllers"
	"rct_server/middlewares"

	"github.com/gin-gonic/gin"
)

func ConversationRoutes(rg *gin.RouterGroup) {

	rg.GET("/", middlewares.IsAuthenticated, controllers.GetConverastionByUserId)

	rg.GET("/all", middlewares.IsAuthenticated, controllers.GetAllConversationsByUserId)
	rg.POST("/", middlewares.IsAuthenticated, controllers.CreateConversation)
}
