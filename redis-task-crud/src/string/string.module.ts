import { Module } from '@nestjs/common';
import { StringService } from './string.service';
import { StringController } from './string.controller';

@Module({
  providers: [StringService],
  controllers: [StringController]
})
export class StringModule {}
