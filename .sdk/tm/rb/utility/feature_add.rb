# MetropolitanoDeLisboa SDK utility: feature_add
module MetropolitanoDeLisboaUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
