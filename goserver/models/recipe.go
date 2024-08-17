package models

import "gorm.io/gorm"

type Recipe struct {
	gorm.Model
	Title       string
	Description string
}
