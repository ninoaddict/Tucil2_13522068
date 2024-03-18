package api

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"bezier/backend/models"

	"bezier/backend/algorithms"
)

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, application-json")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}
		c.Next()
	}
}

func handleDnc(c *gin.Context) {
	var points models.BezierPoints

	if err := c.BindJSON(&points); err != nil {
		fmt.Println("Gagal")
		return
	}

	startTime := time.Now()
	result := algorithms.GetPointsDnc(points)
	endTime := time.Now()
	executionTime := endTime.Sub(startTime)

	response := models.Response{
		Result: result,
		Time:   float64(executionTime.Microseconds()) / float64(1000),
	}
	c.IndentedJSON(http.StatusCreated, response)
}

func handleBruteforce(c *gin.Context) {
	var points models.BezierPoints

	if err := c.BindJSON(&points); err != nil {
		fmt.Println("Gagal")
		return
	}

	startTime := time.Now()
	result := algorithms.GetPointsBruteforce(points)
	endTime := time.Now()
	executionTime := endTime.Sub(startTime)

	response := models.Response{
		Result: result,
		Time:   float64(executionTime.Microseconds()) / float64(1000),
	}
	c.IndentedJSON(http.StatusCreated, response)
}

func Init() {
	router := gin.Default()
	router.Use(corsMiddleware())
	router.POST("/dnc", handleDnc)
	router.POST("/bruteforce", handleBruteforce)
	router.Run("localhost:8080")
}
