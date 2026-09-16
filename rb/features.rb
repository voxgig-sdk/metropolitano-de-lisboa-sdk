# MetropolitanoDeLisboa SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MetropolitanoDeLisboaFeatures
  def self.make_feature(name)
    case name
    when "base"
      MetropolitanoDeLisboaBaseFeature.new
    when "ratelimit"
      MetropolitanoDeLisboaRatelimitFeature.new
    when "retry"
      MetropolitanoDeLisboaRetryFeature.new
    when "test"
      MetropolitanoDeLisboaTestFeature.new
    when "timeout"
      MetropolitanoDeLisboaTimeoutFeature.new
    else
      MetropolitanoDeLisboaBaseFeature.new
    end
  end
end
