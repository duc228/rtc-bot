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

	RequestFieldName := request.LoginRequest{
		Email:    "Email",
		Password: "Mật khẩu",
	}

	err := validate.Struct(requestLogin)
	if err != nil {

		errors = ErrorCustomValidation(err, RequestFieldName)

	}
	return errors
}

func SignUpValidation(requestSignUp request.SignUpRequest) []response.ErrorMessageResponse {
	validate = validator.New()
	// validate.RegisterValidation("Password", validators.NotBlank)

	errors := []response.ErrorMessageResponse{}

	RequestFieldName := request.SignUpRequest{
		Email:           "Email",
		Password:        "Mật khẩu",
		FullName:        "Họ tên",
		ConfirmPassword: "Xác nhận mật khẩu",
	}

	err := validate.Struct(requestSignUp)
	if err != nil {
		errors = ErrorCustomValidation(err, RequestFieldName)

	}
	return errors
}
