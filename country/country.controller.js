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
exports.CountryController = void 0;
const common_1 = require("@nestjs/common");
const country_service_1 = require("./country.service");
const addcountry_dto_1 = require("./dto/addcountry.dto");
const swagger_1 = require("@nestjs/swagger");
const getcountrylist_dto_1 = require("./dto/getcountrylist.dto");
const statuschange_dto_1 = require("./dto/statuschange.dto");
let CountryController = class CountryController {
    constructor(contryService) {
        this.contryService = contryService;
    }
    getCountry() {
        return this.contryService.getCountry();
    }
    async getCountryList(countrylistDto) {
        return await this.contryService.getCountryList(countrylistDto);
    }
    postCountry(creatcountrydto) {
        return this.contryService.postCountry(creatcountrydto);
    }
    async updatecountry(id, addcountrydto) {
        return await this.contryService.updatecountry(id, addcountrydto);
    }
    async updatestatus(_id, body) {
        return await this.contryService.updatestatus(_id, body);
    }
    async deleteCountry(id) {
        return await this.contryService.deleteCountry(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CountryController.prototype, "getCountry", null);
__decorate([
    (0, common_1.Get)('getlist'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getcountrylist_dto_1.CountryListDto]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "getCountryList", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addcountry_dto_1.AddCreatDto]),
    __metadata("design:returntype", void 0)
], CountryController.prototype, "postCountry", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, addcountry_dto_1.AddCreatDto]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "updatecountry", null);
__decorate([
    (0, common_1.Put)('statusChange/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, statuschange_dto_1.ChangeStatusDto]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "updatestatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "deleteCountry", null);
CountryController = __decorate([
    (0, swagger_1.ApiTags)('CountryAPI'),
    (0, common_1.Controller)('country'),
    __metadata("design:paramtypes", [country_service_1.CountryService])
], CountryController);
exports.CountryController = CountryController;
//# sourceMappingURL=country.controller.js.map