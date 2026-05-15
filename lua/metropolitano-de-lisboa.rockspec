package = "voxgig-sdk-metropolitano-de-lisboa"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/metropolitano-de-lisboa-sdk.git"
}
description = {
  summary = "MetropolitanoDeLisboa SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["metropolitano-de-lisboa_sdk"] = "metropolitano-de-lisboa_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
