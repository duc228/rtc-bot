package controllers

import "github.com/gin-gonic/gin"

func Login(c *gin.Context) {
	c.JSON(200, gin.H{"message": "login"})
}

func SignUp(c *gin.Context) {
	c.JSON(200, gin.H{"message": "sign up 123"})

}

func GetProfile(c *gin.Context) {}
