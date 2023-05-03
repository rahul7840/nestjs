import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class DeleteHashDto {
  @ApiProperty({
    description: 'Enter Key',
    example: '180tc',
  })
  @IsNotEmpty({
    message: `Please enter Key .`,
  })
  key: string;
  @ApiProperty({
    description: 'Enter feild',
    example: '2001',
  })
  @IsNotEmpty({
    message: `Please enter feild.`,
  })
  field: string;
}
