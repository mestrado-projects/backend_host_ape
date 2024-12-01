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
  Unique,
  HasMany,
} from "@sequelize/core/decorators-legacy";
import { ApartmentsReviews } from "../apartments/apartmentsReviews";

export class Guests extends Model<
  InferAttributes<Guests>,
  InferCreationAttributes<Guests>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare email: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare phone: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @HasMany(() => ApartmentsReviews, "guest_id")
  declare reviews?: NonAttribute<ApartmentsReviews[]>;
}
