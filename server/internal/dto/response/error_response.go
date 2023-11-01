package response

import "github.com/gin-gonic/gin"

func NewError(c *gin.Context, errCode int, data interface{}) *Response {
	return &Response{
		c:    c,
		Code: errCode,
		Data: data,
	}
}
