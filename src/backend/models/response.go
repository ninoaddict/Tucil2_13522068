package models

type Response struct {
	Result BezierPoints `json:"result"`
	Time   float64      `json:"time"`
}
