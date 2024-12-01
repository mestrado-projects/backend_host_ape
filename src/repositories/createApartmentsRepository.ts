import sequelize from "../database/connection.js";
import {
  Apartments,
  ApartmentsCommodities,
  ApartmentsContacts,
  ApartmentsDetails,
  ApartmentsPropertySecurity,
  ApartmentsRules,
  ApartmentType,
} from "../models/index.js";

export default class CreateApartmentsRepository {
  constructor() {
    sequelize
      .authenticate()
      .then(() => console.log("Conectado ao banco de dados com sucesso!"))
      .catch((err) => console.error("Erro ao conectar ao banco:", err));
    sequelize.sync({ alter: true });
  }

  public async transaction(
    apartmentsInput: Apartments & {
      details: ApartmentsDetails[];
      commodities: ApartmentsCommodities[];
      property_security: ApartmentsPropertySecurity[];
      rules: ApartmentsRules;
      contacts: ApartmentsContacts[];
    },
  ) {
    try {
      await sequelize.transaction(async () => {
        const apartmentCreated = await Apartments.create({
          simpleLocation: apartmentsInput.simpleLocation,
          name: apartmentsInput.name,
          basicPrice: apartmentsInput.basicPrice,
          bathroom: apartmentsInput.bathroom,
          type: apartmentsInput.type as ApartmentType,
          bedroom: apartmentsInput.bedroom,
          beds: apartmentsInput.beds,
          about: apartmentsInput.about,
          kitchen: apartmentsInput.kitchen,
        });

        (apartmentsInput.rules.apartment_id = apartmentCreated.id),
          await ApartmentsRules.create(apartmentsInput.rules);

        apartmentsInput.details.map(
          (detail: ApartmentsDetails) =>
            (detail.apartment_id = apartmentCreated.id),
        );

        await ApartmentsDetails.bulkCreate(apartmentsInput.details);

        apartmentsInput.commodities.map(
          (commodities: ApartmentsCommodities) =>
            (commodities.apartment_id = apartmentCreated.id),
        );

        await ApartmentsCommodities.bulkCreate(apartmentsInput.commodities);

        apartmentsInput.property_security.map(
          (property_security: ApartmentsPropertySecurity) =>
            (property_security.apartment_id = apartmentCreated.id),
        );

        await ApartmentsPropertySecurity.bulkCreate(
          apartmentsInput.property_security,
        );

        apartmentsInput.contacts.map(
          (contact: ApartmentsContacts) =>
            (contact.apartment_id = apartmentCreated.id),
        );
        await ApartmentsContacts.bulkCreate(apartmentsInput.contacts);
      });

      return apartmentsInput;
    } catch (error) {
      throw error;
    }
  }
}
