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
  Unique,
} from "@sequelize/core/decorators-legacy";

export class Sessions extends Model<
  InferAttributes<Sessions>,
  InferCreationAttributes<Sessions>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare token: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  @Unique
  declare guest_id: number;
}
