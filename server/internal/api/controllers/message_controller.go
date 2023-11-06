package controllers

import (
	"net/http"
	"rct_server/internal/dto/request"
	"rct_server/internal/dto/response"
	"rct_server/internal/services"
	"rct_server/internal/utils"
	"strconv"

	"github.com/gin-gonic/gin"
)

var messageService services.MessageService

func CreateMessage(c *gin.Context) {

	userId := utils.GetUserId(c)

	var request request.MessageRequest
	if err := c.ShouldBind(&request); err != nil {
		response.Error(c, http.StatusBadRequest, "Vui lòng cung cấp đúng thông tin")
		return
	}

	messageResponse := messageService.SendMessageToBot(userId, request)

	response.Response(c, http.StatusOK, messageResponse)
}

func GetMessagesByConversationId(c *gin.Context) {
	userId := utils.GetUserId(c)

	if c.Param("conversationId") == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Missing conversationId",
		})
	}

	var conversationId, _ = strconv.Atoi(c.Param("conversationId"))

	res, err := messageService.GetMessagesByConversationId(userId, conversationId, c)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Response(c, http.StatusOK, res)
}

// func GetAllMessagesByConversationId(c *gin.Context) {
// 	c.JSON(200, gin.H{"message": "GetAllMessagesByConversationId"})
// }
