package controllers

import (
	"net/http"
	"rct_server/internal/dto/response"
	"rct_server/internal/services"
	"rct_server/internal/utils"

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

	res, err := conversationService.GetConverastionByUserId(id, c)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	response.Response(c, http.StatusOK, res)

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
