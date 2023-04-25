import mongoose, { Document } from 'mongoose';
export type CountryDocument = Country & Document;
export declare class Country {
    _id: string;
    name: string;
    iso: string;
    isactive: boolean;
    deleted: boolean;
}
export declare const CountrySchema: mongoose.Schema<Country, mongoose.Model<Country, any, any, any, mongoose.Document<unknown, any, Country> & Omit<Country & Required<{
    _id: string;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Country, mongoose.Document<unknown, {}, mongoose.FlatRecord<Country>> & Omit<mongoose.FlatRecord<Country> & Required<{
    _id: string;
}>, never>>;
