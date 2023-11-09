package request

type PaginationRequest struct {
	Page  int `json:"page" form:"page" validate:"number,min=0" errormgs:"Trang"`
	Limit int `json:"limit" form:"limit" validate:"number,min=0" errormgs:"Tối đa"`
}
