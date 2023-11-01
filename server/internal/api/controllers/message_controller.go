package controllers

import "github.com/gin-gonic/gin"

func CreateMessage(c *gin.Context) {
	c.JSON(200, gin.H{"message": "CreateMessage"})
}

func GetAllMessagesByConversationId(c *gin.Context) {
	c.JSON(200, gin.H{"message": "GetAllMessagesByConversationId"})

}

func GetMessagesByConversationId(c *gin.Context) {}
