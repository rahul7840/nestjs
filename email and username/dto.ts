import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateUser {
	@IsNotEmpty({
		message: `Please enter a user name.`,
	})
	@ApiProperty({
		description: "Enter User name",
		example: "kaliya",
	})
	name: string;

	@IsNotEmpty({
		message: `Please enter e-mail .`,
	})
	@ApiProperty({
		description: "enter email",
		example: "xyz@gmail.com",
	})
	email: string;
}
