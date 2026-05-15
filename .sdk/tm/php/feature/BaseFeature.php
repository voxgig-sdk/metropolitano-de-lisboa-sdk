<?php
declare(strict_types=1);

// MetropolitanoDeLisboa SDK base feature

class MetropolitanoDeLisboaBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MetropolitanoDeLisboaContext $ctx, array $options): void {}
    public function PostConstruct(MetropolitanoDeLisboaContext $ctx): void {}
    public function PostConstructEntity(MetropolitanoDeLisboaContext $ctx): void {}
    public function SetData(MetropolitanoDeLisboaContext $ctx): void {}
    public function GetData(MetropolitanoDeLisboaContext $ctx): void {}
    public function GetMatch(MetropolitanoDeLisboaContext $ctx): void {}
    public function SetMatch(MetropolitanoDeLisboaContext $ctx): void {}
    public function PrePoint(MetropolitanoDeLisboaContext $ctx): void {}
    public function PreSpec(MetropolitanoDeLisboaContext $ctx): void {}
    public function PreRequest(MetropolitanoDeLisboaContext $ctx): void {}
    public function PreResponse(MetropolitanoDeLisboaContext $ctx): void {}
    public function PreResult(MetropolitanoDeLisboaContext $ctx): void {}
    public function PreDone(MetropolitanoDeLisboaContext $ctx): void {}
    public function PreUnexpected(MetropolitanoDeLisboaContext $ctx): void {}
}
