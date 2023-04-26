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
import { CityService } from './city.service';
import { CityListDto } from './dto/citrylist.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddCityDto } from './dto/addcity.dto';
import { ChangeStatusDto } from 'src/country/dto/statuschange.dto';

@ApiTags('Citys')
@Controller('city')
export class CityController {
  constructor(private readonly cityServise: CityService) {}

  @Get()
  async getallcity() {
    return await this.cityServise.getallcity();
  }
  @Get('list')
  @ApiOperation({ summary: 'get list of citys' })
  async getcitylist(@Query() cityListdto: CityListDto) {
    return await this.cityServise.getcitylist(cityListdto);
  }
  @Post('add-city')
  @ApiOperation({ summary: 'add new cityes' })
  async addcity(@Body() addcitydto: AddCityDto) {
    return await this.cityServise.addcity(addcitydto);
  }
  @Put('updatecity/:id')
  @ApiOperation({ summary: 'update cityes' })
  async updatecity(@Param('id') _id: string, @Body() body: AddCityDto) {
    return await this.cityServise.updatecity(_id, body);
  }
  @Delete('delete/:id')
  @ApiOperation({ summary: 'soft-delete cityes' })
  async deletecity(@Param('id') id: string, @Body() body: ChangeStatusDto) {
    return await this.cityServise.deletecity(id, body);
  }
}
