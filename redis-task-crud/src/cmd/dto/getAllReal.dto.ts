import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class getRealAllDto {
  @ApiProperty({
    description: 'Enter Key',
  })
  @IsNotEmpty({
    message: `Please enter a city name.`,
  })
  key: string;
}
