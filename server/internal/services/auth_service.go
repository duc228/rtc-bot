package services

import (
	"errors"
	"fmt"
	internal "rct_server/internal/const"
	"rct_server/internal/dto/request"
	"rct_server/internal/entities"
	"rct_server/internal/repositories"
	"rct_server/internal/utils"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthService struct {
	repo repositories.UserRepository
}

var hash_cost = internal.HASH_COST

func (s *AuthService) Login(c *gin.Context, request request.LoginRequest) (string, error) {

	// Find user
	user, err := s.repo.FindUserByEmail(request.Email)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return "", errors.New("Sai tài khoản hoặc mật khẩu")
	}

	if err != nil {
		fmt.Println("Err: ", err)
		return "", errors.New("Sai tài khoản hoặc mật khẩu")
	}

	// Compare password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password))
	if err != nil {
		fmt.Println("Err: ", err)
		return "", errors.New("Sai tài khoản hoặc mật khẩu")
	}

	// Generate token
	var jwtUtils utils.JwtUtils
	accessToken, err := jwtUtils.GenerateToken(user.Id)
	if err != nil {
		fmt.Println("Err: ", err)
		return "", errors.New("Sai tài khoản hoặc mật khẩu")
	}

	return accessToken, err
}

func (s AuthService) GetProfile(c *gin.Context, id uint) (entities.User, error) {

	return s.repo.FindUserById(id)
}
