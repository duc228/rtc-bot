package v1

import (
	"rct_server/internal/api/middlewares"

	"github.com/gin-gonic/gin"
)

func InitRoutes(server *gin.Engine) {

	routes := server.Group("/api")

	v1 := routes.Group("/v1")
	{
		// Auth routes
		authRoutes := v1.Group("/auth")
		AuthRoutes(authRoutes)

		// Protected routes
		protectedRoutes := v1.Group("", middlewares.IsAuthenticated())
		ConversationRoutes(protectedRoutes.Group("/conversations"))
		MessageRoutes(protectedRoutes.Group("/messages"))
	}

}
