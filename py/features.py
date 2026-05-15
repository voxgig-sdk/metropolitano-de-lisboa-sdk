# MetropolitanoDeLisboa SDK feature factory

from feature.base_feature import MetropolitanoDeLisboaBaseFeature
from feature.test_feature import MetropolitanoDeLisboaTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MetropolitanoDeLisboaBaseFeature(),
        "test": lambda: MetropolitanoDeLisboaTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
