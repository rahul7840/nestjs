import { Injectable, Post } from '@nestjs/common';
import { StringSetDto } from './dto/stringset-dto';
import { RedisIoStrinSetAdapter } from './adaptor/redis-sortedset-io-stringset.adapter';
import { StringGetFindDto } from './dto/stringGet-dto';

@Injectable()
export class StringService {
  //-----------------------------------------post--------------------------------------
  async set(stringSetDto: StringSetDto) {
    const { key, value } = stringSetDto;
    return await RedisIoStrinSetAdapter.set(key, value);
  }
  //-----------------------------------------find----------------------------------------
  async get(SGetFindDto: StringGetFindDto) {
    const { key } = SGetFindDto;
    return await RedisIoStrinSetAdapter.get(key);
  }
  //-----------------------------------------delete----------------------------------------
  async del(SGetFindDto: StringGetFindDto) {
    const { key } = SGetFindDto;
    return await RedisIoStrinSetAdapter.del(key);
  }
}
