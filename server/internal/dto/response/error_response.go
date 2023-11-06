package response

import "github.com/gin-gonic/gin"

type IError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

type NewError struct {
	Error interface{} `json:"error" `
}

func Error(c *gin.Context, errCode int, data interface{}) {
	c.AbortWithStatusJSON(errCode, NewError{data})
}
