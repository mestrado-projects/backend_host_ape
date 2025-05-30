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
import { Apartments } from "../apartments/apartments.js"

export enum BookingStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Cancelled = "Cancelled",
  Completed = "Completed",
}

export class Bookings extends Model<InferAttributes<Bookings>, InferCreationAttributes<Bookings>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare guest_id: number

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare apartment_id: number

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare check_in_date: Date

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare check_out_date: Date

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare guests_quantity: number

  @Attribute(DataTypes.FLOAT)
  @NotNull
  declare total_price: number

  @Attribute(DataTypes.ENUM(...Object.values(BookingStatus)))
  @NotNull
  declare status: BookingStatus

  @Attribute(DataTypes.TEXT)
  declare special_requests: string | null

  @BelongsTo(() => Guests, "guest_id")
  declare guest?: NonAttribute<Guests>

  @BelongsTo(() => Apartments, "apartment_id")
  declare apartment?: NonAttribute<Apartments>
}
