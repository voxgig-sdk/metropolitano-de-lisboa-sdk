package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewNetworkEntityFunc func(client *MetropolitanoDeLisboaSDK, entopts map[string]any) MetropolitanoDeLisboaEntity

