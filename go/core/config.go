package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "MetropolitanoDeLisboa",
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
						"name": "network",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
				},
				"name": "network",
				"op": map[string]any{
					"load": map[string]any{
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
											"reqd": false,
											"type": "`$BOOLEAN`",
											"active": true,
										},
										map[string]any{
											"example": "stations,lines",
											"kind": "query",
											"name": "include",
											"orig": "include",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "line",
											"orig": "line",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
