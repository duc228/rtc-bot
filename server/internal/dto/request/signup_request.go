package request

type SignUpRequest struct {
	Email           string `json:"email"`
	FullName        string `json:"fullName,omitempty"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}
