# MetropolitanoDeLisboa SDK exists test

require "minitest/autorun"
require_relative "../MetropolitanoDeLisboa_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = MetropolitanoDeLisboaSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
