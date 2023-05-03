import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ZremDto {
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
    example: 'dumble',
  })
  @IsNotEmpty({
    message: `Please enter a city name.`,
  })
  value: any;
}
