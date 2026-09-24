
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'MetropolitanoDeLisboa',
        slug: "metropolitano-de-lisboa",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "title": "History",
          "type": "`$OBJECT`"
        },
        {
          "name": "lines",
          "title": "Lines",
          "type": "`$ARRAY`"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`"
        },
        {
          "name": "schedules",
          "title": "Schedules",
          "type": "`$OBJECT`"
        },
        {
          "name": "stations",
          "title": "Stations",
          "type": "`$ARRAY`"
        },
        {
          "name": "statistics",
          "title": "Statistics",
          "type": "`$OBJECT`"
        },
        {
          "name": "totalLines",
          "title": "Total Lines",
          "type": "`$INTEGER`"
        },
        {
          "name": "totalStations",
          "title": "Total Stations",
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
              "kind": "http",
              "method": "GET",
              "orig": "/network",
              "segments": [
                {
                  "lit": "network"
                }
              ],
              "parts": [
                "network"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.network`"
              },
              "args": {
                "query": [
                  {
                    "name": "historical",
                    "orig": "historical",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false
                  },
                  {
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "stations,lines"
                  },
                  {
                    "name": "line",
                    "orig": "line",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "historical",
                  "include",
                  "line"
                ]
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
  config,
  FEATURE_PLUGINS,
}

