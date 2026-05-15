# MetropolitanoDeLisboa SDK utility: make_context
require_relative '../core/context'
module MetropolitanoDeLisboaUtilities
  MakeContext = ->(ctxmap, basectx) {
    MetropolitanoDeLisboaContext.new(ctxmap, basectx)
  }
end
