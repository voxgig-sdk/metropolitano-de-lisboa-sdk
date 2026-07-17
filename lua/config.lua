-- MetropolitanoDeLisboa SDK configuration

local function make_config()
  return {
    main = {
      name = "MetropolitanoDeLisboa",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["active"] = true,
            ["name"] = "network",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 0,
          },
        },
        ["name"] = "network",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "historical",
                      ["orig"] = "historical",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "stations,lines",
                      ["kind"] = "query",
                      ["name"] = "include",
                      ["orig"] = "include",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "line",
                      ["orig"] = "line",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/network",
                ["parts"] = {
                  "network",
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
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
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
