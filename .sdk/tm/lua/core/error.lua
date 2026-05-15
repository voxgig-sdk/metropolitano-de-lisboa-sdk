-- MetropolitanoDeLisboa SDK error

local MetropolitanoDeLisboaError = {}
MetropolitanoDeLisboaError.__index = MetropolitanoDeLisboaError


function MetropolitanoDeLisboaError.new(code, msg, ctx)
  local self = setmetatable({}, MetropolitanoDeLisboaError)
  self.is_sdk_error = true
  self.sdk = "MetropolitanoDeLisboa"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MetropolitanoDeLisboaError:error()
  return self.msg
end


function MetropolitanoDeLisboaError:__tostring()
  return self.msg
end


return MetropolitanoDeLisboaError
