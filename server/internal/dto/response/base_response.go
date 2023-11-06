package response

import "github.com/gin-gonic/gin"

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
