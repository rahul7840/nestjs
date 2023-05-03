import { INestApplicationContext } from '@nestjs/common';
import RedisClient from 'ioredis';
import { ServerOptions } from 'socket.io';
import { createAdapter, RedisAdapter } from 'socket.io-redis';
import { CustomSocketIoAdapter } from './custom-sortedset-socket-io.adapter';

export class RedisIoSortedSetAdapter extends CustomSocketIoAdapter {
  private redisAdapter: RedisAdapter;
  static RedisConnection;

  constructor(config: any, app: INestApplicationContext) {
    super(app);
    const pubClient = new RedisClient(config);
    const subClient = pubClient.duplicate();
    this.redisAdapter = createAdapter({ pubClient, subClient });

    RedisIoSortedSetAdapter.RedisConnection = pubClient;
  }

  static async zadd(key, score, value) {
    console.log(key, score, value);
    return await this.RedisConnection.zadd(key, score, value);
  }
  static async zrem(key, value) {
    return await this.RedisConnection.zrem(key, value);
  }

  static async zrange(key, start, stop) {
    return await this.RedisConnection.zrange(key, start, stop);
  }

  static async zcount(key, min, max) {
    return await this.RedisConnection.zcount(key, min, max);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);

    server.adapter(this.redisAdapter as any);

    return server;
  }
}
