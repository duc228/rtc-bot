package utils

import (
	"net/http"
	"rct_server/internal/common/response"

	"github.com/gin-gonic/gin"
)

func GetUserId(c *gin.Context) uint {
	userId, _ := c.Get("userId")
	if userId == nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
	}
	var id = uint(userId.(float64))
	return id
}
