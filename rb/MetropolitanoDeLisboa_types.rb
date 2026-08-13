# frozen_string_literal: true

# Typed models for the MetropolitanoDeLisboa SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Network entity data model.
#
# @!attribute [rw] history
#   @return [Hash, nil]
#
# @!attribute [rw] lines
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] schedules
#   @return [Hash, nil]
#
# @!attribute [rw] stations
#   @return [Array, nil]
#
# @!attribute [rw] statistics
#   @return [Hash, nil]
#
# @!attribute [rw] totalLines
#   @return [Integer, nil]
#
# @!attribute [rw] totalStations
#   @return [Integer, nil]
Network = Struct.new(
  :history,
  :lines,
  :name,
  :schedules,
  :stations,
  :statistics,
  :totalLines,
  :totalStations,
  keyword_init: true
)

# Request payload for Network#load.
#
# @!attribute [rw] history
#   @return [Hash, nil]
#
# @!attribute [rw] lines
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] schedules
#   @return [Hash, nil]
#
# @!attribute [rw] stations
#   @return [Array, nil]
#
# @!attribute [rw] statistics
#   @return [Hash, nil]
#
# @!attribute [rw] totalLines
#   @return [Integer, nil]
#
# @!attribute [rw] totalStations
#   @return [Integer, nil]
NetworkLoadMatch = Struct.new(
  :history,
  :lines,
  :name,
  :schedules,
  :stations,
  :statistics,
  :totalLines,
  :totalStations,
  keyword_init: true
)

