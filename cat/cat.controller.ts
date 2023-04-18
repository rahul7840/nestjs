import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards
} from "@nestjs/common";
import { CatService } from "./cat.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CatAgeGuard } from "./guard/cat.guard";

@ApiTags("Cats-Api")
@Controller("cat")
export class CatController {
  constructor(private readonly catService: CatService) {}

  //Add
  @Post()
  @UseGuards(CatAgeGuard)
  @ApiResponse({ status: 200, description: "api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Rate not found!" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  async create(@Body() createCatDto: CreateCatDto) {
    return await this.catService.create(createCatDto);
  }

  @Get()
  async findAll() {
    return await this.catService.findAll();
  }
  @ApiTags("cats")
  @Get(":origin")
  findOne(@Param("origin") origin: string) {
    return this.catService.findOne(origin);
  }

  @Patch(":origin")
  update(@Param("origin") origin: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(origin, updateCatDto);
  }

  //delete route
  @Delete(":origin")
  @ApiResponse({
    status: 200,
    description: "api success",
    schema: {
      type: "object",
      properties: { status: { type: "boolean", example: true } }
    }
  })
  @ApiResponse({ status: 200, description: "api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Rate not found!" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  @HttpCode(200)
  remove(@Param("origin") origin: string) {
    return this.catService.remove(origin);
  }
}
