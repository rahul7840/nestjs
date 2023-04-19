import { Cache } from 'cache-manager';
export declare class AppController {
    private cacheManager;
    DummyValue: string;
    constructor(cacheManager: Cache);
    getSimpleString(): Promise<{
        data: unknown;
        LoadFrom: string;
    }>;
}
