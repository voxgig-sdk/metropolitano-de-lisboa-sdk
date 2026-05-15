<?php
declare(strict_types=1);

// MetropolitanoDeLisboa SDK utility: prepare_body

class MetropolitanoDeLisboaPrepareBody
{
    public static function call(MetropolitanoDeLisboaContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
