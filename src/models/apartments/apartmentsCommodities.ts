import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";
import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  NotNull,
} from "@sequelize/core/decorators-legacy";

export class ApartmentsCommodities extends Model<
  InferAttributes<ApartmentsCommodities>,
  InferCreationAttributes<ApartmentsCommodities>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare has: boolean;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare apartment_id: number;
}
