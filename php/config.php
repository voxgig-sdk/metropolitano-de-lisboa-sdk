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
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
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
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'lines',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'schedules',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'stations',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'statistics',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'totalLines',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'totalStations',
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
                  'args' => [
                    'query' => [
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'historical',
                        'orig' => 'historical',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 'stations,lines',
                        'kind' => 'query',
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'line',
                        'orig' => 'line',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/network',
                  'segments' => [
                    [
                      'lit' => 'network',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'historical',
                      'include',
                      'line',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.network`',
                  ],
                  'parts' => [
                    'network',
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
