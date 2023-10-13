package controllers

import (
	"net/http"
	"rct_server/configs"
	"rct_server/models"

	"github.com/gin-gonic/gin"
)

func GetAllUsers(c *gin.Context) {
	users := []models.User{}
	configs.DB.Find(&users)
	c.JSON(http.StatusOK, users)
}

func GetInfo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "user info"})

}
