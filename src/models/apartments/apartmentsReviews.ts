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
  ValidateAttribute,
} from "@sequelize/core/decorators-legacy";

export class ApartmentsReviews extends Model<
  InferAttributes<ApartmentsReviews>,
  InferCreationAttributes<ApartmentsReviews>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare guest_id: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare apartment_id: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare guests_quantity: number;

  @Attribute(DataTypes.INTEGER)
  @ValidateAttribute({ min: 1, max: 5 })
  @NotNull
  declare rate: number;

  @Attribute(DataTypes.TEXT)
  declare review: string | null;
}
