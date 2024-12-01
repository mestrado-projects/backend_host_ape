import { Request, Response } from "express";
import GetApartmentUseCase from "../useCase/getApartment";

async function getApartmentsController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id);

    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid apartment Id ${req.params?.id}`,
      });
      return;
    }

    const apartments = await new GetApartmentUseCase().execute(id);
    res.json(apartments);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Unexpected Error", details: error?.message });
  }
}

export { getApartmentsController };
