package models

import "time"

type Message struct {
	// gorm.Model
	Id uint `json:"id" gorm:"primaryKey;autoIncrement"`
	// IsBot  bool `json:"isBot"`
	Content        string    `json:"content" `
	UserId         uint      `json:"userId"`
	ConversationId uint      `json:"conversationId"`
	CreatedAt      time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt      time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}
