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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
        this.FakeValue = ' this is rahul and this is facke value frm db';
        this.fakeModel = {
            name: 'rahul',
            email: 'xtt@gmaill.com',
        };
    }
    async getHello() {
        return this.appService.getHello();
    }
    async getSimpleString() {
        let value = await this.cacheManager.get('my-string');
        if (value) {
            return { data: value, LoadFrom: 'redis cache' };
        }
        await this.cacheManager.set('my-string', this.FakeValue, 300);
        return {
            date: this.FakeValue,
            LoadFrom: 'fake database',
        };
    }
    async getObject() {
        let profile = await this.cacheManager.get('my-object');
        if (profile) {
            return {
                date: profile,
                LoadFrom: 'redis cache',
            };
        }
        await this.cacheManager.set('my-object', this.fakeModel, { ttl: 300 });
        return {
            date: this.fakeModel,
            LoadFrom: 'fake database',
        };
    }
};
__decorate([
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getSimpleString", null);
__decorate([
    (0, common_1.Get)('objectcahch'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getObject", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map