import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreatCarDto } from './dto/creat-car.dto';
import { listcardto } from './dto/car-list.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Car } from './schema/car.schema';

@ApiTags('GarageAPI')
@Controller('garage')
export class CarController {
  carModel: any;
  constructor(private readonly carService: CarService) {}

  @Get()
  getCar() {
    return this.carService.getCar();
  }
  //-------------------------------------------GetList of car details--------------------------

  @Get('carlist')
  async getCarlist(@Query() listdto: listcardto) {
    return await this.carService.getCarlist(listdto);
  }
  //-----------------------------------------------post--------------------------

  @ApiOperation({ summary: 'Insert a new vehicle  details in the list' })
  @ApiResponse({ status: 200, description: 'Api success' })
  @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
  @ApiResponse({
    status: 403,
    description: 'You are not allowed to access this resource.',
  })
  @ApiResponse({ status: 404, description: 'Country not found!' })
  @ApiResponse({ status: 500, description: 'Internal server error!' })
  @HttpCode(200)
  @Post('caradd')
  async postcar(@Body() creatcardto: CreatCarDto) {
    return this.carService.postcar(creatcardto);
  }
  //--------------------------------------------------Delete----------------------
  @ApiOperation({ summary: 'Remove a  vehicle  details in the list' })
  @ApiResponse({ status: 200, description: 'Api success' })
  @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
  @ApiResponse({
    status: 403,
    description: 'You are not allowed to access this resource.',
  })
  @ApiResponse({ status: 404, description: 'car not found!' })
  @ApiResponse({ status: 500, description: 'Internal server error!' })
  @Delete(':id')
  async removecar(@Param('id') id: string): Promise<string> {
    return this.carService.removecar(id);
  }

  //--------------------------------------------------Update----------------------

  @ApiOperation({ summary: 'Update a vehicle s details' })
  @ApiResponse({ status: 200, description: 'Api success' })
  @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
  @ApiResponse({
    status: 403,
    description: 'You are not allowed to access this resource.',
  })
  @ApiResponse({ status: 404, description: 'car not found!' })
  @ApiResponse({ status: 500, description: 'Internal server error!' })
  @HttpCode(200)
  @Put(':id')
  async updatecar(
    @Param('id') id: string,
    @Body() creatcardto: CreatCarDto,
  ): Promise<Car> {
    return this.carService.updatecar(id, creatcardto);
  }
}
