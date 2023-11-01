package middlewares

import (
	"fmt"
	"net/http"
	"rct_server/internal/utils"
	"strings"

	"github.com/gin-gonic/gin"
)

var JwtUtils utils.JwtUtils

func IsAuthenticated() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.Request.Header["Authorization"]
		if authHeader == nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		}
		tokenString := strings.Split(c.Request.Header["Authorization"][0], " ")[1]
		fmt.Printf("token string %s\n", tokenString)

		data, err := JwtUtils.VerifyToken(tokenString)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		}

		c.Set("userId", data)
		c.Next()
	}
}
