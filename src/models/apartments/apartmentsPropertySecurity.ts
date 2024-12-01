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

export class ApartmentsPropertySecurity extends Model<
  InferAttributes<ApartmentsPropertySecurity>,
  InferCreationAttributes<ApartmentsPropertySecurity>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare value: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare apartment_id: number;
}
