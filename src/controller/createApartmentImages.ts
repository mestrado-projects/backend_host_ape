import { Request, Response } from "express";
import CreateApartmentImagesUseCase from "../useCase/createApartmentImages.js";
import HeadersResponseHelper from "../utils/headerResponse.js";

async function createApartmentImagesController(req: Request, res: Response) {
  try {
    const imagesFileRequest = Object(req.files)?.images as {
      buffer: Buffer;
      originalname: string;
    }[];

    const mainImageFileRequest = Object(req.files)?.main[0] as {
      buffer: Buffer;
      originalname: string;
    };

    const apartmentId = Number(req.params.apartmentId);

    if (!apartmentId) {
      throw Error("Send ApartmentId as a number");
    }

    if (!imagesFileRequest || !mainImageFileRequest) {
      throw Error("Send images or/and main as multpart/form-data");
    }

    const imagesBuffers = [...imagesFileRequest].map(
      (file) => file?.buffer || [],
    );
    const mainBuffer = mainImageFileRequest?.buffer;

    if (!imagesBuffers || !mainBuffer) {
      throw Error("There is a problem in your request, send images");
    }

    const apartmentImages = await new CreateApartmentImagesUseCase().execute(
      apartmentId,
      imagesFileRequest,
      mainImageFileRequest,
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
