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

  @Attribute(DataTypes.STRING)
  @NotNull
  declare check_in: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare check_out: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare guests_quantity: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare apartment_id: number;
}
