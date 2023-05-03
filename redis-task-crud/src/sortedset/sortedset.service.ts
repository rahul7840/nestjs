import { Injectable } from '@nestjs/common';
import { RedisIoSortedSetAdapter } from './adaptor/redis-sortedset-io-hget.adapter';
import { ZaddDto } from './dto/zadd-dto';
import { ZremDto } from './dto/zrem-dto';
import { ZrangeDto } from './dto/zrange-dto';
import { ZcountDto } from './dto/zcount-dto';

@Injectable()
export class SortedsetService {
  //-----------------------------------------add----------------------------------------
  async zddSortedSet(zaddDto: ZaddDto) {
    const { key, score, value } = zaddDto;
    return await RedisIoSortedSetAdapter.zadd(key, score, value);
  }
  //-----------------------------------------delete--------------------------------------
  async zremSortedSet(zremDto: ZremDto) {
    const { key, value } = zremDto;
    return await RedisIoSortedSetAdapter.zrem(key, value);
  }
  //-----------------------------------------find----------------------------------------
  async zrangeSortedSet(zrengeDto: ZrangeDto) {
    const { key, start, stop } = zrengeDto;
    return await RedisIoSortedSetAdapter.zrange(key, start, stop);
  }
  //-----------------------------------------zcount----------------------------------------
  async zcountSortedSet(zcountDto: ZcountDto) {
    const { key, min, max } = zcountDto;
    return await RedisIoSortedSetAdapter.zcount(key, min, max);
  }
}
