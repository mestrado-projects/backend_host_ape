import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type NonAttribute,
} from "@sequelize/core"
import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  NotNull,
  Unique,
  HasMany,
  HasOne,
} from "@sequelize/core/decorators-legacy"
import { Sessions } from "./sessions.js"
import { Guests } from "./guests.js"

export enum UserRole {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_GUEST = "ROLE_GUEST",
}

export class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare email: string

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string

  @Attribute(DataTypes.ENUM(...Object.values(UserRole)))
  @NotNull
  declare role: UserRole

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare is_active: boolean

  @Attribute(DataTypes.DATE)
  declare last_login: Date | null

  @HasMany(() => Sessions, "user_id")
  declare sessions?: NonAttribute<Sessions[]>

  @HasOne(() => Guests, "user_id")
  declare guest?: NonAttribute<Guests>
}
