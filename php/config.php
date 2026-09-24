<?php
declare(strict_types=1);

// MetropolitanoDeLisboa SDK configuration

class MetropolitanoDeLisboaConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "MetropolitanoDeLisboa",
                "slug" => "metropolitano-de-lisboa",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.metrolisboa.pt/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "network" => [],
                ],
            ],
            "entity" => [
        'network' => [
          'fields' => [
            [
              'name' => 'history',
              'title' => 'History',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'lines',
              'title' => 'Lines',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'schedules',
              'title' => 'Schedules',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'stations',
              'title' => 'Stations',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'statistics',
              'title' => 'Statistics',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'totalLines',
              'title' => 'Total Lines',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'totalStations',
              'title' => 'Total Stations',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'network',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/network',
                  'segments' => [
                    [
                      'lit' => 'network',
                    ],
                  ],
                  'parts' => [
                    'network',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.network`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'historical',
                        'orig' => 'historical',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                        'example' => false,
                      ],
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'stations,lines',
                      ],
                      [
                        'name' => 'line',
                        'orig' => 'line',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'historical',
                      'include',
                      'line',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return MetropolitanoDeLisboaFeatures::make_feature($name);
    }
}
