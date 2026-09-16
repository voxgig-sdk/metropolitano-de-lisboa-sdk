# MetropolitanoDeLisboa SDK feature factory

from metropolitanodelisboa_sdk.feature.base_feature import MetropolitanoDeLisboaBaseFeature
from metropolitanodelisboa_sdk.feature.ratelimit_feature import MetropolitanoDeLisboaRatelimitFeature
from metropolitanodelisboa_sdk.feature.retry_feature import MetropolitanoDeLisboaRetryFeature
from metropolitanodelisboa_sdk.feature.test_feature import MetropolitanoDeLisboaTestFeature
from metropolitanodelisboa_sdk.feature.timeout_feature import MetropolitanoDeLisboaTimeoutFeature


_FEATURES = {
    "base": lambda: MetropolitanoDeLisboaBaseFeature(),
    "ratelimit": lambda: MetropolitanoDeLisboaRatelimitFeature(),
    "retry": lambda: MetropolitanoDeLisboaRetryFeature(),
    "test": lambda: MetropolitanoDeLisboaTestFeature(),
    "timeout": lambda: MetropolitanoDeLisboaTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
