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

func (r *UserRepository) FindUserById(id uint) (entities.User, error) {
	var user entities.User
	err := configs.DB.Select("id", "Email", "FullName").Where("id =  ?", id).Find(&user).Error
	return user, err
}
