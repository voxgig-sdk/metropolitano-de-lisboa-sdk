# MetropolitanoDeLisboa SDK configuration

module MetropolitanoDeLisboaConfig
  def self.make_config
    {
      "main" => {
        "name" => "MetropolitanoDeLisboa",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.metrolisboa.pt/v1",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "network" => {},
        },
      },
      "entity" => {
        "network" => {
          "fields" => [
            {
              "active" => true,
              "name" => "network",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
          ],
          "name" => "network",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => false,
                        "kind" => "query",
                        "name" => "historical",
                        "orig" => "historical",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "active" => true,
                        "example" => "stations,lines",
                        "kind" => "query",
                        "name" => "include",
                        "orig" => "include",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "line",
                        "orig" => "line",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/network",
                  "parts" => [
                    "network",
                  ],
                  "select" => {
                    "exist" => [
                      "historical",
                      "include",
                      "line",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.network`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    MetropolitanoDeLisboaFeatures.make_feature(name)
  end
end
