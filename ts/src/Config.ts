
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'MetropolitanoDeLisboa',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.metrolisboa.pt/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      network: {
      },

    }
  }


  entity = {
    "network": {
      "fields": [
        {
          "name": "history",
          "type": "`$OBJECT`"
        },
        {
          "name": "lines",
          "type": "`$ARRAY`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "schedules",
          "type": "`$OBJECT`"
        },
        {
          "name": "stations",
          "type": "`$ARRAY`"
        },
        {
          "name": "statistics",
          "type": "`$OBJECT`"
        },
        {
          "name": "totalLines",
          "type": "`$INTEGER`"
        },
        {
          "name": "totalStations",
          "type": "`$INTEGER`"
        }
      ],
      "name": "network",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": false,
                    "kind": "query",
                    "name": "historical",
                    "orig": "historical",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": "stations,lines",
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "line",
                    "orig": "line",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/network",
              "parts": [
                "network"
              ],
              "select": {
                "exist": [
                  "historical",
                  "include",
                  "line"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.network`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

