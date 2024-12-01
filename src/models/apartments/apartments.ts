import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "@sequelize/core";
import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  NotNull,
  HasMany,
  HasOne,
} from "@sequelize/core/decorators-legacy";
import { ApartmentsCommodities } from "./apartmentsCommodities";
import { ApartmentsRules } from "./apartmentsRules";
import { ApartmentsPropertySecurity } from "./apartmentsPropertySecurity";
import { ApartmentsContacts } from "./apartmentsContacts";
import { ApartmentsReviews } from "./apartmentsReviews";
import { ApartmentsDetails } from "./apartmentsDetails";

export enum ApartmentType {
  Apartment = "Apartment",
  Studio = "Studio",
}

export class Apartments extends Model<
  InferAttributes<Apartments>,
  InferCreationAttributes<Apartments>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare simpleLocation: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.FLOAT)
  declare basicPrice: number | null;

  @Attribute(DataTypes.ENUM(...Object.values(ApartmentType)))
  @NotNull
  declare type: ApartmentType;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare bathroom: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare bedroom: number;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare kitchen: boolean;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare beds: number;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare about: string;

  @HasOne(() => ApartmentsRules, "apartment_id")
  declare rules?: NonAttribute<ApartmentsRules>;

  @HasMany(() => ApartmentsCommodities, "apartment_id")
  declare commodities?: NonAttribute<ApartmentsCommodities[]>;

  @HasMany(() => ApartmentsPropertySecurity, "apartment_id")
  declare propertySecurity?: NonAttribute<ApartmentsPropertySecurity[]>;

  @HasMany(() => ApartmentsContacts, "apartment_id")
  declare contacts?: NonAttribute<ApartmentsContacts[]>;

  @HasMany(() => ApartmentsDetails, "apartment_id")
  declare details?: NonAttribute<ApartmentsDetails[]>;

  @HasMany(() => ApartmentsReviews, { foreignKey: "apartment_id" })
  declare reviews?: NonAttribute<ApartmentsReviews[]>;
}
