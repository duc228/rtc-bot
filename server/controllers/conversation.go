package controllers

import (
	"fmt"
	"net/http"
	"rct_server/configs"
	"rct_server/models"

	"github.com/gin-gonic/gin"
)

func GetAllConversationsByUserId(c *gin.Context) {
	userId, _ := c.Get("userId")

	var conversations []models.Conversation
	configs.DB.Where("user_id = ?", userId).Find(&conversations)
	c.JSON(http.StatusOK, gin.H{
		"data":  conversations,
		"total": len(conversations),
	})
}

func CreateConversation(c *gin.Context) {
	var data models.Conversation
	c.BindJSON(&data)

	userId, _ := c.Get("userId")

	conversation := models.Conversation{
		UserId: userId.(uint),
	}

	result := configs.DB.Create(&conversation)

	if result.Error != nil {
		fmt.Println("error123: ", result.Error)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create conversation",
		})
	}

	c.JSON(http.StatusCreated, &conversation)

}
