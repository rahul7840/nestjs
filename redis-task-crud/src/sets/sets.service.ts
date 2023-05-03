import { Injectable } from '@nestjs/common';
import { RedisIoSetAdapter } from './adaptors/redis-io-get.adapter';
import { SaddDto } from './dto/add-set.dto';
import { GetAllDto } from './dto/getall-set.dto';

@Injectable()
export class SetsService {
  //-----------------------------------------add----------------------------------------
  //   async sadd(saddDto: SaddDto) {
  //     const { key, values } = saddDto;
  //     return await RedisIoSetAdapter.sadd(key, values);
  //   }
  async sadd(saddDto: SaddDto) {
    const { key, values } = saddDto;
    const result = await RedisIoSetAdapter.sadd(key, values);
    if (result === -1) {
      throw new Error(`Error adding values to set.`);
    }
    return result;
  }
  //-----------------------------------------delete--------------------------------------
  async srem(sremDto: SaddDto) {
    const { key, values } = sremDto;
    return await RedisIoSetAdapter.srem(key, values);
  }
  //-----------------------------------------find----------------------------------------
  async smembers(zmemberDto: GetAllDto) {
    const { key } = zmemberDto;
    return await RedisIoSetAdapter.smembers(key);
  }
  //-----------------------------------------find----------------------------------------
  async upadtezadd(saddDto: SaddDto) {
    const { key, values } = saddDto;
    return await RedisIoSetAdapter.sadd(key, values);
  }
}
