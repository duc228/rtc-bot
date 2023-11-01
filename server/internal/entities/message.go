package entities

import "time"

type Message struct {
	Id             uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	Content        string    `json:"content" `
	UserId         uint      `json:"userId" gorm:"default:null"`
	ConversationId uint      `json:"conversationId"`
	CreatedAt      time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt      time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}
