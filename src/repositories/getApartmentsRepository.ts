import sequelize from "../database/connection";
import {
  Apartments,
  ApartmentsCommodities,
  ApartmentsContacts,
  ApartmentsDetails,
  ApartmentsPropertySecurity,
  ApartmentsRules,
} from "../models";

export default class GetApartmentsRepository {
  constructor() {
    sequelize
      .authenticate()
      .then(() => console.log("Conectado ao banco de dados com sucesso!"))
      .catch((err) => console.error("Erro ao conectar ao banco:", err));

    sequelize.sync({ alter: true });
  }

  public async getAllApartments() {
    try {
      const result = await Apartments.findAll({
        order: [["id", "ASC"]],
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getApartmentById(id: number) {
    try {
      const result = await Apartments.findOne({
        where: {
          id,
        },
        include: [{ model: ApartmentsDetails }],
      });

      if (!result) {
        throw new Error(`Apartment with id: "${id}" not found`);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
}
