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

    if (process.env.ENVIRONMENT === "local") {
      sequelize.sync({ alter: true });
    }
  }

  public async getAllApartments() {
    try {
      const result = await Apartments.findAll();
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
      return result;
    } catch (error) {
      throw error;
    }
  }
}
