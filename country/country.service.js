"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryService = void 0;
const common_1 = require("@nestjs/common");
const contry_schema_1 = require("./schema/contry.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CountryService = class CountryService {
    constructor(countryModel) {
        this.countryModel = countryModel;
    }
    async getCountry() {
        return await this.countryModel.find();
    }
    async getCountryList(countrylistdto) {
        try {
            let { pageno, limit, isActive } = countrylistdto;
            if (typeof limit === 'string')
                limit = parseInt(limit);
            if (typeof pageno === 'string')
                pageno = parseInt(pageno);
            if (pageno <= 0) {
                pageno = 1;
            }
            let skip = limit * (pageno - 1);
            const final = await this.countryModel
                .find()
                .skip(skip)
                .limit(limit)
                .lean();
            const count = await this.countryModel.countDocuments();
            return { data: final, count };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async postCountry(createCountryDto) {
        try {
            const { name, iso } = createCountryDto;
            const existingCountryByName = await this.countryModel.findOne({ name });
            const existingCountryByIso = await this.countryModel.findOne({ iso });
            if ((name === (existingCountryByName === null || existingCountryByName === void 0 ? void 0 : existingCountryByName.name) &&
                iso === (existingCountryByIso === null || existingCountryByIso === void 0 ? void 0 : existingCountryByIso.iso)) ||
                (name === (existingCountryByIso === null || existingCountryByIso === void 0 ? void 0 : existingCountryByIso.name) &&
                    iso === (existingCountryByName === null || existingCountryByName === void 0 ? void 0 : existingCountryByName.iso))) {
                throw new common_1.BadRequestException('Invalid input.. ISO and COUNTRY should metch');
            }
            const countryExists = await this.countryModel.findOne({
                $or: [{ name }, { iso }],
            });
            if (countryExists) {
                throw new common_1.ConflictException('Country already exists');
            }
            const result = await this.countryModel.create({ name, iso });
            if (!result) {
                throw new common_1.InternalServerErrorException('Something went wrong!');
            }
            return { message: 'Inserted successfully!' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async updatecountry(id, data) {
        try {
            const { name, iso } = data;
            const country = await this.countryModel.findById(id);
            if (!country) {
                return { message: `Country with ID ${id} not found` };
            }
            const duplicate = await this.countryModel.findOne({
                name,
                _id: { $ne: id },
            });
            if (duplicate) {
                return { message: `Country with name "${name}" already exists` };
            }
            country.name = name;
            country.iso = iso;
            const updatedCountry = await country.save();
            if (!updatedCountry) {
                return { message: `Country details not found` };
            }
            return { message: 'Update Success' };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async updatestatus(_id, changestatus) {
        try {
            const { status } = changestatus;
            const isAlreadyExist = await this.countryModel.findById(_id, { _id: 1 });
            if (!isAlreadyExist) {
                return { message: `allready exist` };
            }
            const updateStatus = await this.countryModel.updateOne({ _id }, { $set: { isActive: status } });
            if (!updateStatus) {
                return { message: `Error when trying to update the record` };
            }
            else {
                return { message: `status updated...` };
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteCountry(id) {
        try {
            const updateCountry = await this.countryModel.findByIdAndUpdate(id, {
                $set: { deleted: true },
            });
            if (!updateCountry) {
                return { message: `country not found ` };
            }
            else {
                return { message: `Deletion Successfully!!!` };
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
};
CountryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(contry_schema_1.Country.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CountryService);
exports.CountryService = CountryService;
//# sourceMappingURL=country.service.js.map