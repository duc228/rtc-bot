package services

import (
	"rct_server/internal/dto/request"
	"rct_server/internal/repositories"

	"github.com/gin-gonic/gin"
)

type AuthService struct {
	repo repositories.UserRepository
}

func Login(c *gin.Context, request request.LoginRequest) {

}
