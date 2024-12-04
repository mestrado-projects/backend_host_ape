import { ApartmentsImages, ImageType } from "../models/index.js";

export type createImagesBulk = {
  image_type: ImageType;
  image_name: string;
  url: string;
  apartment_id: number;
};

export class CreateApartmentImagesRepository {
  public async create(imagesUrl: createImagesBulk[]) {
    try {
      const createdImages = await ApartmentsImages.bulkCreate(imagesUrl);
      return createdImages;
    } catch (error) {
      throw error;
    }
  }
}
