package utils

import (
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JwtUtils struct {
}

var SecretKey = "secretkey"
var timeAccessToken = 10 * 60 * 60 // Seconds

type jwtCustomClaims struct {
	UserId uint `json:"user_id"`
}

func (u *JwtUtils) GenerateToken(userId uint) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": userId,
		"exp": time.Now().Local().Add(time.Second * time.Duration(timeAccessToken)).Unix(),
	})

	tokenString, err := token.SignedString([]byte(SecretKey))

	if err != nil {
		// panic(err)
		return "", err
	}
	return tokenString, err
}

func (u *JwtUtils) VerifyToken(tokenString string) (interface{}, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(SecretKey), nil
	})

	if err != nil {
		// c.AbortWithStatus(http.StatusUnauthorized)
		fmt.Println("\nerror from toekn: %s\n", err)
		return "", errors.New("Unauthorized")

	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims["sub"], nil
	}
	return "", errors.New("Unauthorized")
}
