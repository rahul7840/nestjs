import {
  CacheInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Profile } from './shared/model/profile';

@Controller()
export class AppController {
  cacheManager: any;
  constructor(private readonly appService: AppService) {}

  FakeValue = ' this is rahul and this is facke value frm db';
  fakeModel: Profile = {
    name: 'rahul',
    email: 'xtt@gmaill.com',
  };

  //this interceptor will cash all our get routes
  @UseInterceptors(CacheInterceptor)
  @Get()
  async getHello() {
    return this.appService.getHello();
  }

  @Get('string')
  async getSimpleString() {
    let value = await this.cacheManager.get('my-string');
    if (value) {
      return { data: value, LoadFrom: 'redis cache' };
    }
    await this.cacheManager.set('my-string', this.FakeValue, 300);
    return {
      date: this.FakeValue,
      LoadFrom: 'fake database',
    };
  }

  @Get('objectcahch')
  async getObject() {
    // let  profile =await this.cacheManager.get<Profile>('my-object');
    let profile: Profile = await this.cacheManager.get('my-object');

    if (profile) {
      return {
        date: profile,
        LoadFrom: 'redis cache',
      };
    }
    // await this.cacheManager.set<Profile>('my-object', this.fakeModel, 300);
    await this.cacheManager.set('my-object', this.fakeModel, { ttl: 300 });
    return {
      date: this.fakeModel,
      LoadFrom: 'fake database',
    };
  }
}
