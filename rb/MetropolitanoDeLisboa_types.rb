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
# @!attribute [rw] network
#   @return [Hash, nil]
Network = Struct.new(
  :network,
  keyword_init: true
)

# Match filter for Network#load (any subset of Network fields).
#
# @!attribute [rw] network
#   @return [Hash, nil]
NetworkLoadMatch = Struct.new(
  :network,
  keyword_init: true
)

