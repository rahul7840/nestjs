import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class listcardto {
  @IsNotEmpty({
    message: `Please enter limit.`,
  })
  @IsNumber()
  @ApiProperty({
    description: 'Number of items to return per page',
    example: 10,
  })
  limit: number;

  @IsNotEmpty({
    message: `Please enter page number.`,
  })
  @IsNumber()
  @ApiProperty({
    description: 'Page number to return',
    example: 1,
  })
  pageno: number;
}
