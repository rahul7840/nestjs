import { INestApplicationContext } from '@nestjs/common';
import RedisClient from 'ioredis';
import { ServerOptions } from 'socket.io';
import { createAdapter, RedisAdapter } from 'socket.io-redis';
import { CustomSocketIoAdapter } from './custom-socket-io.adapter';

export class RedisIoAdapter extends CustomSocketIoAdapter {
  private redisAdapter: RedisAdapter;
  static RedisConnection;

  constructor(config: any, app: INestApplicationContext) {
    super(app);
    const pubClient = new RedisClient(config);
    const subClient = pubClient.duplicate();
    this.redisAdapter = createAdapter({ pubClient, subClient });

    RedisIoAdapter.RedisConnection = pubClient;
  }

  static async hGet(key, field) {
    return await this.RedisConnection.hget(key, field);
  }

  static async hset(key, field, val) {
    return await this.RedisConnection.hset(key, field, val);
  }

  static async hGetAll(key) {
    console.log(key);
    return await this.RedisConnection.hgetall(key);
  }

  static async hdel(key, field) {
    return await this.RedisConnection.hdel(key, field);
  }
  static async hgetall(key) {
    return await this.RedisConnection.hdel(key);
  }
  //   static async HSET(key, obj: Object) {
  //     return await this.RedisConnection.hset(key, CommonUtils.objectParser(obj));
  //   }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);

    server.adapter(this.redisAdapter as any);

    return server;
  }
}
