import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Redis from 'ioredis';
import { Model } from 'mongoose';
import { CreatHashDto } from './dto/hset.dto';
import { RedisAdapter } from 'socket.io-redis';
import { RedisIoAdapter } from 'src/adaptors/redis-io-hget.adapter';
import { DeleteHashDto } from './dto/delete.dto';
import { getallDto } from './dto/getall.dto';
import { getRealAllDto } from './dto/getAllReal.dto';

@Injectable()
export class CmdService {
  //-----------------------------------------getall----------------------------------------
  async getCmdlist(getrealall: getRealAllDto) {
    const { key } = getrealall;
    return await RedisIoAdapter.hGetAll(key);
  }

  async getCmdsingle(getall: getallDto) {
    const { key, feild } = getall;
    return await RedisIoAdapter.hGet(key, feild);
  }
  //-----------------------------------------postcommand----------------------------------------
  async postCmd(creathashdto: CreatHashDto) {
    const { key, value, field } = creathashdto;

    return await RedisIoAdapter.hset(key, field, value);
    console.log(await RedisIoAdapter.hset('rahul', 'name', 'rrr'));
  }
  //-----------------------------------------delete----------------------------------------
  async deletCmd(deleteDto: DeleteHashDto) {
    const { key, field } = deleteDto;
    return await RedisIoAdapter.hdel(key, field);
  }
  //-----------------------------------------update ----------------------------------------
  async updateCmd(creathashdto: CreatHashDto) {
    const { key, field, value } = creathashdto;
    return await RedisIoAdapter.hset(key, field, value);
  }
}
