package controllers

import (
	"fmt"
	"net/http"
	"rct_server/configs"
	"rct_server/dto"
	"rct_server/models"
	"rct_server/utils"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context) {
	var signUpInfo models.User
	c.BindJSON(&signUpInfo)

	hash, err := bcrypt.GenerateFromPassword([]byte(signUpInfo.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
	}

	newUser := models.User{
		Email:    signUpInfo.Email,
		FullName: signUpInfo.FullName,
		Password: string(hash),
	}

	result := configs.DB.Create(&newUser)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})
	}

	c.JSON(http.StatusCreated, &newUser)
}

func Login(c *gin.Context) {
	var LoginInfo dto.Credentials
	c.BindJSON(&LoginInfo)
	fmt.Printf("%v\n, ", &LoginInfo)
	var user models.User
	configs.DB.Where("email=?", LoginInfo.Email).Find(&user)

	if user.Id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(LoginInfo.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	token := utils.GenerateToken(user.Id)

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("auth", token, 3600*24, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{"token": token})
}

func Validate(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"validate": "ok"})

}
