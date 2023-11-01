package response

import "github.com/gin-gonic/gin"

// type Response struct {
// 	c *gin.Context

// 	Code int         `json:"code"`
// 	Data interface{} `json:"data"`
// }

// func (instance *Response) Response(httpCode int) {
// 	instance.c.JSON(httpCode, instance)
// 	return
// }

type NewResponse struct {
	Code int         `json:"code"`
	Data interface{} `json:"data"`
}

func Response(c *gin.Context, code int, data interface{}) {
	c.JSON(code, NewResponse{
		Code: code,
		Data: data,
	})
}
