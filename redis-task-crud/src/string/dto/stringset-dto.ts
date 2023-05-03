import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class StringSetDto {
  @ApiProperty({
    description: 'Enter the name of the set',
    example: 'vegitable',
  })
  @IsNotEmpty({
    message: `Please enter the name of the set.`,
  })
  @IsString()
  key: string;

  @ApiProperty({
    description: 'Enter one or more values to add to the set',
    example: 'potato',
  })
  @IsNotEmpty({
    message: `Please enter one or more values to add to the set.`,
  })
  @IsArray()
  value: string;
}
