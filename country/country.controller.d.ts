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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CountryService } from './country.service';
import { AddCreatDto } from './dto/addcountry.dto';
import { CountryListDto } from './dto/getcountrylist.dto';
import { ChangeStatusDto } from './dto/statuschange.dto';
export declare class CountryController {
    private readonly contryService;
    constructor(contryService: CountryService);
    getCountry(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/contry.schema").Country> & Omit<import("./schema/contry.schema").Country & Required<{
        _id: string;
    }>, never>)[]>;
    getCountryList(countrylistDto: CountryListDto): Promise<{
        data: (import("./schema/contry.schema").Country & Required<{
            _id: string;
        }>)[];
        count: number;
    }>;
    postCountry(creatcountrydto: AddCreatDto): Promise<{
        message: string;
    }>;
    updatecountry(id: string, addcountrydto: AddCreatDto): Promise<{
        message: string;
    }>;
    updatestatus(_id: string, body: ChangeStatusDto): Promise<{
        message: string;
    }>;
    deleteCountry(id: string): Promise<{
        message: string;
    }>;
}
