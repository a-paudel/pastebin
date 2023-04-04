package models

import (
	"math/rand"

	"gorm.io/gorm"
)

type Text struct {
	gorm.Model

	Content string
	Code    string `gorm:"uniqueIndex"`
}

type TextInput struct {
	Content string `form:"content"`
}

func generateCode() string {
	letters := []rune("abcdefghijklmnopqrstuvwxyz")
	code := make([]rune, 3)
	for i := range code {
		code[i] = letters[rand.Intn(len(letters))]
	}

	// check if code already exists
	var text Text
	err := Db.Where("code = ?", string(code)).First(&text).Error
	if err == nil {
		// already exists
		return generateCode()
	}
	return string(code)
}

func (t *Text) Create(content string) {
	t.Content = content
	t.Code = generateCode()
	Db.Create(t)
}
