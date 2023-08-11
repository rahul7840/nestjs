import { IsArray, isArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as CONSTANTS from 'src/helper/constant';
import { errorMessage } from 'src/config/common.config';
export class CoreDto {
  @ApiPropertyOptional({
    description: 'tags',
    example: ['sales', 'marketing'],
  })
  tags?: string[];

  // @IsNotEmpty({
  //   message: `Please enter team id`,
  // })
  // @ApiProperty({
  //   description: 'team',
  //   example: 10,
  // })
  // teamId: string;
}

export class CoreListDto {
  @IsNotEmpty({
    message: `Please enter limit&&&limit&&&${errorMessage}`,
  })
  @ApiProperty({
    description: 'Limit',
    example: 10,
  })
  limit: number;

  @IsNotEmpty({
    message: `Please enter page number&&&page&&&${errorMessage}`,
  })
  @ApiProperty({
    description: 'Page number',
    example: 1,
  })
  page_no: number;

  @ApiPropertyOptional({
    description: 'input',
    example: '',
  })
  search: string;

  @ApiPropertyOptional({
    description: 'Order by (Field name)',
    example: '',
  })
  orderBy: string;

  @ApiPropertyOptional({
    description: 'Order by',
    example: '',
  })
  order: string;

  @ApiPropertyOptional({
    description: 'Order by',
    example: '',
  })
  filterVariable: string;

  @ApiPropertyOptional({
    description: 'Order by',
    example: '',
  })
  filterVariableValueType: string;

  @ApiPropertyOptional({
    description: 'Order by',
    example: '',
  })
  filterValue: any;

  @ApiPropertyOptional({
    description: 'excluded user',
    example: [],
  })
  excluded: string[];

  @ApiPropertyOptional({
    description: 'includes user',
    example: [],
  })
  includes: string[];

  @ApiPropertyOptional({
    description: 'tags',
    example: ['sales', 'marketing'],
  })
  tags?: string[];
}

export class CoreExportDto {
  @ApiPropertyOptional({
    description: 'input',
    example: '',
  })
  search: string;

  @ApiPropertyOptional({
    description: 'Order by (Field name)',
    example: '',
  })
  orderBy: string;

  @ApiPropertyOptional({
    description: 'Order by',
    example: '',
  })
  order: string;

  @ApiPropertyOptional({
    description: 'Order by',
    example: '',
  })
  filterVariable: string;

  @ApiPropertyOptional({
    description: 'Order by',
    example: '',
  })
  filterVariableValueType: string;

  @ApiPropertyOptional({
    description: 'Order by',
    example: '',
  })
  filterValue: any;

  @ApiPropertyOptional({
    description: 'excluded user',
    example: [],
  })
  excluded: string[];

  @ApiPropertyOptional({
    description: 'includes user',
    example: [],
  })
  includes: string[];

  @ApiPropertyOptional({
    description: 'tags',
    example: ['sales', 'marketing'],
  })
  tags?: string[];
}

export class MultipleDeleteDto {
  @IsArray()
  //@IsUUID(4, { each: true })
  @IsNotEmpty({
    message: `Please enter ids`,
  })
  @ApiProperty({
    description: 'ids',
    example: [],
  })
  ids: string[];
}
