import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatCarDto {
  @IsNotEmpty({
    message: `Please enter a Cat name.`,
  })
  @ApiProperty({
    description: 'Enter your Cat Name',
    example: 'honda',
  })
  companyname: string;

  @IsNotEmpty({
    message: `Please enter a Cat name.`,
  })
  @ApiProperty({
    description: 'Enter your Cat Name',
    example: '180tc',
  })
  modelnumber: any;

  @IsNotEmpty({
    message: `Please enter a Cat name.`,
  })
  @ApiProperty({
    description: 'Enter your Cat Name',
    example: '2001',
  })
  year: Number;
}
