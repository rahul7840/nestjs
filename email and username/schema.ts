import * as bcrypt from "bcrypt";
import { Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { createSchemaForClassWithMethods } from "../../../shared/mongoose/create-schema";

@Schema()
export class User extends Document {
	@Prop({
		type: String,
		default: function genUUID() {
			return uuidv4();
		},
	})
	_id: string;

	@Prop({
		index: true,
		trim: true,
		lowercase: true,
	})
	fullName: string;

	@Prop({
		index: true,
		trim: true,
		lowercase: true,
	})
	email: string;
}
export const UserSchema = createSchemaForClassWithMethods(User);
