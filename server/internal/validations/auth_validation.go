package validations

import (
	"rct_server/internal/dto/request"
	"rct_server/internal/dto/response"

	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func LoginValidation(requestLogin request.LoginRequest) []response.ErrorMessageResponse {
	validate = validator.New()

	errors := []response.ErrorMessageResponse{}

	loginRequestFieldName := request.LoginRequest{
		Email:    "Email",
		Password: "Mật khẩu",
	}

	err := validate.Struct(requestLogin)
	if err != nil {

		errors = ErrorCustomValidation(err, loginRequestFieldName)

	}
	return errors
}
