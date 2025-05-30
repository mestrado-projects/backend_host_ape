import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type NonAttribute,
} from "@sequelize/core"
import { Attribute, PrimaryKey, AutoIncrement, NotNull, BelongsTo, HasMany } from "@sequelize/core/decorators-legacy"
import { Users } from "./users.js"
import { ApartmentsReviews } from "../apartments/apartmentsReviews.js"
import { Bookings } from "../bookings/bookings.js"
import { Testimonials } from "../testimonials/testimonials.js"

export class Guests extends Model<InferAttributes<Guests>, InferCreationAttributes<Guests>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare user_id: number

  @Attribute(DataTypes.STRING)
  declare phone: string | null

  @Attribute(DataTypes.DATE)
  declare date_of_birth: Date | null

  @Attribute(DataTypes.STRING)
  declare document_number: string | null

  @Attribute(DataTypes.TEXT)
  declare preferences: string | null

  @BelongsTo(() => Users, "user_id")
  declare user?: NonAttribute<Users>

  @HasMany(() => ApartmentsReviews, "guest_id")
  declare reviews?: NonAttribute<ApartmentsReviews[]>

  @HasMany(() => Bookings, "guest_id")
  declare bookings?: NonAttribute<Bookings[]>

  @HasMany(() => Testimonials, "guest_id")
  declare testimonials?: NonAttribute<Testimonials[]>
}
