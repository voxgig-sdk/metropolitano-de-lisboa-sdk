
import { Context } from './Context'


class MetropolitanoDeLisboaError extends Error {

  isMetropolitanoDeLisboaError = true

  sdk = 'MetropolitanoDeLisboa'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  MetropolitanoDeLisboaError
}

