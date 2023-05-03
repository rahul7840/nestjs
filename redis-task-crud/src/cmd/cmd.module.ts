import { Module } from '@nestjs/common';
import { CmdService } from './cmd.service';
import { CmdController } from './cmd.controller';

@Module({
  providers: [CmdService],
  controllers: [CmdController],
})
export class CmdModule {}

// import { Module } from '@nestjs/common';
// import { CmdService } from './cmd.service';
// import { CmdController } from './cmd.controller';
// import { IORedisModule } from 'nestjs-redis';
// import { RedisIoAdapter } from 'src/adaptors/redis-io-hget.adapter';

// @Module({
//   imports: [
//     IORedisModule.forRoot({
//       host: 'localhost',
//       port: 6379,
//     }),
//   ],
//   providers: [
//     CmdService,
//     {
//       provide: 'RedisIoAdapter',
//       useFactory: (redisClient: any) => {
//         return new RedisIoAdapter(redisClient);
//       },
//       inject: [RedisIoAdapter.REDIS_CLIENT],
//     },
//   ],
//   controllers: [CmdController],
// })
// export class CmdModule {}
