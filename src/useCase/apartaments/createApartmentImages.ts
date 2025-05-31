import { ImageType } from "../../models/index.js";
import {
  createImagesBulk,
  CreateApartmentImagesRepository,
} from "../../repositories/createApartmentImagesRepository.js";
import GetApartmentsRepository from "../../repositories/getApartmentsRepository.js";
import CloudinaryClient from "../../services/cloudinaryClient.js";

export default class CreateApartmentImagesUseCase {
  async execute(
    apartmentId: number,
    images?: { originalname: string; buffer: Buffer }[],
    mainImage?: { originalname: string; buffer: Buffer },
    thumbImage?: { originalname: string; buffer: Buffer },
  ) {
    try {
      const cloudinaryClient = new CloudinaryClient();
      const createImagesDatabase: createImagesBulk[] = [];

      const getApartmentsRepository = new GetApartmentsRepository();

      const apartmentFound =
        await getApartmentsRepository.getApartmentById(apartmentId);

      if (!apartmentFound) {
        throw new Error("Apartment not found");
      }

      if (mainImage) {
        const urlResponse = await cloudinaryClient.uploadImage(
          mainImage.buffer,
        );
        createImagesDatabase.push({
          image_type: ImageType.Principal,
          image_name: mainImage.originalname,
          apartment_id: apartmentId,
          url: urlResponse,
        });
      }

      if (thumbImage) {
        const urlResponse = await cloudinaryClient.uploadImage(
          thumbImage.buffer,
        );
        createImagesDatabase.push({
          image_type: ImageType.Thumb,
          image_name: thumbImage.originalname,
          apartment_id: apartmentId,
          url: urlResponse,
        });
      }

      if (images) {
        for (const image of images) {
          const urlResponse = await cloudinaryClient.uploadImage(image.buffer);
          createImagesDatabase.push({
            image_type: ImageType.Rooms,
            image_name: image.originalname,
            apartment_id: apartmentId,
            url: urlResponse,
          });
        }
      }

      const response = await new CreateApartmentImagesRepository().create(
        createImagesDatabase,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
