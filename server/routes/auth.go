package routes

import (
	"rct_server/controllers"
	"rct_server/middlewares"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(rg *gin.RouterGroup) {

	rg.POST("/signup", controllers.SignUp)
	rg.POST("/login", controllers.Login)
	rg.GET("/me", middlewares.IsAuthenticated, controllers.GetProfile)
}
