<?php
declare(strict_types=1);

// MetropolitanoDeLisboa SDK configuration

class MetropolitanoDeLisboaConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "MetropolitanoDeLisboa",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.metrolisboa.pt/v1",
                "auth" => [
                    "prefix" => "Bearer",
                ],
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
              'name' => 'network',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 0,
            ],
          ],
          'name' => 'network',
          'op' => [
            'load' => [
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
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                        'active' => true,
                      ],
                      [
                        'example' => 'stations,lines',
                        'kind' => 'query',
                        'name' => 'include',
                        'orig' => 'include',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'line',
                        'orig' => 'line',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/network',
                  'parts' => [
                    'network',
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
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
