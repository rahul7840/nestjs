import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCatDto {
  @IsNotEmpty({
    message: `Please enter a Cat name.`
  })
  @ApiProperty({
    description: "Enter your Cat Name",
    example: "kitty"
  })
  name: string;

  @IsNotEmpty({
    message: `Please enter a Cat age.`
  })
  @ApiProperty({
    description: "Enter Cat Age",
    example: 2
  })
  age: number;

  @IsNotEmpty({
    message: `Please enter a Cat breed.`
  })
  @ApiProperty({
    description: "Enter Cat Breed",
    example: "Siamese"
  })
  breed: string;

  @IsNotEmpty({
    message: `Please enter a Cat origin.`
  })
  @ApiProperty({
    description: "Enter Cat Origin Country",
    example: "India"
  })
  origin: string;
}
