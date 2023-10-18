package models

import (
	"time"
)

type Conversation struct {
	Id           uint    `json:"id" gorm:"primaryKey;autoIncrement"`
	UserId       uint    `json:"userId"`
	LastMesageID uint    `json:"lastMesageId"`
	LastMessage  Message `json:"lastMessage"`
	Messages     []Message
	CreatedAt    time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}
