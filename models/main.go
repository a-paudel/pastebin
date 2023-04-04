package models

import (
	"io/fs"
	"os"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var Db *gorm.DB

func init() {
	// create data folder if it doesn't exist
	os.Mkdir("data", fs.ModePerm)
	db, err := gorm.Open(sqlite.Open("data/pastebin.db"))
	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&Text{})

	Db = db
}
