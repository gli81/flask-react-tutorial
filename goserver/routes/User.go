package routes

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/gli81/gocrud/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

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
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to DB")
	}
}

func CreateUser(c *gin.Context) {
	// get data from req
	var body struct {
		Username string `json: "username" binding: "required"`
		Email    string `json: "email" binding: "required"`
		Password string `json: "password" binding: "required"`
	}
	c.BindJSON(&body)

	// check if user exists
	var user models.User
	if err := db.Where("username = ?", body.Username).First(&user).Error; err == nil {
		// user found
		c.JSON(200, gin.H{"msg": fmt.Sprintf(
			"User %s already exists", body.Username,
		)})
		return
	} else if err != gorm.ErrRecordNotFound {
		c.JSON(200, gin.H{"msg": "Internal server error"})
		return
	}
	// check if email used
	if err := db.Where("email = ?", body.Email).First(&user).Error; err == nil {
		// email found
		c.JSON(200, gin.H{"msg": "Email used"})
		return
	} else if err != gorm.ErrRecordNotFound {
		c.JSON(200, gin.H{"msg": "Internal server error"})
		return
	}

	// create new user
	user = models.User{
		Username: body.Username,
		Password: body.Password,
		Email:    body.Email,
	}
	rslt := db.Create(&user)
	if rslt.Error != nil {
		c.JSON(200, gin.H{"error": rslt.Error})
	}
	c.JSON(201, gin.H{"msg": "User created successful"})
}
