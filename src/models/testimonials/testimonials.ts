import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type NonAttribute,
} from "@sequelize/core"
import { Attribute, PrimaryKey, AutoIncrement, NotNull, BelongsTo } from "@sequelize/core/decorators-legacy"
import { Guests } from "../users/guests.js"

export class Testimonials extends Model<InferAttributes<Testimonials>, InferCreationAttributes<Testimonials>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>

  @Attribute(DataTypes.INTEGER)
  declare guest_id: number | null

  @Attribute(DataTypes.STRING)
  @NotNull
  declare author_name: string

  @Attribute(DataTypes.STRING)
  declare author_location: string | null

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare content: string

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare rating: number

  @Attribute(DataTypes.STRING)
  declare author_image_url: string | null

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare is_featured: boolean

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare is_active: boolean

  @BelongsTo(() => Guests, "guest_id")
  declare guest?: NonAttribute<Guests>
}
