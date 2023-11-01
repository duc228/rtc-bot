package response

type PaginationResponse struct {
	Data            interface{} `json:"data"`
	Page            int         `json:"page"`
	Limit           int         `json:"limit"`
	Total           int64       `json:"total"`
	TotalPages      int         `json:"totalPages"`
	First           bool        `json:"first"`
	Last            bool        `json:"last"`
	HasNextPage     bool        `json:"hasNextPage"`
	HasPreviousPage bool        `json:"hasPreviousPage"`
	NextPage        int         `json:"nextPage"`
	PrevPage        int         `json:"prevPage"`
}
