// Typed models for the MetropolitanoDeLisboa SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Network {
  history?: Record<string, any>
  lines?: any[]
  name?: string
  schedules?: Record<string, any>
  stations?: any[]
  statistics?: Record<string, any>
  totalLines?: number
  totalStations?: number
}

export interface NetworkLoadMatch {
  history?: Record<string, any>
  lines?: any[]
  name?: string
  schedules?: Record<string, any>
  stations?: any[]
  statistics?: Record<string, any>
  totalLines?: number
  totalStations?: number
}

