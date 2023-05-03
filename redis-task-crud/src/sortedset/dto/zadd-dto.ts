import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ZaddDto {
  @ApiProperty({
    description: 'Enter Key',
    example: 'gym',
  })
  @IsNotEmpty({
    message: `Please enter Key.`,
  })
  key: string;

  @ApiProperty({
    description: 'Enter score',
    example: '10',
  })
  @IsNotEmpty({
    message: `Please enter score.`,
  })
  score: number;

  @ApiProperty({
    description: 'Enter value',
    example: 'dumble',
  })
  @IsNotEmpty({
    message: `Please enter a city name.`,
  })
  value: any;
}
