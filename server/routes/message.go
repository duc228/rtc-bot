package routes

import (
	"rct_server/controllers"
	"rct_server/middlewares"

	"github.com/gin-gonic/gin"
)

func MessageRoutes(rg *gin.RouterGroup) {

	rg.POST("/", middlewares.IsAuthenticated, controllers.CreateMessage)
	rg.GET("/:conversationId", middlewares.IsAuthenticated, controllers.GetAllMessageByConversationId)

}
