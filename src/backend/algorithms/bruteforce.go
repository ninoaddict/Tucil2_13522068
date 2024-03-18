package algorithms

import (
	"bezier/backend/models"
	"math"
)

func calculateBezier(t float64, bp models.BezierPoints) models.Point {
	res := models.BezierPoints{Iteration: bp.Iteration, Neff: 0, Points: []models.Point{}}
	res.InsertAfter(bp)
	for i := 0; i < bp.Neff-1; i++ {
		for j := 0; j < res.Neff-1; j++ {
			res.Points[j] = models.Point{X: (1-t)*res.Points[j].X + t*res.Points[j+1].X, Y: (1-t)*res.Points[j].Y + t*res.Points[j+1].Y}
		}
		res.Neff--
		res.Points = res.Points[:res.Neff]
	}
	return res.Points[0]
}

func GetPointsBruteforce(bp models.BezierPoints) models.BezierPoints {
	if bp.Neff < 2 {
		return bp
	}
	iter := int(math.Pow(2, float64(bp.Iteration))) - 1
	result := models.BezierPoints{Iteration: bp.Iteration, Neff: 2 + iter}
	for i := 0; i < iter+2; i++ {
		result.Points = append(result.Points, calculateBezier(float64(i)/float64(1+iter), bp))
	}
	return result
}
