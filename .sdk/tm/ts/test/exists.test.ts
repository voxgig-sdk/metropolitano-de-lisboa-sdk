
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MetropolitanoDeLisboaSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MetropolitanoDeLisboaSDK.test()
    equal(testsdk instanceof MetropolitanoDeLisboaSDK, true,
      'MetropolitanoDeLisboaSDK.test() must return a client synchronously')
  })

})
