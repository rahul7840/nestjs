import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetAllDto {
  @ApiProperty({
    description: 'Enter Key',
    example: 'name',
  })
  @IsNotEmpty({
    message: `Please enter Key.`,
  })
  key: string;
}
