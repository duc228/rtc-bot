package v1

import (
	"rct_server/controllers"

	"github.com/gin-gonic/gin"
)

func MessageRoutes(rg *gin.RouterGroup) {

	rg.POST("/", controllers.CreateMessage)
	rg.GET("/:conversationId/all", controllers.GetAllMessagesByConversationId)
	rg.GET("/:conversationId", controllers.GetMessagesByConversationId)

}
