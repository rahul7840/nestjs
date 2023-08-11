import {
    IsNotEmpty,
    IsArray,
    ValidateNested,
    isNotEmpty,
    ValidationArguments,
    IsString,
  } from 'class-validator';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  import * as CONSTANTS from 'src/helper/constant';
  import { errorMessage } from 'src/config/common.config';
  import { CoreDto, CoreListDto } from 'src/helper/core-dto';
  import { IsValidDate } from 'src/dacorator/is-valid-date.decorator';
  
  // export class HolidayDto extends CoreDto {
  export class HolidayDto {
    @ApiPropertyOptional({
      type: 'string',
      format: 'binary',
      description: "Audio file url (Allow Only 'audio')",
      example: 'xyz.mp3',
    })
    file: string;
  
    @IsNotEmpty()
    @ApiProperty({
      description: 'name',
      example: `Name`,
    })
    name: string;
  
    @IsValidDate('', {
      message: (args: ValidationArguments) => {
        if (typeof args.value == 'undefined' || args.value == '') {
          return `Please enter start date.&&&start_date`;
        } else {
          return `Please enter valid start date format(YYYY-MM-DD)&&&start_date`;
        }
      },
    })
    @ApiProperty({
      description: `start date`,
      example: `2020-11-06`,
    })
    start_date: string;
  
    @IsValidDate('', {
      message: (args: ValidationArguments) => {
        if (typeof args.value == 'undefined' || args.value == '') {
          return `Please enter end date.&&&end_date`;
        } else {
          return `Please enter valid end date format(YYYY-MM-DD)&&&end_date`;
        }
      },
    })
    @IsNotEmpty()
    @ApiProperty({
      description: `end date`,
      example: `2020-11-06`,
    })
    end_date: string;
  
    // @ApiPropertyOptional({
    //   description: 'tags',
    //   example: ['sales', 'marketing'],
    // })
    // tags: string[];
  
  
    @IsNotEmpty()
    @ApiPropertyOptional({
      description: 'group',
      example: '',
    })
    // group: string[];
    group_id: string;
  }
  
  export class ListHolidayDto extends CoreListDto {
    @ApiPropertyOptional({
      description: 'input',
      example: '',
    })
    group_id: string;
  }
  
  export class createGroup {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      description: 'name',
      example: `Name`,
    })
    name: string;
  }
  //---------------//
  export class creatgrpDTO {
    @IsNotEmpty({
      message: `Please enter a name.`,
    })
    @IsString()
    @ApiProperty({
      description: 'name',
      example: `Name`,
    })
    name: string;
  
  }
  export class CreatHolidayDto {
    @ApiPropertyOptional({
      type: 'string',
      format: 'binary',
      description: "Audio file url (Allow Only 'audio')",
      example: 'xyz.mp3',
    })
    file: string;
  
    @IsNotEmpty()
    @ApiProperty({
      description: 'name',
      example: `Name`,
    })
    name: string;
  
    @IsValidDate('', {
      message: (args: ValidationArguments) => {
        if (typeof args.value == 'undefined' || args.value == '') {
          return `Please enter start date.&&&start_date`;
        } else {
          return `Please enter valid start date format(YYYY-MM-DD)&&&start_date`;
        }
      },
    })
    @ApiProperty({
      description: `start date`,
      example: `2020-11-06`,
    })
    start_date: string;
  
    @IsValidDate('', {
      message: (args: ValidationArguments) => {
        if (typeof args.value == 'undefined' || args.value == '') {
          return `Please enter end date.&&&end_date`;
        } else {
          return `Please enter valid end date format(YYYY-MM-DD)&&&end_date`;
        }
      },
    })
    @ApiProperty({
      description: `end date`,
      example: `2020-11-06`,
    })
    end_date: string;
  
    @ApiPropertyOptional({
      description: 'group',
      example: ['call'],
    })
    group: string;
  }
  export class UpdateHolidayDto {
    @ApiPropertyOptional({
      type: 'string',
      format: 'binary',
      description: "Audio file url (Allow Only 'audio')",
      example: 'xyz.mp3',
    })
    file: string;
  
    @IsNotEmpty()
    @ApiProperty({
      description: 'name',
      example: `Name`,
    })
    name: string;
  
    @IsValidDate('', {
      message: (args: ValidationArguments) => {
        if (typeof args.value == 'undefined' || args.value == '') {
          return `Please enter start date.&&&start_date`;
        } else {
          return `Please enter valid start date format(YYYY-MM-DD)&&&start_date`;
        }
      },
    })
    @ApiProperty({
      description: `start date`,
      example: `2020-11-06`,
    })
    start_date: string;
  
    @IsValidDate('', {
      message: (args: ValidationArguments) => {
        if (typeof args.value == 'undefined' || args.value == '') {
          return `Please enter end date.&&&end_date`;
        } else {
          return `Please enter valid end date format(YYYY-MM-DD)&&&end_date`;
        }
      },
    })
    @ApiProperty({
      description: `end date`,
      example: `2020-11-06`,
    })
    end_date: string;
  
  }