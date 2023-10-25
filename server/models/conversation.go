package models

import (
	"time"
)

type Conversation struct {
	Id          uint   `json:"id" gorm:"primaryKey;autoIncrement"`
	UserId      uint   `json:"userId"`
	LastMessage string `json:"lastMessage"`
	// LastMessageId uint `json:"lastMesageId" gorm:"default:null"`
	// LastMessage   Message `json:"lastMessage" gorm:"foreignKey:LastMessageId"`
	// LastMessage Message `json:"lastMessage"`
	Messages  []Message
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}
