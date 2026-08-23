package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "MetropolitanoDeLisboa",
			"slug": "metropolitano-de-lisboa",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.metrolisboa.pt/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"network": map[string]any{},
			},
		},
		"entity": map[string]any{
			"network": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "history",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "lines",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "schedules",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "stations",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "statistics",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "totalLines",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "totalStations",
						"type": "`$INTEGER`",
					},
				},
				"name": "network",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "historical",
											"orig": "historical",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": "stations,lines",
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "line",
											"orig": "line",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/network",
								"parts": []any{
									"network",
								},
								"select": map[string]any{
									"exist": []any{
										"historical",
										"include",
										"line",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.network`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
