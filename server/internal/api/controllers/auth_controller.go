package controllers

import (
	"net/http"
	"rct_server/configs"
	"rct_server/internal/dto/request"
	"rct_server/internal/dto/response"
	"rct_server/internal/entities"
	"rct_server/internal/services"
	"rct_server/internal/utils"
	"rct_server/internal/validations"
	"rct_server/models"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"
)

var authService services.AuthService

var validate *validator.Validate

func Login(c *gin.Context) {
	var request request.LoginRequest

	if err := c.ShouldBind(&request); err != nil {
		response.Error(c, http.StatusBadRequest, "Vui lòng cung cấp đủ thông tin")
		return
	}

	errorsValidate := validations.LoginValidation(request)
	if len(errorsValidate) > 0 {
		response.Error(c, http.StatusBadRequest, errorsValidate)
		return
	}

	res, err := authService.Login(c, request)
	// if errors.Is(err, gorm.ErrRecordNotFound) {
	// 	response.Error(c, http.StatusBadRequest, "Sai tài khoản hoặc mật khẩu")
	// 	return
	// }

	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Response(c, http.StatusOK, response.LoginResponse{Token: res})
}

func SignUp(c *gin.Context) {
	var signUpInfo models.User

	c.BindJSON(&signUpInfo)

	hash, err := bcrypt.GenerateFromPassword([]byte(signUpInfo.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
	}

	newUser := entities.User{
		Email:    signUpInfo.Email,
		FullName: signUpInfo.FullName,
		Password: string(hash),
	}

	result := configs.DB.Create(&newUser)

	var jwtUtil utils.JwtUtils
	token, err := jwtUtil.GenerateToken(newUser.Id)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})
	}

	c.JSON(http.StatusCreated, gin.H{"token": token})
}

func GetProfile(c *gin.Context) {
	userId, _ := c.Get("userId")
	if userId == nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return
	}
	var id = uint(userId.(float64))
	user, err := authService.GetProfile(c, id)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Response(c, http.StatusOK, response.UserResponse{
		Id:       user.Id,
		FullName: user.FullName,
		Email:    user.Email,
	})
}
