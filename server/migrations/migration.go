package migrations

import (
	"rct_server/configs"
	"rct_server/models"
)

func Migrate() {
	configs.DB.AutoMigrate(&models.User{})
}
