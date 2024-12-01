import { Router } from "express";
import { createApartmentsController } from "../controller/createApartmentsController";
import validateSchemaMiddleware from "../middlewares/schemaValidateMiddleware";
import { createApartmentSchema } from "../schemas/createApartmentSchema";
import { getApartmentsController } from "../controller/getApartmentControlle";
import { fetchApartmentsController } from "../controller/fetchApartmentsController";

const apartmentsRouter = Router();

apartmentsRouter.post(
  "/apartments",
  validateSchemaMiddleware(createApartmentSchema),
  createApartmentsController,
);
apartmentsRouter.get("/apartments", fetchApartmentsController);
apartmentsRouter.get("/apartments/:id", getApartmentsController);

export default apartmentsRouter;
