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
exports.CountrySchema = exports.Country = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
let Country = class Country {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: function genUUID() {
            return (0, uuid_1.v4)();
        },
    }),
    __metadata("design:type", String)
], Country.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    }),
    __metadata("design:type", String)
], Country.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    }),
    __metadata("design:type", String)
], Country.prototype, "iso", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true,
        required: false,
    }),
    __metadata("design:type", Boolean)
], Country.prototype, "isactive", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], Country.prototype, "deleted", void 0);
Country = __decorate([
    (0, mongoose_1.Schema)()
], Country);
exports.Country = Country;
exports.CountrySchema = mongoose_1.SchemaFactory.createForClass(Country);
//# sourceMappingURL=contry.schema.js.map