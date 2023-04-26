import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddCityDto {
  @IsNotEmpty({
    message: `Please enter a city name.`,
  })
  @IsString()
  @ApiProperty({
    description: 'City Name',
    example: 'Delhi',
  })
  cityname: string;

  @IsUUID(4)
  @ApiProperty({
    description: 'Country from the database',
    example: 'aca83c0f-c7ce-4689-a194-67847e02e637',
  })
  countryID: string;

  @IsNotEmpty({
    message: `Please enter if a city is active or not.`,
  })
  @IsBoolean()
  @ApiProperty({
    description: 'City is active or not',
    example: true,
  })
  isActive: boolean;
}
