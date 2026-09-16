

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MetropolitanoDeLisboaSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('NetworkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when METROPOLITANO_DE_LISBOA_TEST_LIVE=TRUE.
  afterEach(liveDelay('METROPOLITANO_DE_LISBOA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MetropolitanoDeLisboaSDK.test()
    const ent = testsdk.Network()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.METROPOLITANO_DE_LISBOA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'network.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"history","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"lines","req":false,"type":"`$ARRAY`","index$":1},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"schedules","req":false,"type":"`$OBJECT`","index$":3},{"active":true,"name":"stations","req":false,"type":"`$ARRAY`","index$":4},{"active":true,"name":"statistics","req":false,"type":"`$OBJECT`","index$":5},{"active":true,"name":"totalLines","req":false,"type":"`$INTEGER`","index$":6},{"active":true,"name":"totalStations","req":false,"type":"`$INTEGER`","index$":7}],"name":"network","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":false,"kind":"query","name":"historical","orig":"historical","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"example":"stations,lines","kind":"query","name":"include","orig":"include","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"line","orig":"line","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /network","json":"{\"operationId\":\"getNetworkInfo\",\"parameters\":[{\"description\":\"Comma-separated list of data to include (stations, lines, schedules, statistics, history)\",\"in\":\"query\",\"name\":\"include\",\"required\":false,\"schema\":{\"example\":\"stations,lines\",\"type\":\"string\"}},{\"description\":\"Filter by specific metro line\",\"in\":\"query\",\"name\":\"line\",\"required\":false,\"schema\":{\"enum\":[\"blue\",\"yellow\",\"green\",\"red\"],\"type\":\"string\"}},{\"description\":\"Include historical data\",\"in\":\"query\",\"name\":\"historical\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"network\":{\"properties\":{\"history\":{\"properties\":{\"inaugurated\":{\"example\":\"1959-12-29\",\"format\":\"date\",\"type\":\"string\"},\"milestones\":{\"items\":{\"properties\":{\"date\":{\"format\":\"date\",\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"event\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"lines\":{\"items\":{\"properties\":{\"color\":{\"example\":\"#0066CC\",\"type\":\"string\"},\"id\":{\"example\":\"blue\",\"type\":\"string\"},\"inaugurated\":{\"example\":\"1959-12-29\",\"format\":\"date\",\"type\":\"string\"},\"name\":{\"example\":\"Linha Azul\",\"type\":\"string\"},\"stations\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"example\":\"Metropolitano de Lisboa\",\"type\":\"string\"},\"schedules\":{\"properties\":{\"weekday\":{\"properties\":{\"closing\":{\"example\":\"01:00\",\"type\":\"string\"},\"opening\":{\"example\":\"06:30\",\"type\":\"string\"}},\"type\":\"object\"},\"weekend\":{\"properties\":{\"closing\":{\"example\":\"01:00\",\"type\":\"string\"},\"opening\":{\"example\":\"06:30\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"stations\":{\"items\":{\"properties\":{\"accessibility\":{\"example\":true,\"type\":\"boolean\"},\"id\":{\"example\":\"alameda\",\"type\":\"string\"},\"inaugurated\":{\"format\":\"date\",\"type\":\"string\"},\"lines\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"location\":{\"properties\":{\"latitude\":{\"example\":38.7352,\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"example\":-9.1386,\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"name\":{\"example\":\"Alameda\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"statistics\":{\"properties\":{\"annualPassengers\":{\"example\":173000000,\"type\":\"integer\"},\"dailyAveragePassengers\":{\"example\":474000,\"type\":\"integer\"},\"totalNetworkLength\":{\"description\":\"Total network length in kilometers\",\"example\":44.5,\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"totalLines\":{\"example\":4,\"type\":\"integer\"},\"totalStations\":{\"example\":56,\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with network information\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid parameter value\",\"type\":\"string\"},\"message\":{\"example\":\"The specified line does not exist\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Internal server error\",\"type\":\"string\"},\"message\":{\"example\":\"An unexpected error occurred\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/network","segments":[{"lit":"network"}],"select":{"exist":["historical","include","line"]},"transform":{"req":"`reqdata`","res":"`body.network`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"network","name__orig":"network","Name":"Network","name_":"network","name-":"network","NAME":"NETWORK","index$":0}, {"active":true,"entity":"network","key$":"BasicNetworkFlow","kind":"basic","name":"BasicNetworkFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"network_ref01","srcdatavar":"network_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-network_ref01"}}],"index$":0}]}, 'Network')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let network_ref01_data = Object.values(setup.data.existing.network)[0] as any

    // LOAD
    const network_ref01_ent = client.Network()
    const network_ref01_match_dt0: any = {}
    const network_ref01_data_dt0 = (await network_ref01_ent.load(network_ref01_match_dt0)).data()
    assert(null != network_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/network/NetworkTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MetropolitanoDeLisboaSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['network01','network02','network03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'METROPOLITANO_DE_LISBOA_TEST_NETWORK_ENTID': idmap,
    'METROPOLITANO_DE_LISBOA_TEST_LIVE': 'FALSE',
    'METROPOLITANO_DE_LISBOA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['METROPOLITANO_DE_LISBOA_TEST_NETWORK_ENTID']

  const live = 'TRUE' === env.METROPOLITANO_DE_LISBOA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['METROPOLITANO_DE_LISBOA_TEST_NETWORK_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MetropolitanoDeLisboaSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.METROPOLITANO_DE_LISBOA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
