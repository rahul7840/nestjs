import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post,
    Put,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
  import {
    ApiBearerAuth,
    ApiConsumes,
    ApiHeader,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  import { diskStorage } from 'multer';
  import { GetUser } from 'src/dacorator/get-user.dacorator';
  import { BearierValidation } from 'src/dacorator/validateBearear.decorater';
  import { Role } from 'src/enum/roles.enum';
  import { Roles } from 'src/guards/role.decorator';
  import { RolesGuard } from 'src/guards/role.guard';
  import { User } from 'src/schemas/user/user.schema';
  import { ChangeStatusDto } from '../dto/change-status.dto';
  import { AppService } from './service';
  import * as CONSTANTS from 'src/helper/constant';
  import { GetTeanantId } from 'src/dacorator/get-tenant.decorator';
  import { CoreListDto } from 'src/helper/core-dto';
  import { createGroup, creatgrpDTO, CreatHolidayDto, HolidayDto, ListHolidayDto, UpdateHolidayDto } from './dto';
  import { FileFieldsInterceptor } from '@nestjs/platform-express';
  import {
    csvFileFilter,
    editFileName,
    SoundFileFilter,
  } from 'src/other/file-validator';
  import { ImportCSVDto } from '../dto/import-csv.dto';
  import { csvFileDto } from 'src/user/dto/csv-file.dto';
  import { BaseController } from 'src/helper/base.controller';
  import { ExceptionIdentifier } from 'src/utility/exception-identifier.utility';
  
  const ModuleName = CONSTANTS.MODULES.HOLIDAY;
  const Route = CONSTANTS.ROUTE.HOLIDAY;
  
  @ApiTags(`Setting-${CONSTANTS.ROUTE.HOLIDAY}`)
  @ApiHeader({
    name: 'X-TENANT-ID',
    description: 'tenant id',
    example: 'Bcc',
  })
  @ApiBearerAuth()
  @UseGuards(BearierValidation, RolesGuard)
  @Controller(`${CONSTANTS.ROUTE.SEETING}/${CONSTANTS.ROUTE.HOLIDAY}`)
  export class AppController extends BaseController {
    constructor(private readonly appService: AppService) {
      super(appService);
    }
  
    @Post('report/import')
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: 200, description: 'Api success' })
    @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    @ApiResponse({
      status: 403,
      description: 'You are not allowed to access this resource.',
    })
    @ApiResponse({ status: 404, description: 'User not found!' })
    @ApiResponse({ status: 500, description: 'Internal server error!' })
    @UseInterceptors(
      FileFieldsInterceptor([{ name: 'file', maxCount: 1 }], {
        storage: diskStorage({
          destination: './assets/tags',
          filename: editFileName,
        }),
        fileFilter: csvFileFilter,
      }),
    )
    @HttpCode(200)
    async import(
      @Body() dto: ImportCSVDto,
      @UploadedFiles() files: csvFileDto,
      @Req() req,
      @GetUser() user: User,
      @GetTeanantId() tenantId: string,
    ) {
      if (req.fileValidationError) {
        throw new BadRequestException(`${req.fileValidationError}`);
      }
      if (!typeof files.file.length) {
        throw new NotFoundException(`file is not available&&&file`);
      }
      // const userId = user.userId;
      const file = files.file;
      try {
        return await this.appService.import(file, user, tenantId);
      } catch (error) {
        await ExceptionIdentifier(error);
      }
    }
  
  
  
   //--------------------------------------// GROUP //---------------------
  
      @Get('group/list')
      @Roles(
      Role.SUPER_ADMIN,
      Role.ADMIN,
      Role.RESELLER,
      //Role.SUPERWISER,
      Role.TEAMLEAD,
    )
    @ApiOperation({ summary: `//--- List Group---//` })
    @ApiResponse({ status: 200, description: 'Api success' })
    @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    @ApiResponse({
      status: 403,
      description: 'You are not allowed to access this resource.',
    })
    @ApiResponse({ status: 404, description: 'not found!' })
    @ApiResponse({ status: 500, description: 'Internal server error!' })
    async listGroup(
      @GetUser() user: User,
      @Query() paginationOpt: ListHolidayDto,
    ) {
      return await this.appService.listGroup(paginationOpt);
    }
  
  
    @Post('group')
    @ApiOperation({ summary: `//---new add group---//` })
    @ApiResponse({ status: 200, description: 'Api success' })
    @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    @ApiResponse({
      status: 403,
      description: 'You are not allowed to access this resource.',
    })
    @ApiResponse({ status: 404, description: 'not found!' })
    @ApiResponse({ status: 500, description: 'Internal server error!' })
    async PostAdd(@Body() DTO : creatgrpDTO){
        return this.appService.createGroup(DTO)
    }
  
    @Delete('group/:id') 
    @ApiOperation({ summary: '//--- delete group---//' })
    @ApiResponse({ status: 200, description: 'Api success' })
    @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    @ApiResponse({
      status: 403,
      description: 'You are not allowed to access this resource.',
    })
    @ApiResponse({ status: 404, description: 'not found!' })
    async removeDelete(@Param('id') id: string) { 
      return this.appService.deleteGroup(id);
    }
  
  
    @Put('group/:id')
    @ApiOperation({ summary: `//---update group---//` })
    @ApiResponse({ status: 200, description: 'Api success' })
    @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    @ApiResponse({
      status: 403,
      description: 'You are not allowed to access this resource.',
    })
    @ApiResponse({ status: 404, description: 'not found!' })
    async updateeGRP(@Param('id') id: string, @Body() DTO : creatgrpDTO){
       return await this.appService.updateGroup(id,DTO)
    }
  
     //--------------------------------------// HOLIDAY //---------------------
     
    @Get()
    @Roles(
      Role.SUPER_ADMIN,
      Role.ADMIN,
      Role.RESELLER,
      //Role.SUPERWISER,
      Role.TEAMLEAD,
    )
    @ApiOperation({ summary: `//---List Holiday---//` })
    @ApiResponse({ status: 200, description: 'Api success' })
    @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    @ApiResponse({
      status: 403,
      description: 'You are not allowed to access this resource.',
    })
    @ApiResponse({ status: 404, description: 'not found!' })
    @ApiResponse({ status: 500, description: 'Internal server error!' })
    async list(@GetUser() user: User, @Query() paginationOpt: ListHolidayDto) {
      return await this.appService.list(user, paginationOpt);
    }
  
  
    @Post()
    @ApiBearerAuth()
    @UseGuards(BearierValidation, RolesGuard)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: `//---new add Holiday---//` })
    @ApiResponse({ status: 200, description: 'Api success' })
    @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    @ApiResponse({
      status: 403,
      description: 'You are not allowed to access this resource.',
    })
    @UseInterceptors(
      FileFieldsInterceptor([{ name: 'file', maxCount: 1 }], {
        storage: diskStorage({
          destination: './assets/sounds',
          filename: editFileName,
        }),
        fileFilter: SoundFileFilter,
      }),
    )
    @ApiResponse({ status: 404, description: 'User not found!' })
    @ApiResponse({ status: 500, description: 'Internal server error!' })
    @HttpCode(200)
    async createHolidayy(
      @Body() dto: HolidayDto,
      @Req() req,
      @UploadedFiles() files: csvFileDto,
      @GetUser() user: User,
      @GetTeanantId() tenantId: string,
    ) {
      if (req.fileValidationError) {
        throw new BadRequestException(`${req.fileValidationError}`);
      }
  
      return await this.appService.add(dto,files,user,tenantId);
    }
  
  
    @Put(`:id`)
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
      FileFieldsInterceptor([{ name: 'file', maxCount: 1 }], {
        storage: diskStorage({
          destination: './assets/sounds',
          filename: editFileName,
        }),
        fileFilter: SoundFileFilter,
      }),
    )
    @ApiOperation({ summary: `//----Update Holiday---//` })
    @ApiResponse({ status: 200, description: 'Api success' })
    @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    @ApiResponse({
      status: 403,
      description: 'You are not allowed to access this resource.',
    })
    @ApiResponse({ status: 404, description: 'User not found!' })
    @ApiResponse({ status: 500, description: 'Internal server error!' })
    async updateHolidayy(
      @Body() dto: UpdateHolidayDto,
      @Param('id') id: string,
      @Req() req,
      @UploadedFiles() files: csvFileDto,
      @GetUser() user: User,
      @GetTeanantId() tenantId: string,
    ) {
      if (req.fileValidationError) {
        throw new BadRequestException(`${req.fileValidationError}`);
      }
  
      return await this.appService.update(id, dto, files,user,tenantId);
    }
  
    @Delete(`:id`)
    @ApiBearerAuth()
    @ApiOperation({ summary: `//--- Delete Holiday---//` })
    @ApiResponse({ status: 200, description: 'Api success' })
    @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    @ApiResponse({
      status: 403,
      description: 'You are not allowed to access this resource.',
    })
    @ApiResponse({ status: 404, description: 'User not found!' })
    @ApiResponse({ status: 500, description: 'Internal server error!' })
    async deleteHoliday(
      @Param('id') id: string,
      @GetUser() user: User,
      @GetTeanantId() tenantId: string,
    ) {
      return await this.appService.delete(id,user,tenantId);
    }
  
     // @Get()
    // @Roles(
    //   Role.SUPER_ADMIN,
    //   Role.ADMIN,
    //   Role.RESELLER,
    //   //Role.SUPERWISER,
    //   Role.TEAMLEAD,
    // )
    // @ApiOperation({ summary: `List of ${ModuleName}` })
    // @ApiResponse({ status: 200, description: 'Api success' })
    // @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    // @ApiResponse({
    //   status: 403,
    //   description: 'You are not allowed to access this resource.',
    // })
    // @ApiResponse({ status: 404, description: 'not found!' })
    // @ApiResponse({ status: 500, description: 'Internal server error!' })
    // async list(@GetUser() user: User, @Query() paginationOpt: ListHolidayDto) {
    //   return await this.appService.list(user, paginationOpt);
    // }
  
    // @Get(`:id`)
    // @Roles(
    //   Role.SUPER_ADMIN,
    //   Role.ADMIN,
    //   Role.RESELLER,
    //   //Role.SUPERWISER,
    //   Role.TEAMLEAD,
    // )
    // @ApiOperation({ summary: `${ModuleName} list` })
    // @ApiResponse({ status: 200, description: 'Api success' })
    // @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    // @ApiResponse({
    //   status: 403,
    //   description: 'You are not allowed to access this resource.',
    // })
    // @ApiResponse({ status: 404, description: 'User not found!' })
    // @ApiResponse({ status: 500, description: 'Internal server error!' })
    // async get(@Param('id') id: string, @GetUser() user: User) {
    //   return await this.appService.listData(id, user);
    // }
  
    // @Get(`group/list`)
    // @Roles(
    //   Role.SUPER_ADMIN,
    //   Role.ADMIN,
    //   Role.RESELLER,
    //   //Role.SUPERWISER,
    //   Role.TEAMLEAD,
    // )
    // @ApiOperation({ summary: `//--- List Group---//` })
    // @ApiResponse({ status: 200, description: 'Api success' })
    // @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    // @ApiResponse({
    //   status: 403,
    //   description: 'You are not allowed to access this resource.',
    // })
    // @ApiResponse({ status: 404, description: 'User not found!' })
    // @ApiResponse({ status: 500, description: 'Internal server error!' })
    // async groupList(@GetUser() user: User) {
    //   return await this.appService.groupList();
    // }
    
  
    // @Post()
    // @ApiBearerAuth()
    // @UseGuards(BearierValidation, RolesGuard)
    // @Roles(
    //   Role.SUPER_ADMIN,
    //   Role.ADMIN,
    //   Role.RESELLER,
    //   //Role.SUPERWISER,
    //   Role.TEAMLEAD,
    // )
    // @ApiConsumes('multipart/form-data')
    // @ApiOperation({ summary: `Create new ${ModuleName}` })
    // @ApiResponse({ status: 200, description: 'Api success' })
    // @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    // @ApiResponse({
    //   status: 403,
    //   description: 'You are not allowed to access this resource.',
    // })
    // @UseInterceptors(
    //   FileFieldsInterceptor([{ name: 'file', maxCount: 1 }], {
    //     storage: diskStorage({
    //       destination: './assets/sounds',
    //       filename: editFileName,
    //     }),
    //     fileFilter: SoundFileFilter,
    //   }),
    // )
    // @ApiResponse({ status: 404, description: 'User not found!' })
    // @ApiResponse({ status: 500, description: 'Internal server error!' })
    // @HttpCode(200)
    // async create(
    //   @Body() dto: HolidayDto,
    //   @GetUser() user: User,
    //   @GetTeanantId() tenantId: string,
    //   @Req() req,
    //   @UploadedFiles() files: csvFileDto,
    // ) {
    //   if (req.fileValidationError) {
    //     throw new BadRequestException(`${req.fileValidationError}`);
    //   }
  
    //   return await this.appService.add(dto, user, tenantId, files);
    // }
  
    // @Put(`:id`)
    // @ApiBearerAuth()
    // @UseGuards(BearierValidation, RolesGuard)
    // @Roles(
    //   Role.SUPER_ADMIN,
    //   Role.ADMIN,
    //   Role.RESELLER,
    //   //Role.SUPERWISER,
    //   Role.TEAMLEAD,
    // )
    // @ApiConsumes('multipart/form-data')
    // @UseInterceptors(
    //   FileFieldsInterceptor([{ name: 'file', maxCount: 1 }], {
    //     storage: diskStorage({
    //       destination: './assets/sounds',
    //       filename: editFileName,
    //     }),
    //     fileFilter: SoundFileFilter,
    //   }),
    // )
    // @ApiOperation({ summary: `Update ${ModuleName} provider` })
    // @ApiResponse({ status: 200, description: 'Api success' })
    // @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    // @ApiResponse({
    //   status: 403,
    //   description: 'You are not allowed to access this resource.',
    // })
    // @ApiResponse({ status: 404, description: 'User not found!' })
    // @ApiResponse({ status: 500, description: 'Internal server error!' })
    // async update(
    //   @Body() dto: HolidayDto,
    //   @Param('id') id: string,
    //   @GetUser() user: User,
    //   @GetTeanantId() tenantId: string,
    //   @Req() req,
    //   @UploadedFiles() files: csvFileDto,
    // ) {
    //   if (req.fileValidationError) {
    //     throw new BadRequestException(`${req.fileValidationError}`);
    //   }
  
    //   return await this.appService.update(id, dto, user, tenantId, files);
    // }
  
    // @Patch(`:id`)
    // @ApiBearerAuth()
    // @UseGuards(BearierValidation, RolesGuard)
    // @Roles(
    //   Role.SUPER_ADMIN,
    //   Role.ADMIN,
    //   Role.RESELLER,
    //   //Role.SUPERWISER,
    //   Role.TEAMLEAD,
    // )
    // @ApiOperation({ summary: `change status ${ModuleName}` })
    // @ApiResponse({ status: 200, description: 'Api success' })
    // @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    // @ApiResponse({
    //   status: 403,
    //   description: 'You are not allowed to access this resource.',
    // })
    // @ApiResponse({ status: 404, description: 'User not found!' })
    // @ApiResponse({ status: 500, description: 'Internal server error!' })
    // async changeStatus(
    //   @Body() dto: ChangeStatusDto,
    //   @Param('id') id: string,
    //   @GetUser() user: User,
    //   @GetTeanantId() tenantId: string,
    // ) {
    //   return await this.appService.changeStatus(id, dto, user, tenantId);
    // }
  
    // @Delete(`:id`)
    // @ApiBearerAuth()
    // @UseGuards(BearierValidation, RolesGuard)
    // @Roles(
    //   Role.SUPER_ADMIN,
    //   Role.ADMIN,
    //   Role.RESELLER,
    //   //Role.SUPERWISER,
    //   Role.TEAMLEAD,
    // )
    // @ApiOperation({ summary: `Delete ${ModuleName}` })
    // @ApiResponse({ status: 200, description: 'Api success' })
    // @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    // @ApiResponse({
    //   status: 403,
    //   description: 'You are not allowed to access this resource.',
    // })
    // @ApiResponse({ status: 404, description: 'User not found!' })
    // @ApiResponse({ status: 500, description: 'Internal server error!' })
    // async deleteUser(
    //   @Param('id') id: string,
    //   @GetUser() user: User,
    //   @GetTeanantId() tenantId: string,
    // ) {
    //   return await this.appService.delete(id, user, tenantId);
    // }
  
    // @Post('import')                 -> allready commentedd
    // @ApiConsumes('multipart/form-data')
    // @ApiResponse({ status: 200, description: 'Api success' })
    // @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    // @ApiResponse({
    //   status: 403,
    //   description: 'You are not allowed to access this resource.',
    // })
    // @ApiResponse({ status: 404, description: 'User not found!' })
    // @ApiResponse({ status: 500, description: 'Internal server error!' })
    // @UseInterceptors(
    //   FileFieldsInterceptor([{ name: 'file', maxCount: 1 }], {
    //     storage: diskStorage({
    //       destination: './assets/otherfiles',
    //       filename: editFileName,
    //     }),
    //     fileFilter: csvFileFilter,
    //   }),
    // )
    // @HttpCode(200)
    // async import(
    //   @Body() dto: ImportCSVDto,
    //   @UploadedFiles() files: csvFileDto,
    //   @Req() req,
    //   @GetUser() user: User,
    //   @GetTeanantId() tenantId: string,
    // ) {
    //   if (req.fileValidationError) {
    //     throw new BadRequestException(`${req.fileValidationError}`);
    //   }
    //   if (typeof files.file[0] == 'undefined') {
    //     throw new NotFoundException(`file is not available&&&file`);
    //   }
    //   // const userId = user.userId;
    //   const file = files.file;
  
    //   return await this.appService.import(file, user, tenantId);
    // }
  
    // @Post('group')
    // @ApiBearerAuth()
    // @UseGuards(BearierValidation, RolesGuard)
    // @Roles(Role.SUPER_ADMIN, Role.RESELLER, Role.ADMIN, Role.TEAMLEAD, Role.OTHER)
    // @ApiOperation({ summary: `Create new ${ModuleName} Group` })
    // @ApiResponse({ status: 200, description: 'Api success' })
    // @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    // @ApiResponse({
    //   status: 403,
    //   description: 'You are not allowed to access this resource.',
    // })
    // @ApiResponse({ status: 404, description: 'User not found!' })
    // @ApiResponse({ status: 500, description: 'Internal server error!' })
    // @HttpCode(200)
    // async createGroup(
    //   @Body() dto: createGroup,
    //   @GetUser() user: User,
    //   @GetTeanantId() tenantId: string,
    // ) {
    //   return await this.appService.createGroup(dto);
    // }
  
    // @Patch(`group/:id`)
    // @ApiBearerAuth()
    // @UseGuards(BearierValidation, RolesGuard)
    // @Roles(
    //   Role.SUPER_ADMIN,
    //   Role.ADMIN,
    //   Role.RESELLER,
    //   //Role.SUPERWISER,
    //   Role.TEAMLEAD,
    // )
    // @ApiOperation({ summary: `change status ${ModuleName}` })
    // @ApiResponse({ status: 200, description: 'Api success' })
    // @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    // @ApiResponse({
    //   status: 403,
    //   description: 'You are not allowed to access this resource.',
    // })
    // @ApiResponse({ status: 404, description: 'User not found!' })
    // @ApiResponse({ status: 500, description: 'Internal server error!' })
    // async updateGroup(
    //   @Body() dto: createGroup,
    //   @Param('id') id: string,
    //   @GetUser() user: User,
    //   @GetTeanantId() tenantId: string,
    // ) {
    //   return await this.appService.updateGroup(id, dto, user, tenantId);
    // }
  
    // @Delete(`group/:id`)
    // @ApiBearerAuth()
    // @UseGuards(BearierValidation, RolesGuard)
    // @Roles(
    //   Role.SUPER_ADMIN,
    //   Role.ADMIN,
    //   Role.RESELLER,
    //   //Role.SUPERWISER,
    //   Role.TEAMLEAD,
    // )
    // @ApiOperation({ summary: `Delete ${ModuleName}` })
    // @ApiResponse({ status: 200, description: 'Api success' })
    // @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    // @ApiResponse({
    //   status: 403,
    //   description: 'You are not allowed to access this resource.',
    // })
    // @ApiResponse({ status: 404, description: 'User not found!' })
    // @ApiResponse({ status: 500, description: 'Internal server error!' })
    // async deleteGroup(
    //   @Param('id') id: string,
    //   @GetUser() user: User,
    //   @GetTeanantId() tenantId: string,
    // ) {
    //   return await this.appService.deleteGroup(id, user, tenantId);
    // }
  
      // @Get('Group/List')
    // @ApiOperation({ summary: `//--- pagination group---//` })
    // @ApiResponse({ status: 200, description: 'Api success' })
    // @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    // @ApiResponse({
    //   status: 403,
    //   description: 'You are not allowed to access this resource.',
    // })
    // @ApiResponse({ status: 404, description: 'not found!' })
    // @ApiResponse({ status: 500, description: 'Internal server error!' })
    // async getCarlist(@Query() listdto: CoreListDto) {
    //   return await this.appService.getGRPlist(listdto);
    // }
  
    //--------------------------------------// HOLIDAY //---------------------
  
    // @Get("holiday/list")
    // @ApiOperation({ summary: `//---List holiday---//` })
    // @ApiResponse({ status: 200, description: 'Api success' })
    // @ApiResponse({ status: 422, description: 'Bad Request or API error message' })
    // @ApiResponse({
    //   status: 403,
    //   description: 'You are not allowed to access this resource.',
    // })
    // @ApiResponse({ status: 404, description: 'User not found!' })
    // @ApiResponse({ status: 500, description: 'Internal server error!' })
    // async getHolidayList(@Query() listdto: CoreListDto) {
    //   return await this.appService.HolidayList(listdto);
    // }
  }
  