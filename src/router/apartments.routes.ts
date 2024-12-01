import { Router } from "express";
import { createApartmentsController } from "../controller/createApartmentsController";
import validateSchemaMiddleware from "../middlewares/schemaValidateMiddleware";
import { createApartmentSchema } from "../schemas/createApartmentSchema";

const apartmentsRouter = Router();

apartmentsRouter.post(
  "/apartments",
  validateSchemaMiddleware(createApartmentSchema),
  createApartmentsController,
);

export default apartmentsRouter;
