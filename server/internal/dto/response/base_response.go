package response

import "github.com/gin-gonic/gin"

type Response struct {
	c *gin.Context

	Code int         `json:"code"`
	Data interface{} `json:"data"`
}
