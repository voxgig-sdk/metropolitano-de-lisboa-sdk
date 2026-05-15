-- ProjectName SDK exists test

local sdk = require("metropolitano-de-lisboa_sdk")

describe("MetropolitanoDeLisboaSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
