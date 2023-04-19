import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager'; // import the correct Cache type

@Controller()
export class AppController {
  DummyValue = 'this is dummy data';

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('get-string-cache')
  async getSimpleString() {
    var value = await this.cacheManager.get('my-string');
    if (value) {
      return {
        data: value,
        LoadFrom: 'redis cache', // fix the typo in property name
      };
    } else {
      await this.cacheManager.set('my-string', this.DummyValue); // fix the typo in cache key name, use ttl instead of ttk
      return {
        data: this.DummyValue,
        LoadFrom: 'dummy DB', // fix the typo in property name
      };
    }
  }
}
