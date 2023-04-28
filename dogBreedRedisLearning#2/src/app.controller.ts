import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  CACHE_MANAGER,
  Controller,
  Get,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  cacheManager: any;
  constructor(@Inject(CACHE_MANAGER) private readonly appService: AppService) {}

  @Get('dogg')
  @CacheTTL(10)
  @CacheKey('all-dogs')
  @UseInterceptors(CacheInterceptor)
  getDogs() {
    return this.appService.getDogs();
  }

  // @Get('site')
  // @UseInterceptors(CacheInterceptor)
  // async getSite() {
  //   return await this.appService.getSite();
  // }

  // @Get('horse')
  // async getHorse() {
  //   return await this.appService.getHorse();
  // }

  // @Get('cats')
  // async getHors() {
  //   const cachedHor = await this.cacheManager.get('all-hors');
  //   if (cachedHor) {
  //     return cachedHor;
  //   }

  //   const hors = await this.getHors();
  //   await this.cacheManager.set('all-hors', hors, { ttl: 10 });
  //   return hors;
  // }
}
