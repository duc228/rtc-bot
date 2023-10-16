package models

import (
	"time"
)

type Conversation struct {
	// gorm.Model
	Id           uint `json:"id" gorm:"primaryKey;autoIncrement"`
	UserId       uint `json:"userId"`
	LastMesageID uint `json:"lastMesageId"`
	Messages     []Message
	CreatedAt    time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    time.Time `json:"updated_at" gorm:"autoUpdateTime"`
	// DeletedAt    gorm.DeletedAt `gorm:"index"`
}
