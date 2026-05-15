<?php
declare(strict_types=1);

// MetropolitanoDeLisboa SDK utility: prepare_headers

class MetropolitanoDeLisboaPrepareHeaders
{
    public static function call(MetropolitanoDeLisboaContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
