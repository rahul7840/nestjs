import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SortedsetService } from './sortedset.service';
import { ZaddDto } from './dto/zadd-dto';
import { ZremDto } from './dto/zrem-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ZrangeDto } from './dto/zrange-dto';
import { ZcountDto } from './dto/zcount-dto';

@ApiTags('SortedSet Api')
@Controller('sortedset')
export class SortedsetController {
  constructor(private readonly sortedSetService: SortedsetService) {}

  @Post('add')
  @ApiOperation({ summary: 'add using zadd' })
  async zddSortedSet(@Body() ZaddDto: ZaddDto) {
    try {
      await this.sortedSetService.zddSortedSet(ZaddDto);
      return { message: 'Successfully ADDED' };
    } catch (error) {
      return { error: error.message };
    }
  }
  @Put('update')
  @ApiOperation({ summary: 'update' })
  async updateCmd(@Body() ZaddDto: ZaddDto) {
    try {
      await this.sortedSetService.zddSortedSet(ZaddDto);
      return { message: 'Successfully UPDATE' };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('find')
  @ApiOperation({ summary: 'find' })
  zrangeSortedSet(@Query() ZrangeDto: ZrangeDto) {
    try {
      return this.sortedSetService.zrangeSortedSet(ZrangeDto);
    } catch (erro) {
      return { error: erro.message };
    }
  }
  @Get('count')
  @ApiOperation({ summary: 'find count' })
  zcountSortedSet(@Query() ZcountDto: ZcountDto) {
    try {
      return this.sortedSetService.zcountSortedSet(ZcountDto);
    } catch (e) {
      return e.message;
    }
  }
  @Delete('remove')
  @ApiOperation({ summary: 'remove by zrem' })
  async zremSortedSet(@Body() remDto: ZremDto) {
    try {
      await this.sortedSetService.zremSortedSet(remDto);
      return { message: 'Succcesfully Remove' };
    } catch (e) {
      return e.message;
    }
  }
}
