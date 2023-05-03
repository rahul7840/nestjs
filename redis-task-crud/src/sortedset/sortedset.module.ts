import { Module } from '@nestjs/common';
import { SortedsetService } from './sortedset.service';
import { SortedsetController } from './sortedset.controller';

@Module({
  providers: [SortedsetService],
  controllers: [SortedsetController]
})
export class SortedsetModule {}
