package controllers

import "github.com/gin-gonic/gin"

func GetConverastionByUserId(c *gin.Context) {
	c.JSON(200, gin.H{"message": "GetConverastionByUserId"})
}

func GetAllConversationsByUserId(c *gin.Context) {
	c.JSON(200, gin.H{"message": "GetAllConversationsByUserId"})

}

func CreateConversation(c *gin.Context) {}
