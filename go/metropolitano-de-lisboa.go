package voxgigmetropolitanodelisboasdk

import (
	"github.com/voxgig-sdk/metropolitano-de-lisboa-sdk/core"
	"github.com/voxgig-sdk/metropolitano-de-lisboa-sdk/entity"
	"github.com/voxgig-sdk/metropolitano-de-lisboa-sdk/feature"
	_ "github.com/voxgig-sdk/metropolitano-de-lisboa-sdk/utility"
)

// Type aliases preserve external API.
type MetropolitanoDeLisboaSDK = core.MetropolitanoDeLisboaSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MetropolitanoDeLisboaEntity = core.MetropolitanoDeLisboaEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MetropolitanoDeLisboaError = core.MetropolitanoDeLisboaError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewNetworkEntityFunc = func(client *core.MetropolitanoDeLisboaSDK, entopts map[string]any) core.MetropolitanoDeLisboaEntity {
		return entity.NewNetworkEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMetropolitanoDeLisboaSDK = core.NewMetropolitanoDeLisboaSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
