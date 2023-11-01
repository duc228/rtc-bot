package controllers

import (
	"net/http"
	"rct_server/internal/dto/request"
	"rct_server/internal/dto/response"
	"rct_server/internal/services"

	"github.com/gin-gonic/gin"
)

var authService services.AuthService

func Login(c *gin.Context) {
	var request request.LoginRequest

	if err := c.ShouldBind(&request); err != nil {
		response.Error(c, http.StatusBadRequest, "Vui lòng cung cấp đủ thông tin")
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
	c.JSON(200, gin.H{"message": "sign up 123"})

}

func GetProfile(c *gin.Context) {}
