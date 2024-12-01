var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DataTypes, Model, } from "@sequelize/core";
import { Attribute, PrimaryKey, AutoIncrement, NotNull, ValidateAttribute, } from "@sequelize/core/decorators-legacy";
export class ApartmentsReviews extends Model {
}
__decorate([
    Attribute(DataTypes.INTEGER),
    PrimaryKey,
    AutoIncrement,
    __metadata("design:type", Object)
], ApartmentsReviews.prototype, "id", void 0);
__decorate([
    Attribute(DataTypes.INTEGER),
    NotNull,
    __metadata("design:type", Number)
], ApartmentsReviews.prototype, "guest_id", void 0);
__decorate([
    Attribute(DataTypes.INTEGER),
    NotNull,
    __metadata("design:type", Number)
], ApartmentsReviews.prototype, "apartment_id", void 0);
__decorate([
    Attribute(DataTypes.INTEGER),
    NotNull,
    __metadata("design:type", Number)
], ApartmentsReviews.prototype, "guests_quantity", void 0);
__decorate([
    Attribute(DataTypes.INTEGER),
    ValidateAttribute({ min: 1, max: 5 }),
    NotNull,
    __metadata("design:type", Number)
], ApartmentsReviews.prototype, "rate", void 0);
__decorate([
    Attribute(DataTypes.TEXT),
    __metadata("design:type", Object)
], ApartmentsReviews.prototype, "review", void 0);
