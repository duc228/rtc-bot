package request

type LoginRequest struct {
	Email    string `json:"email" validate:"required,email" errormgs:"Email"`
	Password string `json:"password" validate:"required" errormgs:"Mật khẩu"`
}

type SignUpRequest struct {
	Email           string `json:"email" validate:"required,email" errormgs:"Email"`
	FullName        string `json:"fullName,omitempty" validate:"required,min=3" errormgs:"Họ tên"`
	Password        string `json:"password" validate:"required,min=6" errormgs:"Mật khẩu"`
	ConfirmPassword string `json:"confirmPassword" validate:"required,eqfield=Password" errormgs:"Xác nhận mật khẩu"`
}
