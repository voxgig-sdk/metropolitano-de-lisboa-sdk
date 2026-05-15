# MetropolitanoDeLisboa SDK utility: make_context

from core.context import MetropolitanoDeLisboaContext


def make_context_util(ctxmap, basectx):
    return MetropolitanoDeLisboaContext(ctxmap, basectx)
