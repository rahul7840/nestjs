import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class getallDto {
  @ApiProperty({
    description: 'Enter Key',
  })
  @IsNotEmpty({
    message: `Please enter a city name.`,
  })
  key: string;
  @ApiProperty({
    description: 'Enter feild',
  })
  @IsNotEmpty({
    message: `Please enter a city name.`,
  })
  feild: string;
}
