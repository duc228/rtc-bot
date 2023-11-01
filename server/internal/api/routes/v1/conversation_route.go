package v1

import (
	"rct_server/internal/api/controllers"

	"github.com/gin-gonic/gin"
)

func ConversationRoutes(rg *gin.RouterGroup) {

	rg.GET("/", controllers.GetConversationByUserId)
	// rg.GET("/all", controllers.GetAllConversationsByUserId)
	rg.POST("/", controllers.CreateConversation)
}
