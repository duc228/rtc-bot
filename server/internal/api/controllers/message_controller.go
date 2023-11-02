package controllers

import (
	"math"
	"net/http"
	internal "rct_server/internal/const"
	"rct_server/internal/dto/request"
	"rct_server/internal/dto/response"
	"rct_server/internal/services"
	"strconv"

	"github.com/gin-gonic/gin"
)

var messageService services.MessageService

func CreateMessage(c *gin.Context) {

	userId, _ := c.Get("userId")
	if userId == nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return
	}
	var id = uint(userId.(float64))

	var request request.MessageRequest
	if err := c.ShouldBind(&request); err != nil {
		response.Error(c, http.StatusBadRequest, "Vui lòng cung cấp đủ thông tin")
		return
	}

	messageResponse := messageService.SendMessageToBot(id, request)

	response.Response(c, http.StatusOK, messageResponse)
}

func GetMessagesByConversationId(c *gin.Context) {
	// userId, _ := c.Get("userId")
	// if userId == nil {
	// 	response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
	// 	return
	// }
	// var id = uint(userId.(float64))

	if c.Param("conversationId") == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Missing conversationId",
		})
	}

	var conversationId, _ = strconv.Atoi(c.Param("conversationId"))

	var page int = internal.PAGE
	var limit int = internal.LIMIT

	if c.Query("page") != "" {
		page, _ = strconv.Atoi(c.Query("page"))
	}

	if c.Query("limit") != "" {
		limit, _ = strconv.Atoi(c.Query("limit"))
	}

	total, err := messageService.GetTotalRows(conversationId, page, limit)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return
	}

	totalPages := int(math.Ceil(float64(total) / float64(limit)))

	data, err := messageService.GetMessagesByConversationId(conversationId, page, limit)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return
	}

	response.Response(c, http.StatusOK, paginationUtil.BuildPaginationData(data, page, limit, total, totalPages))
}

// func GetAllMessagesByConversationId(c *gin.Context) {
// 	c.JSON(200, gin.H{"message": "GetAllMessagesByConversationId"})
// }
