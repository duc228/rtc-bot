package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

var SecretKey = "secretkey"

// jwtCustomClaims are custom claims extending default ones.
type jwtCustomClaims struct {
	UserId uint `json:"user_id"`
	jwt.StandardClaims
}

func GenerateToken(UserId uint) string {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": UserId,
		"exp": time.Now().Local().Add(time.Minute * time.Duration(10)).Unix(),
	})

	tokenString, err := token.SignedString([]byte(SecretKey))

	if err != nil {
		panic(err)
	}
	return tokenString
}

func VerifyToken() {

}
