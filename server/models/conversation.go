package models

import "gorm.io/gorm"

type Conversation struct {
	gorm.Model
	Id       uint `json:"id" gorm:"primaryKey;autoIncrement"`
	UserId   uint `json:"userId"`
	Messages []Message
}
