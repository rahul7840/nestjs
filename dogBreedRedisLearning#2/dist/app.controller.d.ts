import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    cacheManager: any;
    constructor(appService: AppService);
    getDogs(): Promise<unknown>;
}
