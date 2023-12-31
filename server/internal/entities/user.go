package entities

import (
	"time"
)

type User struct {
	Id            uint           `json:"id" gorm:"primaryKey;autoIncrement"`
	FullName      string         `json:"full_name" gorm:"column: full_name"`
	Email         string         `json:"email" gorm:"notNull;unique"`
	Password      string         `json:"password"`
	CreatedAt     time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt     time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
	Messages      []Message      `json:"messages"`
	Conversations []Conversation `json:"conversations"`
}
