import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatHashDto {
  @ApiProperty({
    description: 'Enter Key',
    example: 'honda',
  })
  @IsNotEmpty({
    message: `Please enter a city name.`,
  })
  key: string;

  @ApiProperty({
    description: 'Enter field',
    example: '180tc',
  })
  @IsNotEmpty({
    message: `Please enter a city name.`,
  })
  field: string;

  @ApiProperty({
    description: 'Enter value',
    example: '2001',
  })
  @IsNotEmpty({
    message: `Please enter a city name.`,
  })
  value: any;
}
