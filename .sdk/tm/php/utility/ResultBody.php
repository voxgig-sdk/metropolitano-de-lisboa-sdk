<?php
declare(strict_types=1);

// MetropolitanoDeLisboa SDK utility: result_body

class MetropolitanoDeLisboaResultBody
{
    public static function call(MetropolitanoDeLisboaContext $ctx): ?MetropolitanoDeLisboaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
