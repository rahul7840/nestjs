import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  companyname: string;
  @Prop({
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  })
  modelnumber: any;
  @Prop({
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  })
  year: Number;

  @Prop({
    type: Boolean,
    default: false,
    timestamps: true,
  })
  deleted: Boolean;
}

// export const carSchema = new mongoose.Schema(
//   {
//     deleted: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true },
// );

export const CarSchema = SchemaFactory.createForClass(Car);
