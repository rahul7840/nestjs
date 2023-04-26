import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CityDocument = City & Document;
@Schema()
export class City {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id: String;
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  cityname: String;
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  countryID: String;

  @Prop({
    type: Boolean,
    default: true,
    required: false,
  })
  isActive: boolean;
  @Prop({
    type: Boolean,
    default: false,
    required: false,
  })
  isDeleted: boolean;
  @Prop({
    type: Date,
    required: false,
  })
  updatedAt: Date;
  @Prop({
    type: Date,
    required: false,
  })
  createdAt: Date;
}
export const CitySchema = SchemaFactory.createForClass(City);
