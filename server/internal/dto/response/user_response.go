package response

type UserResponse struct {
	Id       uint   `json:"id"`
	FullName string `json:"fullName"`
	Email    string `json:"email"`
}
