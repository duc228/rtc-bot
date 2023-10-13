package models

import "time"

type User struct {
	Id        uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	FullName  string    `json:"full_name"`
	Email     string    `json:"email" gorm:"notNull;unique"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}
