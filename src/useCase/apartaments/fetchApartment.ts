import { Apartments, ApartmentsImages, ImageType } from "../models/index.js";
import GetApartmentsRepository from "../repositories/getApartmentsRepository.js";

export default class FetchApartmentUseCase {
  async execute() {
    try {
      const apartments = await new GetApartmentsRepository().getAllApartments();
      const apartmentsResponse = [];

      for (const apartment of apartments) {
        const apartmentData = apartment.dataValues;

        const images = apartment.images;
        const imageFound = images?.find(
          (image) => image.image_type === ImageType.Thumb,
        );

        const imageThumbUrl = imageFound ? imageFound.url : "";

        apartmentsResponse.push({
          id: apartmentData.id,
          name: apartmentData.name,
          simpleLocation: apartmentData.simpleLocation,
          basicPrice: apartmentData.basicPrice,
          type: apartmentData.type,
          imageThumbUrl,
        });
      }

      return apartmentsResponse;
    } catch (error) {
      throw error;
    }
  }
}
