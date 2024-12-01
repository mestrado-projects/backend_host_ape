import { Request, Response } from "express";
import FetchApartmentUseCase from "../useCase/fetchApartment.js";

async function fetchApartmentsController(req: Request, res: Response) {
  try {
    const apartments = await new FetchApartmentUseCase().execute();
    res.json(apartments);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Unexpected Error", details: error?.message });
  }
}

export { fetchApartmentsController };
