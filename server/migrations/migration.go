package migrations

import (
	"rct_server/configs"
	"rct_server/models"
)

func Migrate() {
	configs.DB.AutoMigrate(&models.User{}, &models.Conversation{}, &models.Message{})
	// configs.DB.Migrator().CreateConstraint(&models.Conversation{}, "fk_conversation_last_message")
}
