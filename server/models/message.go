package models

import "gorm.io/gorm"

type Message struct {
	gorm.Model
	Id uint `json:"id" gorm:"primaryKey;autoIncrement"`
	// IsBot  bool `json:"isBot"`
	Content        string `json:"content" `
	UserId         uint   `json:"userId"`
	ConversationId uint   `json:"conversationId"`
}