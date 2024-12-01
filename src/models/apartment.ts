import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";

class Apartment extends Model {
  public id!: number;
  public name!: string;
  public location!: string;
  public price!: number;
}

Apartment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    simpleLocation: {
      type: DataTypes.STRING,
    },
    basicPrice: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    tableName: "apartments",
    timestamps: false,
  },
);

export default Apartment;
