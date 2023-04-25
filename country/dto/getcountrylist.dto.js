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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryListDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CountryListDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: `Please enter limit.`,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: 'Number of items to return per page',
        example: 10,
    }),
    __metadata("design:type", Number)
], CountryListDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: `Please enter page number.`,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: 'Page number to return',
        example: 1,
    }),
    __metadata("design:type", Number)
], CountryListDto.prototype, "pageno", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'status',
        example: 'true/false',
    }),
    __metadata("design:type", Boolean)
], CountryListDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'status',
        example: 'true/false',
    }),
    __metadata("design:type", Boolean)
], CountryListDto.prototype, "deleted", void 0);
exports.CountryListDto = CountryListDto;
//# sourceMappingURL=getcountrylist.dto.js.map