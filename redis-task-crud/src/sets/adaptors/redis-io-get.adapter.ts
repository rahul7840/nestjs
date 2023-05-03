import { INestApplicationContext } from '@nestjs/common';
import RedisClient from 'ioredis';
import { ServerOptions } from 'socket.io';
import { createAdapter, RedisAdapter } from 'socket.io-redis';
import { CustomSocketIoAdapter } from './custom-set-socket-io.adapter';

export class RedisIoSetAdapter extends CustomSocketIoAdapter {
  private redisAdapter: RedisAdapter;
  static RedisConnection;

  constructor(config: any, app: INestApplicationContext) {
    super(app);
    const pubClient = new RedisClient(config);
    const subClient = pubClient.duplicate();
    this.redisAdapter = createAdapter({ pubClient, subClient });

    RedisIoSetAdapter.RedisConnection = pubClient;
  }

  static async sadd(key, value) {
    return await this.RedisConnection.sadd(key, value);
  }
  static async smembers(key) {
    return await this.RedisConnection.smembers(key);
  }

  static async srem(key, value) {
    return await this.RedisConnection.srem(key, value);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);

    server.adapter(this.redisAdapter as any);

    return server;
  }
}
