import { Request, Response } from "express";
import GetApartmentUseCase from "../useCase/getApartment";

async function getApartmentsController(req: Request, res: Response) {
  try {
    const id = req.params;
    console.log("log id", id);

    const apartments = await new GetApartmentUseCase().execute(1);
    res.json(apartments);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Unexpected Error", details: error?.message });
  }
}

export { getApartmentsController };
