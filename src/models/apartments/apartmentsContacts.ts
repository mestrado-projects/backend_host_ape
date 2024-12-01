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

export class ApartmentsContacts extends Model<
  InferAttributes<ApartmentsContacts>,
  InferCreationAttributes<ApartmentsContacts>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare contact_name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare phone: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare email: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare apartment_id: number;
}
