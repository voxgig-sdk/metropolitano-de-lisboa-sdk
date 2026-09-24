

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"history":{"a":true,"h":"History","n":"history","r":false,"t":"`$OBJECT`","key$":"history","index$":0},"lines":{"a":true,"h":"Lines","n":"lines","r":false,"t":"`$ARRAY`","key$":"lines","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":2},"schedules":{"a":true,"h":"Schedules","n":"schedules","r":false,"t":"`$OBJECT`","key$":"schedules","index$":3},"stations":{"a":true,"h":"Stations","n":"stations","r":false,"t":"`$ARRAY`","key$":"stations","index$":4},"statistics":{"a":true,"h":"Statistics","n":"statistics","r":false,"t":"`$OBJECT`","key$":"statistics","index$":5},"totalLines":{"a":true,"h":"Total Lines","n":"totalLines","r":false,"t":"`$INTEGER`","key$":"totalLines","index$":6},"totalStations":{"a":true,"h":"Total Stations","n":"totalStations","r":false,"t":"`$INTEGER`","key$":"totalStations","index$":7}},"name":"network","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /network","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":false,"k":"query","n":"historical","or":"historical","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":"stations,lines","k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"line","or":"line","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/network","q":{"exist":["historical","include","line"]},"r":{},"s":[{"lit":"network"}],"t":{"req":"`reqdata`","res":"`body.network`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"network","name__orig":"network","Name":"Network","name_":"network","name-":"network","NAME":"NETWORK","index$":0}, {"active":true,"entity":"network","key$":"BasicNetworkFlow","kind":"basic","name":"BasicNetworkFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"network_ref01","srcdatavar":"network_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-network_ref01"}}],"index$":0}]}, 'Network', {"GET /network":{"protocol":"http","operationId":"getNetworkInfo","responses":{"200":{"description":"Successful response with network information","content":{"application/json":{"schema":{"type":"object","properties":{"network":{"key$":"network","properties":{"history":{"properties":{"inaugurated":{"example":"1959-12-29","format":"date","type":"string"},"milestones":{"items":{"properties":{"date":{"format":"date","type":"string"},"description":{"type":"string"},"event":{"type":"string"}},"type":"object"},"type":"array"}},"type":"object","key$":"history"},"lines":{"items":{"properties":{"color":{"example":"#0066CC","type":"string"},"id":{"example":"blue","type":"string"},"inaugurated":{"example":"1959-12-29","format":"date","type":"string"},"name":{"example":"Linha Azul","type":"string"},"stations":{"items":{"type":"string"},"type":"array"}},"type":"object"},"type":"array","key$":"lines"},"name":{"example":"Metropolitano de Lisboa","type":"string","key$":"name"},"schedules":{"properties":{"weekday":{"properties":{"closing":{"example":"01:00","type":"string"},"opening":{"example":"06:30","type":"string"}},"type":"object"},"weekend":{"properties":{"closing":{"example":"01:00","type":"string"},"opening":{"example":"06:30","type":"string"}},"type":"object"}},"type":"object","key$":"schedules"},"stations":{"items":{"properties":{"accessibility":{"example":true,"type":"boolean"},"id":{"example":"alameda","type":"string"},"inaugurated":{"format":"date","type":"string"},"lines":{"items":{"type":"string"},"type":"array"},"location":{"properties":{"latitude":{"example":38.7352,"format":"double","type":"number"},"longitude":{"example":-9.1386,"format":"double","type":"number"}},"type":"object"},"name":{"example":"Alameda","type":"string"}},"type":"object"},"type":"array","key$":"stations"},"statistics":{"properties":{"annualPassengers":{"example":173000000,"type":"integer"},"dailyAveragePassengers":{"example":474000,"type":"integer"},"totalNetworkLength":{"description":"Total network length in kilometers","example":44.5,"format":"double","type":"number"}},"type":"object","key$":"statistics"},"totalLines":{"example":4,"type":"integer","key$":"totalLines"},"totalStations":{"example":56,"type":"integer","key$":"totalStations"}},"type":"object","index$":0}}}}}},"400":{"description":"Bad request - Invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Invalid parameter value"},"message":{"type":"string","example":"The specified line does not exist"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Internal server error"},"message":{"type":"string","example":"An unexpected error occurred"}}}}}}},"parameters":[{"name":"include","in":"query","description":"Comma-separated list of data to include (stations, lines, schedules, statistics, history)","required":false,"schema":{"type":"string","example":"stations,lines"},"index$":0},{"name":"line","in":"query","description":"Filter by specific metro line","required":false,"schema":{"type":"string","enum":["blue","yellow","green","red"]},"index$":1},{"name":"historical","in":"query","description":"Include historical data","required":false,"schema":{"type":"boolean","default":false},"index$":2}],"securitySource":"unspecified"}})
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
  
