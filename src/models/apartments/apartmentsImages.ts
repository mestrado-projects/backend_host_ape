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

export enum ImageType {
  Principal = "Principal",
  Rooms = "Rooms",
  Thumb = "Thumb",
}

export class ApartmentsImages extends Model<
  InferAttributes<ApartmentsImages>,
  InferCreationAttributes<ApartmentsImages>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.ENUM(...Object.values(ImageType)))
  @NotNull
  declare image_type: ImageType;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare image_name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare url: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare apartment_id: number;
}
