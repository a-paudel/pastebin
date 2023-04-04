package models

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var Db *gorm.DB

func init() {
	db, err := gorm.Open(sqlite.Open("data/pastebin.db"))
	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&Text{})

	Db = db
}
