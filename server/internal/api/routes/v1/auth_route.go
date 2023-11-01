package v1

import (
	"rct_server/internal/api/controllers"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(rg *gin.RouterGroup) {

	rg.POST("/signup", controllers.SignUp)
	rg.POST("/login", controllers.Login)
	rg.GET("/me", controllers.GetProfile)
}
