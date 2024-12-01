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
import { Attribute, PrimaryKey, AutoIncrement, NotNull, HasMany, HasOne, } from "@sequelize/core/decorators-legacy";
import { ApartmentsCommodities } from "./apartmentsCommodities.js";
import { ApartmentsRules } from "./apartmentsRules.js";
import { ApartmentsPropertySecurity } from "./apartmentsPropertySecurity.js";
import { ApartmentsContacts } from "./apartmentsContacts.js";
import { ApartmentsReviews } from "./apartmentsReviews.js";
import { ApartmentsDetails } from "./apartmentsDetails.js";
export var ApartmentType;
(function (ApartmentType) {
    ApartmentType["Apartment"] = "Apartment";
    ApartmentType["Studio"] = "Studio";
})(ApartmentType || (ApartmentType = {}));
export class Apartments extends Model {
}
__decorate([
    Attribute(DataTypes.INTEGER),
    PrimaryKey,
    AutoIncrement,
    __metadata("design:type", Object)
], Apartments.prototype, "id", void 0);
__decorate([
    Attribute(DataTypes.STRING),
    NotNull,
    __metadata("design:type", String)
], Apartments.prototype, "simpleLocation", void 0);
__decorate([
    Attribute(DataTypes.STRING),
    NotNull,
    __metadata("design:type", String)
], Apartments.prototype, "name", void 0);
__decorate([
    Attribute(DataTypes.FLOAT),
    __metadata("design:type", Object)
], Apartments.prototype, "basicPrice", void 0);
__decorate([
    Attribute(DataTypes.ENUM(...Object.values(ApartmentType))),
    NotNull,
    __metadata("design:type", String)
], Apartments.prototype, "type", void 0);
__decorate([
    Attribute(DataTypes.INTEGER),
    NotNull,
    __metadata("design:type", Number)
], Apartments.prototype, "bathroom", void 0);
__decorate([
    Attribute(DataTypes.INTEGER),
    NotNull,
    __metadata("design:type", Number)
], Apartments.prototype, "bedroom", void 0);
__decorate([
    Attribute(DataTypes.BOOLEAN),
    NotNull,
    __metadata("design:type", Boolean)
], Apartments.prototype, "kitchen", void 0);
__decorate([
    Attribute(DataTypes.INTEGER),
    NotNull,
    __metadata("design:type", Number)
], Apartments.prototype, "beds", void 0);
__decorate([
    Attribute(DataTypes.TEXT),
    NotNull,
    __metadata("design:type", String)
], Apartments.prototype, "about", void 0);
__decorate([
    HasOne(() => ApartmentsRules, "apartment_id"),
    __metadata("design:type", Object)
], Apartments.prototype, "rules", void 0);
__decorate([
    HasMany(() => ApartmentsCommodities, "apartment_id"),
    __metadata("design:type", Object)
], Apartments.prototype, "commodities", void 0);
__decorate([
    HasMany(() => ApartmentsPropertySecurity, "apartment_id"),
    __metadata("design:type", Object)
], Apartments.prototype, "propertySecurity", void 0);
__decorate([
    HasMany(() => ApartmentsContacts, "apartment_id"),
    __metadata("design:type", Object)
], Apartments.prototype, "contacts", void 0);
__decorate([
    HasMany(() => ApartmentsDetails, "apartment_id"),
    __metadata("design:type", Object)
], Apartments.prototype, "details", void 0);
__decorate([
    HasMany(() => ApartmentsReviews, { foreignKey: "apartment_id" }),
    __metadata("design:type", Object)
], Apartments.prototype, "reviews", void 0);
