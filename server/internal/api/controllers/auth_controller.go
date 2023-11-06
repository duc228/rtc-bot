package controllers

import (
	"net/http"
	"rct_server/internal/dto/request"
	"rct_server/internal/dto/response"
	"rct_server/internal/services"
	"rct_server/internal/validations"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
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

	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Response(c, http.StatusOK, response.LoginResponse{Token: res})
}

func SignUp(c *gin.Context) {
	var request request.SignUpRequest

	c.BindJSON(&request)

	errorsValidate := validations.SignUpValidation(request)
	if len(errorsValidate) > 0 {
		response.Error(c, http.StatusBadRequest, errorsValidate)
		return
	}

	res, err := authService.SignUp(c, request)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Response(c, http.StatusOK, response.LoginResponse{Token: res})

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
