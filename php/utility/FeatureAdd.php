<?php
declare(strict_types=1);

// MetropolitanoDeLisboa SDK utility: feature_add

class MetropolitanoDeLisboaFeatureAdd
{
    public static function call(MetropolitanoDeLisboaContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
