import sequelize from "../database/connection.js";
import {
  Apartments,
  ApartmentsCommodities,
  ApartmentsContacts,
  ApartmentsDetails,
  ApartmentsImages,
  ApartmentsPropertySecurity,
  ApartmentsReviews,
  ApartmentsRules,
} from "../models/index.js";

export default class GetApartmentsRepository {
  constructor() {
    sequelize
      .authenticate()
      .then(() => console.log("Conectado ao banco de dados com sucesso!"))
      .catch((err) => console.error("Erro ao conectar ao banco:", err));
  }

  public async getAllApartments() {
    try {
      const result = await Apartments.findAll({
        order: [["id", "ASC"]],
        include: { model: ApartmentsImages },
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
        include: [
          { model: ApartmentsDetails },
          { model: ApartmentsImages },
          { model: ApartmentsCommodities },
          { model: ApartmentsContacts },
          { model: ApartmentsPropertySecurity },
          { model: ApartmentsReviews },
          { model: ApartmentsRules },
        ],
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
