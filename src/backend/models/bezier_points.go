package models

type BezierPoints struct {
	Points    []Point `json:"points"`
	Neff      int     `json:"neff"`
	Iteration int     `json:"iteration"`
}

func (bp *BezierPoints) InsertBefore(newBp BezierPoints) {
	bp.Points = append(newBp.Points, bp.Points...)
	bp.Iteration = newBp.Iteration
	bp.Neff += newBp.Neff
}

func (bp *BezierPoints) InsertAfter(newBp BezierPoints) {
	bp.Points = append(bp.Points, newBp.Points...)
	bp.Iteration = newBp.Iteration
	bp.Neff += newBp.Neff
}
