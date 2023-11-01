package repositories

import (
	"rct_server/configs"
	"rct_server/internal/entities"
)

type UserRepository struct {
}

var DB = configs.DB

func (r *UserRepository) FindUserByEmail(email string) (entities.User, error) {
	var user entities.User
	err := configs.DB.Where("email=?", email).First(&user).Error
	return user, err
}
