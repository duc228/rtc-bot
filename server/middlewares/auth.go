package middlewares

import (
	"fmt"
	"net/http"
	"rct_server/configs"
	"rct_server/models"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func TestMid(c *gin.Context) {
	fmt.Println("middle")
	c.Next()
}

func IsAuthenticated(c *gin.Context) {
	// tokenString, err := c.Cookie("auth")
	tokenString := strings.Split(c.Request.Header["Authorization"][0], " ")[1]
	fmt.Printf("token string %s\n", tokenString)

	// if err != nil {
	// 	// c.AbortWithStatus(http.StatusUnauthorized)
	// 	c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})

	// }

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte("secretkey"), nil
	})

	if err != nil {
		// c.AbortWithStatus(http.StatusUnauthorized)
		fmt.Println("\nerror from toekn: %s\n", err)
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized", "error": err})

	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// if float64(time.Now().Unix()) > claims["exp"].(float64) {
		// 	c.AbortWithStatus(http.StatusUnauthorized)

		// }

		var user models.User
		configs.DB.First(&user, claims["sub"])

		if user.Id == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)

		}

		c.Set("user", user)
		c.Next()

	} else {
		c.AbortWithStatus(http.StatusUnauthorized)

	}
}
