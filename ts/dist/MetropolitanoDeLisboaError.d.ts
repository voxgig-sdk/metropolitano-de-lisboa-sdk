import { Context } from './Context';
declare class MetropolitanoDeLisboaError extends Error {
    isMetropolitanoDeLisboaError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { MetropolitanoDeLisboaError };
