package response

import "github.com/gin-gonic/gin"

type NewError struct {
	Error string `json:"error" `
}

func Error(c *gin.Context, errCode int, data string) {
	c.AbortWithStatusJSON(errCode, NewError{data})
}
