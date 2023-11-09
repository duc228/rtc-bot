package services

import (
	"errors"
	"fmt"
	internal "rct_server/internal/common/const"
	"rct_server/internal/entities"
	"rct_server/internal/repositories"
	"rct_server/internal/utils"
	"rct_server/internal/validations/request"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type LoginResponse struct {
	Token string `json:"token"`
}

type AuthService struct {
	repo repositories.UserRepository
}

var hash_cost = internal.HASH_COST

func (s *AuthService) Login(request request.LoginRequest) (LoginResponse, error) {

	// Find user
	user, err := s.repo.FindUserByEmail(request.Email)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return LoginResponse{}, errors.New("Sai tài khoản hoặc mật khẩu")
	}

	if err != nil {
		fmt.Println("Err: ", err)
		return LoginResponse{}, errors.New("Sai tài khoản hoặc mật khẩu")
	}

	// Compare password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password))
	if err != nil {
		fmt.Println("Err: ", err)
		return LoginResponse{}, errors.New("Sai tài khoản hoặc mật khẩu")
	}

	// Generate token
	return GenerateToken(user.Id)

}

func (s *AuthService) SignUp(c *gin.Context, request request.SignUpRequest) (LoginResponse, error) {
	// Check email is existing
	user, err := s.repo.FindUserByEmail(request.Email)
	if !errors.Is(err, gorm.ErrRecordNotFound) || user.Id != 0 {
		return LoginResponse{}, errors.New("Email đã tồn tại")
	}

	// Hash password
	hash, err := bcrypt.GenerateFromPassword([]byte(request.Password), hash_cost)

	// Save user
	newUser := entities.User{
		Email:    request.Email,
		FullName: request.FullName,
		Password: string(hash),
	}

	userSave, err := s.repo.CreateUser(newUser)

	// Generate token
	return GenerateToken(userSave.Id)
}

func GenerateToken(data uint) (LoginResponse, error) {
	var jwtUtils utils.JwtUtils
	accessToken, err := jwtUtils.GenerateToken(data)
	if err != nil {
		fmt.Println("Err: ", err)
		return LoginResponse{}, errors.New("Đã có lỗi xảy ra ở server")
	}
	return LoginResponse{Token: accessToken}, err
}

func (s *AuthService) GetProfile(c *gin.Context, id uint) (UserResponse, error) {
	user, err := s.repo.FindUserById(id)

	return UserResponse{
		Id:       user.Id,
		FullName: user.FullName,
		Email:    user.Email,
	}, err
}
