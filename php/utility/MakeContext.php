<?php
declare(strict_types=1);

// MetropolitanoDeLisboa SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MetropolitanoDeLisboaMakeContext
{
    public static function call(array $ctxmap, ?MetropolitanoDeLisboaContext $basectx): MetropolitanoDeLisboaContext
    {
        return new MetropolitanoDeLisboaContext($ctxmap, $basectx);
    }
}
