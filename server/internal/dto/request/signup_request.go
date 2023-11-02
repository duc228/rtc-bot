package request

type SignUpRequest struct {
	Email           string `json:"email" validate:"required,email"`
	FullName        string `json:"fullName,omitempty" validate:"required,min=3"`
	Password        string `json:"password" validate:"required,min=6" `
	ConfirmPassword string `json:"confirmPassword" validate:"required,eqfield=Password"`
}
