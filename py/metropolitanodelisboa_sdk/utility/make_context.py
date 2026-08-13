# MetropolitanoDeLisboa SDK utility: make_context

from metropolitanodelisboa_sdk.core.context import MetropolitanoDeLisboaContext


def make_context_util(ctxmap, basectx):
    return MetropolitanoDeLisboaContext(ctxmap, basectx)
