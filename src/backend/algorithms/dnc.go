package algorithms

import (
	"bezier/backend/models"
)

func getMidPoints(bp models.BezierPoints) (models.BezierPoints, models.BezierPoints, models.BezierPoints) {
	mid := models.BezierPoints{Iteration: bp.Iteration, Neff: 0, Points: []models.Point{}}
	left := models.BezierPoints{Iteration: bp.Iteration, Neff: 0, Points: []models.Point{}}
	right := models.BezierPoints{Iteration: bp.Iteration, Neff: 0, Points: []models.Point{}}

	left.InsertAfter(models.BezierPoints{Neff: 1, Points: []models.Point{bp.Points[0]}, Iteration: bp.Iteration})
	right.InsertBefore(models.BezierPoints{Neff: 1, Points: []models.Point{bp.Points[bp.Neff-1]}, Iteration: bp.Iteration})
	mid.InsertAfter(bp)
	for i := 0; i < bp.Neff-1; i++ {
		for j := 0; j < mid.Neff-1; j++ {
			mid.Points[j] = models.Point{X: (mid.Points[j].X + mid.Points[j+1].X) / 2, Y: (mid.Points[j].Y + mid.Points[j+1].Y) / 2}
		}
		mid.Neff--
		mid.Points = mid.Points[:mid.Neff]
		left.InsertAfter(models.BezierPoints{Neff: 1, Points: []models.Point{mid.Points[0]}, Iteration: bp.Iteration})
		right.InsertBefore(models.BezierPoints{Neff: 1, Points: []models.Point{mid.Points[mid.Neff-1]}, Iteration: bp.Iteration})
	}
	return left, mid, right
}

func findPoints(bp models.BezierPoints, dep int) models.BezierPoints {
	if dep >= bp.Iteration {
		return models.BezierPoints{Iteration: bp.Iteration}
	}
	left, mid, right := getMidPoints(bp)

	leftMidPoints := findPoints(left, dep+1)
	rightMidPoints := findPoints(right, dep+1)

	mid.InsertBefore(leftMidPoints)
	mid.InsertAfter(rightMidPoints)
	return mid
}

func GetPointsDnc(bp models.BezierPoints) models.BezierPoints {
	if bp.Neff < 2 {
		return bp
	}
	result := models.BezierPoints{Iteration: bp.Iteration, Neff: 2}
	result.Points = append(result.Points, bp.Points[0])
	result.InsertAfter(findPoints(bp, 0))
	result.Points = append(result.Points, bp.Points[bp.Neff-1])
	return result
}
