package configs

import (
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

type Database struct {
	DB *gorm.DB
}

var Conn Database

func DBConnect() *gorm.DB {

	// dbUri := "root:abc@tcp(rct_db:3306)/rct_db?parseTime=true"
	dbUri := os.Getenv("DB_URI")
	db, err := gorm.Open(mysql.Open(dbUri), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		panic(err)
	}

	log.Println("Connect DB success")
	DB = db
	Conn.DB = db

	return db
}
