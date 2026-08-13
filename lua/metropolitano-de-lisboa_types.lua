-- Typed models for the MetropolitanoDeLisboa SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Network
---@field history? table
---@field lines? table
---@field name? string
---@field schedules? table
---@field stations? table
---@field statistics? table
---@field totalLines? number
---@field totalStations? number

---@class NetworkLoadMatch
---@field history? table
---@field lines? table
---@field name? string
---@field schedules? table
---@field stations? table
---@field statistics? table
---@field totalLines? number
---@field totalStations? number

local M = {}

return M
