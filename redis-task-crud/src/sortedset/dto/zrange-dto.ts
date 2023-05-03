import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ZrangeDto {
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
    example: 0,
  })
  @IsNotEmpty({
    message: `Please enter a city name.`,
  })
  @IsNumber()
  start: number;

  @ApiProperty({
    description: 'Enter value',
    example: -1,
  })
  @IsNotEmpty({
    message: `Please enter a city name.`,
  })
  @IsNumber()
  stop: number;
}
