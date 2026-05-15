<?php
declare(strict_types=1);

// MetropolitanoDeLisboa SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

MetropolitanoDeLisboaUtility::setRegistrar(function (MetropolitanoDeLisboaUtility $u): void {
    $u->clean = [MetropolitanoDeLisboaClean::class, 'call'];
    $u->done = [MetropolitanoDeLisboaDone::class, 'call'];
    $u->make_error = [MetropolitanoDeLisboaMakeError::class, 'call'];
    $u->feature_add = [MetropolitanoDeLisboaFeatureAdd::class, 'call'];
    $u->feature_hook = [MetropolitanoDeLisboaFeatureHook::class, 'call'];
    $u->feature_init = [MetropolitanoDeLisboaFeatureInit::class, 'call'];
    $u->fetcher = [MetropolitanoDeLisboaFetcher::class, 'call'];
    $u->make_fetch_def = [MetropolitanoDeLisboaMakeFetchDef::class, 'call'];
    $u->make_context = [MetropolitanoDeLisboaMakeContext::class, 'call'];
    $u->make_options = [MetropolitanoDeLisboaMakeOptions::class, 'call'];
    $u->make_request = [MetropolitanoDeLisboaMakeRequest::class, 'call'];
    $u->make_response = [MetropolitanoDeLisboaMakeResponse::class, 'call'];
    $u->make_result = [MetropolitanoDeLisboaMakeResult::class, 'call'];
    $u->make_point = [MetropolitanoDeLisboaMakePoint::class, 'call'];
    $u->make_spec = [MetropolitanoDeLisboaMakeSpec::class, 'call'];
    $u->make_url = [MetropolitanoDeLisboaMakeUrl::class, 'call'];
    $u->param = [MetropolitanoDeLisboaParam::class, 'call'];
    $u->prepare_auth = [MetropolitanoDeLisboaPrepareAuth::class, 'call'];
    $u->prepare_body = [MetropolitanoDeLisboaPrepareBody::class, 'call'];
    $u->prepare_headers = [MetropolitanoDeLisboaPrepareHeaders::class, 'call'];
    $u->prepare_method = [MetropolitanoDeLisboaPrepareMethod::class, 'call'];
    $u->prepare_params = [MetropolitanoDeLisboaPrepareParams::class, 'call'];
    $u->prepare_path = [MetropolitanoDeLisboaPreparePath::class, 'call'];
    $u->prepare_query = [MetropolitanoDeLisboaPrepareQuery::class, 'call'];
    $u->result_basic = [MetropolitanoDeLisboaResultBasic::class, 'call'];
    $u->result_body = [MetropolitanoDeLisboaResultBody::class, 'call'];
    $u->result_headers = [MetropolitanoDeLisboaResultHeaders::class, 'call'];
    $u->transform_request = [MetropolitanoDeLisboaTransformRequest::class, 'call'];
    $u->transform_response = [MetropolitanoDeLisboaTransformResponse::class, 'call'];
});
