package migrations

import (
	"rct_server/configs"
	"rct_server/internal/entities"
)

func Migrate() {
	configs.DB.AutoMigrate(&entities.User{}, &entities.Conversation{}, &entities.Message{})
}
