import sequelize from "../database/connection.js";
import { Apartments, ApartmentsDetails } from "../models/index.js";
export default class GetApartmentsRepository {
    constructor() {
        sequelize
            .authenticate()
            .then(() => console.log("Conectado ao banco de dados com sucesso!"))
            .catch((err) => console.error("Erro ao conectar ao banco:", err));
        sequelize.sync({ alter: true });
    }
    async getAllApartments() {
        try {
            const result = await Apartments.findAll({
                order: [["id", "ASC"]],
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async getApartmentById(id) {
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
        }
        catch (error) {
            throw error;
        }
    }
}
