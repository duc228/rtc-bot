package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

type JwtUtils struct {
}

var SecretKey = "secretkey"
var timeAccessToken = 10 * 60 // Seconds

type jwtCustomClaims struct {
	UserId uint `json:"user_id"`
	jwt.StandardClaims
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

func (u *JwtUtils) VerifyToken() {

}
