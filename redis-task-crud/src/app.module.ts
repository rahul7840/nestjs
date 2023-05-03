import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmdModule } from './cmd/cmd.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SortedsetModule } from './sortedset/sortedset.module';
import { SetsModule } from './sets/sets.module';
import { StringModule } from './string/string.module';

@Module({
  imports: [CmdModule, SortedsetModule, SetsModule, StringModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
