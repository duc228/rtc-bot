package controllers

import (
	"fmt"
	"math"
	"net/http"
	"rct_server/configs"
	"rct_server/models"
	"strconv"

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

func GetConverastionByUserId(c *gin.Context) {

	userId, _ := c.Get("userId")

	var page int = 0
	var limit int = 10

	if c.Query("page") != "" {
		page, _ = strconv.Atoi(c.Query("page"))
	}

	if c.Query("limit") != "" {
		limit, _ = strconv.Atoi(c.Query("limit"))
	}

	var total int64
	configs.DB.Model(&models.Conversation{}).Where("user_id = ?", userId).Count(&total)
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

	// var conversations []models.Conversation
	// configs.DB.Where("user_id = ?", userId).Find(&conversations)
	// c.JSON(http.StatusOK, gin.H{
	// 	"data":  conversations,
	// 	"total": len(conversations),
	// })

	var conversations []models.Conversation
	configs.DB.Limit(limit).Offset(page*limit).Where("user_id = ?", userId).Find(&conversations)

	c.JSON(http.StatusOK, gin.H{
		"data":            &conversations,
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
