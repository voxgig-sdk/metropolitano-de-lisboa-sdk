# MetropolitanoDeLisboa SDK utility: make_context

from projectname_sdk.core.context import MetropolitanoDeLisboaContext


def make_context_util(ctxmap, basectx):
    return MetropolitanoDeLisboaContext(ctxmap, basectx)
