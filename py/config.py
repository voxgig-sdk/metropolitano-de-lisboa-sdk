# MetropolitanoDeLisboa SDK configuration


def make_config():
    return {
        "main": {
            "name": "MetropolitanoDeLisboa",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.metrolisboa.pt/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "network": {},
            },
        },
        "entity": {
      "network": {
        "fields": [
          {
            "name": "network",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
        ],
        "name": "network",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": False,
                      "kind": "query",
                      "name": "historical",
                      "orig": "historical",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                    {
                      "example": "stations,lines",
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "line",
                      "orig": "line",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/network",
                "parts": [
                  "network",
                ],
                "select": {
                  "exist": [
                    "historical",
                    "include",
                    "line",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
