package models

type BezierPoints struct {
	Points    []Point `json:"points"`
	Neff      int     `json:"neff"`
	Iteration int     `json:"iteration"`
}

func (bp *BezierPoints) InsertBefore(newBp BezierPoints) {
	var newPoints []Point
	newPoints = append(newPoints, newBp.Points...)
	newPoints = append(newPoints, bp.Points...)
	bp.Points = newPoints
	bp.Iteration = newBp.Iteration
	bp.Neff += newBp.Neff
}

func (bp *BezierPoints) InsertAfter(newBp BezierPoints) {
	var newPoints []Point
	newPoints = append(newPoints, bp.Points...)
	newPoints = append(newPoints, newBp.Points...)
	bp.Points = newPoints
	bp.Iteration = newBp.Iteration
	bp.Neff += newBp.Neff
}
