package configs

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DBConnect() *gorm.DB {
	// dbUri := "root:abc@tcp(rct_db:3306)/rct_db?parseTime=true"
	dbUri := os.Getenv("DB_URI")
	fmt.Printf("db uri: %v\n", dbUri)
	db, err := gorm.Open(mysql.Open(dbUri), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	log.Println("Connect DB success")
	DB = db
	return db
}
