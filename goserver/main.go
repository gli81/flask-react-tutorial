package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func init() {
	var err error
	err = godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USERNAME")
	pw := os.Getenv("DB_PASSWORD")
	port := os.Getenv("DB_PORT")
	if host == "" || user == "" || pw == "" || port == "" {
		log.Fatal("Failed to load DB credentials")
	}
	dsn := fmt.Sprintf(
		"host=%s user=%v password=%v dbname=go_test port=%v sslmode=disable",
		host, user, pw, port,
	)
	_, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to DB")
	}
}

func main() {
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "ping",
		})
	})

	r.Run()
}
