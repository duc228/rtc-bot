package utils

import "rct_server/internal/dto/response"

type PaginationUtil struct {
}

func (u *PaginationUtil) BuildPaginationData(data interface{}, page int, limit int, total int64, totalPages int) response.PaginationResponse {

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

	return response.PaginationResponse{
		Data: &data,
		Pagination: response.Pagination{
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
		},
	}
}
