import { AppService } from './app.service';
import { Profile } from './shared/model/profile';
export declare class AppController {
    private readonly appService;
    cacheManager: any;
    constructor(appService: AppService);
    FakeValue: string;
    fakeModel: Profile;
    getHello(): Promise<string>;
    getSimpleString(): Promise<{
        data: any;
        LoadFrom: string;
        date?: undefined;
    } | {
        date: string;
        LoadFrom: string;
        data?: undefined;
    }>;
    getObject(): Promise<{
        date: Profile;
        LoadFrom: string;
    }>;
}
