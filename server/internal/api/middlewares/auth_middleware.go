package middlewares

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func IsAuthenticated() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("Authenticating")
		c.Next()
	}
}
