-- MetropolitanoDeLisboa SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "MetropolitanoDeLisboa",
      slug = "metropolitano-de-lisboa",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.metrolisboa.pt/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["network"] = {},
      },
    },
    entity = {
      ["network"] = {
        ["fields"] = {
          {
            ["name"] = "history",
            ["title"] = "History",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "lines",
            ["title"] = "Lines",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "schedules",
            ["title"] = "Schedules",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "stations",
            ["title"] = "Stations",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "statistics",
            ["title"] = "Statistics",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "totalLines",
            ["title"] = "Total Lines",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "totalStations",
            ["title"] = "Total Stations",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "network",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/network",
                ["segments"] = {
                  {
                    ["lit"] = "network",
                  },
                },
                ["parts"] = {
                  "network",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.network`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "historical",
                      ["orig"] = "historical",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                      ["example"] = false,
                    },
                    {
                      ["name"] = "include",
                      ["orig"] = "include",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "stations,lines",
                    },
                    {
                      ["name"] = "line",
                      ["orig"] = "line",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "historical",
                    "include",
                    "line",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
