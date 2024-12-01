import { Request, Response } from "express";
import CreateApartmentUseCase from "../useCase/createApartment";

async function createApartmentsController(req: Request, res: Response) {
  try {
    const apartments = await new CreateApartmentUseCase().execute(req.body);
    res.json(apartments);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Unexpected Error", details: error?.message });
  }
}

export { createApartmentsController };
