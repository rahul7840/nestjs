/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { AddCreatDto } from './dto/addcountry.dto';
import { Country } from './schema/contry.schema';
import { Model } from 'mongoose';
import { CountryListDto } from './dto/getcountrylist.dto';
import { ChangeStatusDto } from './dto/statuschange.dto';
export declare class CountryService {
    private countryModel;
    constructor(countryModel: Model<Country>);
    getCountry(): Promise<(import("mongoose").Document<unknown, {}, Country> & Omit<Country & Required<{
        _id: string;
    }>, never>)[]>;
    getCountryList(countrylistdto: CountryListDto): Promise<{
        data: (Country & Required<{
            _id: string;
        }>)[];
        count: number;
    }>;
    postCountry(createCountryDto: AddCreatDto): Promise<{
        message: string;
    }>;
    updatecountry(id: string, data: AddCreatDto): Promise<{
        message: string;
    }>;
    updatestatus(_id: string, changestatus: ChangeStatusDto): Promise<{
        message: string;
    }>;
    deleteCountry(id: string): Promise<{
        message: string;
    }>;
}
