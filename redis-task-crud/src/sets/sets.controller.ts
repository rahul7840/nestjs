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
import { SaddDto } from './dto/add-set.dto';
import { SetsService } from './sets.service';
import { GetAllDto } from './dto/getall-set.dto';
import { SremDto } from './dto/srem-set.dto';

@ApiTags('Set Api')
@Controller('sets')
export class SetsController {
  constructor(private readonly setService: SetsService) {}

  //   @Post('add')
  //   @ApiOperation({ summary: 'add using sadd' })
  //   sadd(@Body() saddDto: SaddDto) {
  //     return this.setService.sadd(saddDto);
  //   }

  @Post('add')
  @ApiOperation({ summary: 'add using sadd' })
  async sadd(@Body() saddDto: SaddDto) {
    try {
      await this.setService.sadd(saddDto);
      return { message: 'Values added to set.' };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('find-all')
  @ApiOperation({ summary: 'find' })
  smembers(@Query() zrengeDto: GetAllDto) {
    return this.setService.smembers(zrengeDto);
  }

  @Delete('remove')
  @ApiOperation({ summary: 'remove by zrem' })
  srem(@Body() sremDto: SaddDto) {
    return this.setService.srem(sremDto);
  }

  @Put('update')
  @ApiOperation({ summary: 'update' })
  upadtezadd(@Body() sremDto: SremDto) {
    return this.setService.sadd(sremDto);
  }
}
