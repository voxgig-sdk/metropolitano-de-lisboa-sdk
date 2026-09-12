
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
              "segments": [
                {
                  "lit": "network"
                }
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
              "parts": [
                "network"
              ]
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

