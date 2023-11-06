package services

import (
	"rct_server/internal/entities"
	"rct_server/internal/repositories"

	"github.com/gin-gonic/gin"
)

type UserResponse struct {
	Id       uint   `json:"id"`
	FullName string `json:"fullName"`
	Email    string `json:"email"`
}

type UserService struct {
	repo repositories.UserRepository
}

func (s *UserService) FindUserByEmail(c *gin.Context, email string) (entities.User, error) {
	return s.repo.FindUserByEmail(email)

}
