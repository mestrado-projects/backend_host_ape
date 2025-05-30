import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "@sequelize/core"
import { Attribute, PrimaryKey, AutoIncrement, NotNull } from "@sequelize/core/decorators-legacy"

export class FAQ extends Model<InferAttributes<FAQ>, InferCreationAttributes<FAQ>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>

  @Attribute(DataTypes.STRING)
  @NotNull
  declare question: string

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare answer: string

  @Attribute(DataTypes.STRING)
  declare category: string | null

  @Attribute(DataTypes.INTEGER)
  declare order_position: number | null

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare is_active: boolean
}
