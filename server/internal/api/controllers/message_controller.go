package controllers

import (
	"net/http"
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
	userId, _ := c.Get("userId")
	if userId == nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return
	}
	var id = uint(userId.(float64))

	if c.Param("conversationId") == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Missing conversationId",
		})
	}

	var conversationId, _ = strconv.Atoi(c.Param("conversationId"))

	res, err := messageService.GetMessagesByConversationId(id, conversationId, c)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Response(c, http.StatusOK, res)
}

// func GetAllMessagesByConversationId(c *gin.Context) {
// 	c.JSON(200, gin.H{"message": "GetAllMessagesByConversationId"})
// }
