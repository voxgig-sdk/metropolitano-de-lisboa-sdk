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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
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
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "lines",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "schedules",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "stations",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "statistics",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "totalLines",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "totalStations",
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
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "historical",
                      ["orig"] = "historical",
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["example"] = "stations,lines",
                      ["kind"] = "query",
                      ["name"] = "include",
                      ["orig"] = "include",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "line",
                      ["orig"] = "line",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/network",
                ["segments"] = {
                  {
                    ["lit"] = "network",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "historical",
                    "include",
                    "line",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.network`",
                },
                ["parts"] = {
                  "network",
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
