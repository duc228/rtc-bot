package response

type ErrorMessageResponse struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}
