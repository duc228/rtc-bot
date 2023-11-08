package response

import "github.com/gin-gonic/gin"

var c *gin.Context

type NewResponse struct {
	Code int         `json:"code"`
	Data interface{} `json:"data"`
}

// func (gin *gin.Context) Response(code int, data interface{}) {
// 	gin.JSON(code, NewResponse{
// 		Code: code,
// 		Data: data,
// 	})
// }

func Response(c *gin.Context, code int, data interface{}) {
	c.JSON(code, NewResponse{
		Code: code,
		Data: data,
	})
}

type IError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

type NewError struct {
	Error interface{} `json:"error" `
}

func Error(c *gin.Context, errCode int, data interface{}) {
	c.AbortWithStatusJSON(errCode, NewError{data})
	return

}

type PaginationResponse struct {
	Data       interface{} `json:"data"`
	Pagination Pagination  `json:"pagination"`
}

type Pagination struct {
	Page            int   `json:"page"`
	Limit           int   `json:"limit"`
	Total           int64 `json:"total"`
	TotalPages      int   `json:"totalPages"`
	First           bool  `json:"first"`
	Last            bool  `json:"last"`
	HasNextPage     bool  `json:"hasNextPage"`
	HasPreviousPage bool  `json:"hasPreviousPage"`
	NextPage        int   `json:"nextPage"`
	PrevPage        int   `json:"prevPage"`
}
