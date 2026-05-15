<?php
declare(strict_types=1);

// MetropolitanoDeLisboa SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class MetropolitanoDeLisboaFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new MetropolitanoDeLisboaBaseFeature();
            case "test":
                return new MetropolitanoDeLisboaTestFeature();
            default:
                return new MetropolitanoDeLisboaBaseFeature();
        }
    }
}
