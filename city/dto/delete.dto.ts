import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class DeleteStatusDto {
  @IsNotEmpty({
    message: `Please enter the status.`,
  })
  @IsBoolean()
  @ApiProperty({
    description: 'Change the status to either true or false.',
    example: true,
  })
  status: boolean;
}
