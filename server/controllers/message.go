package controllers

import (
	"fmt"
	"net/http"
	"rct_server/configs"
	"rct_server/dto"
	"rct_server/models"

	"github.com/gin-gonic/gin"
)

func GetAllMessagesByConversationId(c *gin.Context) {
	conversationId := c.Param("conversationId")
	userId, _ := c.Get("userId")

	var messages []models.Message
	configs.DB.Where("conversation_id = ? AND user_id = ?", conversationId, userId).Find(&messages)
	c.JSON(http.StatusOK, gin.H{
		"data":  messages,
		"total": len(messages),
	})
}

func CreateMessage(c *gin.Context) {
	var data dto.MessageDto
	c.BindJSON(&data)

	userId, _ := c.Get("userId")

	message := models.Message{
		UserId:         userId.(uint),
		Content:        data.Content,
		ConversationId: data.ConversationId,
	}

	result := configs.DB.Create(&message)

	if result.Error != nil {
		fmt.Println("error123: ", result.Error)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create message",
		})
	}

	c.JSON(http.StatusCreated, &message)
}
