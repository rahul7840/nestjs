import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ZcountDto {
  @ApiProperty({
    description: 'Enter Key',
    example: 'gym',
  })
  @IsNotEmpty({
    message: `Please enter Key.`,
  })
  key: string;

  @ApiProperty({
    description: 'Enter value',
    example: 1,
  })
  @IsNotEmpty({
    message: `Please enter a city name.`,
  })
  @IsNumber()
  min: number;

  @ApiProperty({
    description: 'Enter value',
    example: 10,
  })
  @IsNotEmpty({
    message: `Please enter a city name.`,
  })
  @IsNumber()
  max: number;
}
