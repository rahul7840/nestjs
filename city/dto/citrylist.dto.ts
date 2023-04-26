import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CityListDto {
  @IsNotEmpty({
    message: `Please enter limit.`,
  })
  @IsNumber()
  @ApiProperty({
    description: 'Number of items to return per page',
    example: 10,
  })
  limit: number;

  @IsNotEmpty({
    message: `Please enter limit.`,
  })
  @IsNumber()
  @ApiProperty({
    description: 'Number of items to return per page',
    example: 10,
  })
  pageno: number;

  @IsNotEmpty({
    message: `Please enter limit.`,
  })
  @ApiPropertyOptional({
    description: 'Entre the countryID',
  })
  countryID: String;

  @ApiPropertyOptional({
    description: 'status',
    example: 'true/false',
  })
  isActive: boolean;

  @ApiPropertyOptional({
    description: 'status',
    example: 'true/false',
  })
  isDeleted: boolean;
}
