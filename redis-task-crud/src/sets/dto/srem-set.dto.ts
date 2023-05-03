import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class SremDto {
  @ApiProperty({
    description: 'Enter the name of the set',
    example: 'name',
  })
  @IsNotEmpty({
    message: `Please enter the name of the set.`,
  })
  @IsString()
  key: string;

  @ApiProperty({
    description: 'Enter one or more values to remove from the set',
    example: ['name1', 'name2'],
  })
  @IsNotEmpty({
    message: `Please enter one or more values to remove from the set.`,
  })
  @IsArray()
  values: string[];
}
