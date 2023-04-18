import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop({
    type: String,
    required: true,
    trim: true,
    index: true
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
    trim: true,
    index: true
  })
  age: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
    index: true
  })
  breed: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    index: true
  })
  origin: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
