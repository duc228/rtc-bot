package response

import "github.com/gin-gonic/gin"

type NewError struct {
	Error interface{} `json:"error" `
}

func Error(c *gin.Context, errCode int, data interface{}) {
	c.AbortWithStatusJSON(errCode, NewError{data})
}
