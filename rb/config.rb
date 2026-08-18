# MetropolitanoDeLisboa SDK configuration

module MetropolitanoDeLisboaConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
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
              "name" => "history",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "lines",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "schedules",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "stations",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "statistics",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "totalLines",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "totalStations",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "network",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "historical",
                        "orig" => "historical",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => "stations,lines",
                        "kind" => "query",
                        "name" => "include",
                        "orig" => "include",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "line",
                        "orig" => "line",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
