# MetropolitanoDeLisboa SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MetropolitanoDeLisboaFeatures
  def self.make_feature(name)
    case name
    when "base"
      MetropolitanoDeLisboaBaseFeature.new
    when "test"
      MetropolitanoDeLisboaTestFeature.new
    else
      MetropolitanoDeLisboaBaseFeature.new
    end
  end
end
