package controllers

import (
	"math"
	"net/http"
	internal "rct_server/internal/const"
	"rct_server/internal/dto/response"
	"rct_server/internal/services"
	"rct_server/internal/utils"
	"strconv"

	"github.com/gin-gonic/gin"
)

var paginationUtil utils.PaginationUtil
var conversationService services.ConversationService

func GetConversationByUserId(c *gin.Context) {
	userId, _ := c.Get("userId")
	if userId == nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return
	}
	var id = uint(userId.(float64))

	var page int = internal.PAGE
	var limit int = internal.LIMIT

	if c.Query("page") != "" {
		page, _ = strconv.Atoi(c.Query("page"))
	}

	if c.Query("limit") != "" {
		limit, _ = strconv.Atoi(c.Query("limit"))
	}

	total, err := conversationService.GetTotalRows(id, page, limit)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return
	}

	totalPages := int(math.Ceil(float64(total) / float64(limit)))

	data, err := conversationService.GetConverastionByUserId(id, page, limit)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return
	}

	response.Response(c, http.StatusOK, paginationUtil.BuildPaginationData(data, page, limit, total, totalPages))

}

func CreateConversation(c *gin.Context) {
	userId, _ := c.Get("userId")
	if userId == nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return
	}
	var id = uint(userId.(float64))

	conversation, err := conversationService.CreateConversation(id)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return
	}
	response.Response(c, http.StatusOK, conversation)

}

// func GetAllConversationsByUserId(c *gin.Context) {
// 	c.JSON(200, gin.H{"message": "GetAllConversationsByUserId"})

// }
