
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
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://api.metrolisboa.pt/v1',

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
          "active": true,
          "name": "network",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        }
      ],
      "name": "network",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "historical",
                    "orig": "historical",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": "stations,lines",
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "line",
                    "orig": "line",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
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

