package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gli81/gocrud/initialiers"
)

func init() {
	initialiers.LoadEnv()
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
