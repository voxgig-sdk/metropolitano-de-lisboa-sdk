# ProjectName SDK exists test

import pytest
from metropolitanodelisboa_sdk import MetropolitanoDeLisboaSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MetropolitanoDeLisboaSDK.test(None, None)
        assert testsdk is not None
