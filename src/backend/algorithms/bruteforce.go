package algorithms

import (
	"bezier/backend/models"
	"math"
)

func calculateBezier(t float64, bp models.BezierPoints, low int, hi int) models.Point {
	if low == hi {
		return bp.Points[low]
	}
	point1 := calculateBezier(t, bp, low, hi-1)
	point2 := calculateBezier(t, bp, low+1, hi)
	point1.X *= (1 - t)
	point1.Y *= (1 - t)
	point2.X *= t
	point2.Y *= t
	result := models.Point{X: point1.X + point2.X, Y: point1.Y + point2.Y}
	return result
}

func GetPointsBruteforce(bp models.BezierPoints) models.BezierPoints {
	if bp.Neff < 2 {
		return bp
	}
	iter := int(math.Pow(2, float64(bp.Iteration))) - 1
	result := models.BezierPoints{Iteration: bp.Iteration, Neff: 2 + iter}
	for i := 0; i < iter+2; i++ {
		result.Points = append(result.Points, calculateBezier(float64(i)/float64(1+iter), bp, 0, bp.Neff-1))
	}
	return result
}
