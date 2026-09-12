import { NetworkEntity } from './entity/NetworkEntity';
export type * from './MetropolitanoDeLisboaTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MetropolitanoDeLisboaEntityBase } from './MetropolitanoDeLisboaEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MetropolitanoDeLisboaSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Network(entopts?: Record<string, any>): NetworkEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MetropolitanoDeLisboaSDK;
    tester(testopts?: any, sdkopts?: any): MetropolitanoDeLisboaSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MetropolitanoDeLisboaSDK;
export { stdutil, config, BaseFeature, MetropolitanoDeLisboaEntityBase, MetropolitanoDeLisboaSDK, SDK, };
