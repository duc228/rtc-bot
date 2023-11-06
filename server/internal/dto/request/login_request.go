package request

type LoginRequest struct {
	Email    string `json:"email" validate:"required,email" errormgs:"Email"`
	Password string `json:"password" validate:"required" errormgs:"Mật khẩu"`
}
