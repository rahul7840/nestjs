import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Profile } from './shared/model/profile';

@Injectable()
export class AppService {
  // FakeValue = ' this is rahul and this is facke value frm db';
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello() {
    await this.cacheManager.set('cached_item', { key: 44 }, 300);
    await this.cacheManager.del('cahedd_item');
    await this.cacheManager.reset();

    const CacheItem = await this.cacheManager.get('cached_item');
    console.log(CacheItem);
    return 'caching...';
  }

  // async getSimpleString() {
  //   let value = await this.cacheManager.get('my-string');
  //   if (value) {
  //     return { data: value, LoadFrom: 'redis cache' };
  //   }
  //   await this.cacheManager.set('my-string', this.FakeValue, 300);
  //   return {
  //     date: this.FakeValue,
  //     LoadFrom: 'fake database',
  //   };
  // }
}
