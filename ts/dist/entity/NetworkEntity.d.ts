import { MetropolitanoDeLisboaEntityBase } from '../MetropolitanoDeLisboaEntityBase';
import type { MetropolitanoDeLisboaSDK } from '../MetropolitanoDeLisboaSDK';
import type { Control } from '../types';
import type { Network, NetworkLoadMatch } from '../MetropolitanoDeLisboaTypes';
declare class NetworkEntity extends MetropolitanoDeLisboaEntityBase<Network> {
    constructor(client: MetropolitanoDeLisboaSDK, entopts: any);
    make(this: NetworkEntity): NetworkEntity;
    load(this: any, reqmatch?: NetworkLoadMatch, ctrl?: Control): Promise<NetworkEntity>;
}
export { NetworkEntity };
