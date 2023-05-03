import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StringService } from './string.service';
import { StringSetDto } from './dto/stringset-dto';
import { StringGetFindDto } from './dto/stringGet-dto';

@ApiTags('Stringset Api')
@Controller('string')
export class StringController {
  constructor(private readonly stringService: StringService) {}

  @Post('add')
  @ApiOperation({ summary: 'add using sadd' })
  async set(@Body() stringSetDto: StringSetDto) {
    try {
      await this.stringService.set(stringSetDto);
      return { message: 'Values added to set.' };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('find-all')
  @ApiOperation({ summary: 'Find by Key' })
  async get(@Query() SGetFindDto: StringGetFindDto) {
    return await this.stringService.get(SGetFindDto);
  }

  @Delete('remove')
  @ApiOperation({ summary: 'remove by zrem' })
  async del(@Body() SGetFindDto: StringGetFindDto) {
    try {
      await this.stringService.del(SGetFindDto);
      return { message: 'Deleted Successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Put('update')
  @ApiOperation({ summary: 'update' })
  async updateCmd(@Body() stringSetDto: StringSetDto) {
    try {
      await this.stringService.set(stringSetDto);
      return { message: 'Updated Successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }
}
