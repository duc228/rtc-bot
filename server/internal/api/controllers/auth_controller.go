package controllers

import (
	"errors"
	"net/http"
	"rct_server/internal/dto/request"
	"rct_server/internal/dto/response"
	"rct_server/internal/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var userService services.UserService

func Login(c *gin.Context) {
	var request request.LoginRequest

	if err := c.ShouldBind(&request); err != nil {
		response.Error(c, http.StatusBadRequest, "Vui lòng cung cấp đủ thông tin")
		return
	}

	res, err := userService.FindUserByEmail(c, request.Email)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		response.Error(c, http.StatusBadRequest, "Sai tai khoan hoac mat khau")
		return
	}

	response.Response(c, http.StatusOK, res)
}

func SignUp(c *gin.Context) {
	c.JSON(200, gin.H{"message": "sign up 123"})

}

func GetProfile(c *gin.Context) {}
