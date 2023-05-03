import { INestApplicationContext } from '@nestjs/common';
import RedisClient from 'ioredis';
import { ServerOptions } from 'socket.io';
import { createAdapter, RedisAdapter } from 'socket.io-redis';
import { CustomSocketIoAdapter } from './custom-stringset-socket-io.adapter';

export class RedisIoStrinSetAdapter extends CustomSocketIoAdapter {
  private redisAdapter: RedisAdapter;
  static RedisConnection;

  constructor(config: any, app: INestApplicationContext) {
    super(app);
    const pubClient = new RedisClient(config);
    const subClient = pubClient.duplicate();
    this.redisAdapter = createAdapter({ pubClient, subClient });

    RedisIoStrinSetAdapter.RedisConnection = pubClient;
  }

  static async set(key, value) {
    return await this.RedisConnection.set(key, value);
  }
  static async get(key) {
    return await this.RedisConnection.get(key);
  }

  static async del(key) {
    return await this.RedisConnection.del(key);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);

    server.adapter(this.redisAdapter as any);

    return server;
  }
}
