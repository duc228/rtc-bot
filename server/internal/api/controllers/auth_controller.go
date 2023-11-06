package controllers

import (
	"net/http"
	"rct_server/internal/dto/request"
	"rct_server/internal/dto/response"
	"rct_server/internal/services"
	"rct_server/internal/validations"

	"github.com/gin-gonic/gin"
)

var authService services.AuthService

func Login(c *gin.Context) {
	var request request.LoginRequest

	if err := c.ShouldBind(&request); err != nil {
		response.Error(c, http.StatusBadRequest, "Vui lòng cung cấp đúng thông tin")
		return
	}

	if !validations.ValidationParams(c, request) {
		return
	}

	res, err := authService.Login(request)

	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Response(c, http.StatusOK, response.LoginResponse{Token: res})

	// old validation params
	// errorsValidate := validations.LoginValidation(request)
	// if len(errorsValidate) > 0 {
	// 	response.Error(c, http.StatusBadRequest, errorsValidate)
	// 	return
	// }

}

func SignUp(c *gin.Context) {
	var request request.SignUpRequest
	c.BindJSON(&request)

	if !validations.ValidationParams(c, request) {
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
