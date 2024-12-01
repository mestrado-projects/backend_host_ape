import sequelize from "../database/connection";
import {
  Apartments,
  ApartmentsCommodities,
  ApartmentsContacts,
  ApartmentsDetails,
  ApartmentsPropertySecurity,
  ApartmentsRules,
} from "../models";

export default class CreateApartmentsRepository {
  constructor() {
    sequelize
      .authenticate()
      .then(() => console.log("Conectado ao banco de dados com sucesso!"))
      .catch((err) => console.error("Erro ao conectar ao banco:", err));

    if (process.env.ENVIRONMENT === "local") {
      sequelize.sync({ alter: true });
    }
  }

  public async transaction(apartmentsInput: any) {
    try {
      await sequelize.transaction(async () => {
        // const apartmentCreated = await Apartments.create({
        //   simpleLocation: apartmentsInput.simpleLocation,
        //   name: apartmentsInput.name,
        //   basicPrice: apartmentsInput.basicPrice,
        // });

        // await ApartmentsRules.create(apartmentsInput.rules);

        await ApartmentsCommodities.bulkCreate(
          apartmentsInput.commodities,
          // apartment_id: apartmentCreated.id,
        );

        // await ApartmentsPropertySecurity.bulkCreate(
        //   apartmentsInput.property_security,
        // );

        // await ApartmentsContacts.bulkCreate(apartmentsInput.contacts);

        // await ApartmentsDetails.bulkCreate(apartmentsInput.details);
      });
    } catch (error) {
      throw error;
    }
  }
}
