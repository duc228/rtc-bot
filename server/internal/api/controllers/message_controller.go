package controllers

import (
	"net/http"
	"rct_server/internal/dto/request"
	"rct_server/internal/dto/response"
	"rct_server/internal/services"
	"rct_server/internal/utils"
	"rct_server/internal/validations"

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

	if !validations.ValidationParams(c, request) {
		return
	}

	messageResponse := messageService.SendMessageToBot(userId, request)

	response.Response(c, http.StatusOK, messageResponse)
}

func GetMessagesByConversationId(c *gin.Context) {
	userId := utils.GetUserId(c)

	var requestConversation request.GetMessagesRequest
	if err := c.ShouldBindUri(&requestConversation); err != nil {
		response.Error(c, http.StatusBadRequest, "Vui lòng cung cấp đúng thông tin")
		return
	}

	if !validations.ValidationParams(c, requestConversation) {
		return
	}

	var requestPagination request.PaginationRequest
	if err := c.ShouldBind(&requestPagination); err != nil {
		response.Error(c, http.StatusBadRequest, "Vui lòng cung cấp đúng thông tin")
		return
	}

	if !validations.ValidationParams(c, requestPagination) {
		return
	}

	res, err := messageService.GetMessagesByConversationId(userId, requestPagination, requestConversation.ConversationId, c)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Response(c, http.StatusOK, res)
}
