package core

type MetropolitanoDeLisboaError struct {
	IsMetropolitanoDeLisboaError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMetropolitanoDeLisboaError(code string, msg string, ctx *Context) *MetropolitanoDeLisboaError {
	return &MetropolitanoDeLisboaError{
		IsMetropolitanoDeLisboaError: true,
		Sdk:              "MetropolitanoDeLisboa",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MetropolitanoDeLisboaError) Error() string {
	return e.Msg
}
