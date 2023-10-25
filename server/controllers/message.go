package controllers

import (
	"fmt"
	"math"
	"net/http"
	"rct_server/configs"
	"rct_server/dto"
	"rct_server/models"
	"strconv"

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

	//refactor later

	// check if new conversation
	var isNewConversation bool = false
	var conversation models.Conversation
	if data.ConversationId == -1 {
		conversation = models.Conversation{
			UserId: userId.(uint),
		}

		resultConversation := configs.DB.Create(&conversation)
		if resultConversation.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create conversation",
			})
		}
	}

	var conversationId uint = uint(data.ConversationId)
	if conversation.Id != 0 {
		conversationId = uint(conversation.Id)
		isNewConversation = true

	}
	fmt.Print("conversationId: ", conversationId)

	// store message to db
	message := models.Message{
		UserId:         userId.(uint),
		Content:        data.Content,
		ConversationId: conversationId,
	}

	result := configs.DB.Create(&message)
	// update lastest message to conversation
	if isNewConversation {
		// configs.DB.Model(&models.Conversation{}).Where("id = ? ", conversationId).Update("last_message_id", message.Id)
		configs.DB.Model(&models.Conversation{}).Where("id = ? ", conversationId).Update("last_message", message.Content)
	}

	// send request to bot
	// var botResponse dto.BotResponse
	// botResponse = controllers.CallBot(userId, data.Content)

	// store response from bot to server
	messageBot := models.Message{
		Content: "Toi la bot1",
		// Content:        botResponse.Text,
		ConversationId: conversationId,
	}

	resultBot := configs.DB.Create(&messageBot)

	fmt.Println("bot response %v", messageBot.Content)

	// return data contains both message user and response bot

	if result.Error != nil || resultBot.Error != nil {
		fmt.Println("error123: ", result.Error, resultBot.Error)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create message",
		})
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":    message,
		"messageBot": messageBot,
		"test":       1,
	})
}

func GetMessagesByConversationId(c *gin.Context) {

	if c.Param("conversationId") == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Missing conversationId",
		})
	}

	var page int = 0
	var limit int = 10
	var conversationId, _ = strconv.Atoi(c.Param("conversationId"))

	if c.Query("page") != "" {
		page, _ = strconv.Atoi(c.Query("page"))
	}

	if c.Query("limit") != "" {
		limit, _ = strconv.Atoi(c.Query("limit"))
	}

	var total int64
	configs.DB.Model(&models.Message{}).Where("conversation_id = ? ", conversationId).Count(&total)
	totalPages := int(math.Ceil(float64(total) / float64(limit)))

	var nextPage int
	if page+1 <= totalPages {
		nextPage = page + 1
	} else {
		nextPage = totalPages
	}

	var prevPage int
	if page-1 >= 0 {
		prevPage = page - 1
	} else {
		prevPage = 0
	}

	var messages []models.Message
	configs.DB.Limit(limit).Offset(page*limit).Order("created_at desc").Where("conversation_id = ?", conversationId).Find(&messages)

	c.JSON(http.StatusOK, gin.H{
		"data":            &messages,
		"page":            page,
		"limit":           limit,
		"total":           total,
		"totalPages":      totalPages,
		"first":           page == 0,
		"last":            page == totalPages-1,
		"hasNextPage":     page < totalPages-1,
		"hasPreviousPage": page > 0,
		"nextPage":        nextPage,
		"prevPage":        prevPage,
	})
}
