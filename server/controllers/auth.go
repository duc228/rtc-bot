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
	// c.JSON(http.StatusCreated, gin.H{"token": &signUpInfo, "fullName": signUpInfo.FullName})
	// return

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

	token := utils.GenerateToken(newUser.Id)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})
	}

	c.JSON(http.StatusCreated, gin.H{"token": token, "user": &newUser, "signup": signUpInfo.FullName})

}

func Login(c *gin.Context) {
	var LoginInfo dto.Credentials
	c.BindJSON(&LoginInfo)
	fmt.Printf("%v\n, ", &LoginInfo)

	var user models.User
	configs.DB.Where("email=?", LoginInfo.Email).Find(&user)

	// c.JSON(http.StatusOK, gin.H{"token": &LoginInfo, "user": &user, "password": &user.Password})
	// return

	if user.Id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password 1",
		})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(LoginInfo.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password 2",
		})
		return
	}

	token := utils.GenerateToken(user.Id)

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("auth", token, 3600*24, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{"token": token, "id": user.Id})
}

func GetProfile(c *gin.Context) {

	// user, _ := c.Get("user")
	userId, _ := c.Get("userId")
	if userId == nil {
		c.JSON(http.StatusOK, gin.H{"error": "has error",
			"user": userId})
	}

	var userInfo models.User
	configs.DB.Select("id", "Email", "FullName").Where("id =  ?", userId.(uint)).Find(&userInfo)

	c.JSON(http.StatusOK, gin.H{"success": true,
		"data": userInfo, "id": userId.(uint)})

}
