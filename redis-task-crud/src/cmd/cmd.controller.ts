import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CmdService } from './cmd.service';
import { getallDto } from './dto/getall.dto';
import { CreatHashDto } from './dto/hset.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteHashDto } from './dto/delete.dto';
import { getRealAllDto } from './dto/getAllReal.dto';

@ApiTags('Hesh Api')
@Controller()
export class CmdController {
  constructor(private readonly cmdService: CmdService) {}

  @Get('list')
  @ApiOperation({ summary: 'get all hesh command' })
  async getCmdlist(@Query() getrealall: getRealAllDto) {
    try {
    } catch (e) {
      return e.mes;
    }
    return this.cmdService.getCmdlist(getrealall);
  }

  @Get('single')
  @ApiOperation({ summary: 'get single hesh command' })
  getCmdSingle(@Query() getall: getallDto) {
    return this.cmdService.getCmdsingle(getall);
  }

  @Post()
  @ApiOperation({ summary: 'add hesh command' })
  async postCmd(@Body() creathashdto: CreatHashDto) {
    try {
      await this.cmdService.postCmd(creathashdto);
      return { message: 'Succesfully ADDED' };
    } catch (e) {
      return e.message;
    }
  }

  @Delete()
  @ApiOperation({ summary: 'get all hesh command' })
  deletCmd(@Body() deletedto: DeleteHashDto) {
    return this.cmdService.deletCmd(deletedto);
  }
  @Put()
  @ApiOperation({ summary: 'update' })
  updateCmd(@Body() creathashdto: CreatHashDto) {
    return this.cmdService.updateCmd(creathashdto);
  }
}
