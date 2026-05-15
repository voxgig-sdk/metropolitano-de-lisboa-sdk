# MetropolitanoDeLisboa SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

MetropolitanoDeLisboaUtility.registrar = ->(u) {
  u.clean = MetropolitanoDeLisboaUtilities::Clean
  u.done = MetropolitanoDeLisboaUtilities::Done
  u.make_error = MetropolitanoDeLisboaUtilities::MakeError
  u.feature_add = MetropolitanoDeLisboaUtilities::FeatureAdd
  u.feature_hook = MetropolitanoDeLisboaUtilities::FeatureHook
  u.feature_init = MetropolitanoDeLisboaUtilities::FeatureInit
  u.fetcher = MetropolitanoDeLisboaUtilities::Fetcher
  u.make_fetch_def = MetropolitanoDeLisboaUtilities::MakeFetchDef
  u.make_context = MetropolitanoDeLisboaUtilities::MakeContext
  u.make_options = MetropolitanoDeLisboaUtilities::MakeOptions
  u.make_request = MetropolitanoDeLisboaUtilities::MakeRequest
  u.make_response = MetropolitanoDeLisboaUtilities::MakeResponse
  u.make_result = MetropolitanoDeLisboaUtilities::MakeResult
  u.make_point = MetropolitanoDeLisboaUtilities::MakePoint
  u.make_spec = MetropolitanoDeLisboaUtilities::MakeSpec
  u.make_url = MetropolitanoDeLisboaUtilities::MakeUrl
  u.param = MetropolitanoDeLisboaUtilities::Param
  u.prepare_auth = MetropolitanoDeLisboaUtilities::PrepareAuth
  u.prepare_body = MetropolitanoDeLisboaUtilities::PrepareBody
  u.prepare_headers = MetropolitanoDeLisboaUtilities::PrepareHeaders
  u.prepare_method = MetropolitanoDeLisboaUtilities::PrepareMethod
  u.prepare_params = MetropolitanoDeLisboaUtilities::PrepareParams
  u.prepare_path = MetropolitanoDeLisboaUtilities::PreparePath
  u.prepare_query = MetropolitanoDeLisboaUtilities::PrepareQuery
  u.result_basic = MetropolitanoDeLisboaUtilities::ResultBasic
  u.result_body = MetropolitanoDeLisboaUtilities::ResultBody
  u.result_headers = MetropolitanoDeLisboaUtilities::ResultHeaders
  u.transform_request = MetropolitanoDeLisboaUtilities::TransformRequest
  u.transform_response = MetropolitanoDeLisboaUtilities::TransformResponse
}
