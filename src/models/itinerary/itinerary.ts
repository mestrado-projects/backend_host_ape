import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "@sequelize/core"
import { Attribute, PrimaryKey, AutoIncrement, NotNull } from "@sequelize/core/decorators-legacy"

export class Itinerary extends Model<InferAttributes<Itinerary>, InferCreationAttributes<Itinerary>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>

  @Attribute(DataTypes.STRING)
  @NotNull
  declare title: string

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare description: string

  @Attribute(DataTypes.STRING)
  @NotNull
  declare location: string

  @Attribute(DataTypes.INTEGER)
  declare duration_days: number | null

  @Attribute(DataTypes.FLOAT)
  declare estimated_cost: number | null

  @Attribute(DataTypes.STRING)
  declare difficulty_level: string | null

  @Attribute(DataTypes.JSON)
  declare activities: any[] | null

  @Attribute(DataTypes.STRING)
  declare image_url: string | null

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare is_active: boolean
}
