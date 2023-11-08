package utils

// tach
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

type PaginationUtil struct {
}

func (u *PaginationUtil) BuildPaginationData(data interface{}, page int, limit int, total int64, totalPages int) PaginationResponse {

	var nextPage int
	if page+1 <= totalPages {
		nextPage = page + 1
	} else {
		nextPage = totalPages
	}

	var prevPage int
	if page-1 >= 0 {
		prevPage = page - 1
	} else {
		prevPage = 0
	}

	return PaginationResponse{
		Data:            &data,
		Page:            page,
		Limit:           limit,
		Total:           total,
		TotalPages:      totalPages,
		First:           page == 0,
		Last:            page == totalPages-1,
		HasNextPage:     page < totalPages-1,
		HasPreviousPage: page > 0,
		NextPage:        nextPage,
		PrevPage:        prevPage,
	}
}
