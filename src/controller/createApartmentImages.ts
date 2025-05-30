import { Request, Response } from "express";
import CreateApartmentImagesUseCase from "../useCase/apartaments/createApartmentImages.js";
import HeadersResponseHelper from "../utils/headerResponse.js";

async function createApartmentImagesController(req: Request, res: Response) {
  try {
    const files = Object(req.files);
    const imagesFileRequest = files?.images as {
      buffer: Buffer;
      originalname: string;
    }[];

    const mainImageFileRequest =
      (files?.main?.length > 0 &&
        (files?.main[0] as {
          buffer: Buffer;
          originalname: string;
        })) ||
      undefined;

    const thumbImageFileRequest =
      (files?.thumb?.length > 0 &&
        (files?.thumb[0] as {
          buffer: Buffer;
          originalname: string;
        })) ||
      undefined;
    const apartmentId = Number(req.params.apartmentId);

    if (!apartmentId) {
      throw Error("Send ApartmentId as a number");
    }

    if (!imagesFileRequest && !mainImageFileRequest && !thumbImageFileRequest) {
      throw Error("Send images or/and main as multpart/form-data");
    }

    const apartmentImages = await new CreateApartmentImagesUseCase().execute(
      apartmentId,
      imagesFileRequest,
      mainImageFileRequest,
      thumbImageFileRequest,
    );

    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders());

    res.status(200).send(apartmentImages);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Unexpected Error", details: error?.message });
  }
}

export { createApartmentImagesController };
