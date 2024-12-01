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

export class ApartmentsRules extends Model<
  InferAttributes<ApartmentsRules>,
  InferCreationAttributes<ApartmentsRules>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare check_in: Date;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare check_out: Date;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare guests_quantity: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare apartment_id: number;
}
