import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class StringGetFindDto {
  @ApiProperty({
    description: 'Enter the name of the set',
    example: 'vegitable',
  })
  @IsNotEmpty({
    message: `Please enter the name of the get find.`,
  })
  @IsString()
  key: string;
}
