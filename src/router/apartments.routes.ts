import { Router } from "express";
import { createApartmentsController } from "../controller/createApartmentsController.js";
import validateSchemaMiddleware from "../middlewares/schemaValidateMiddleware.js";
import { createApartmentSchema } from "../schemas/createApartmentSchema.js";
import { getApartmentsController } from "../controller/getApartmentControlle.js";
import { fetchApartmentsController } from "../controller/fetchApartmentsController.js";
import { createApartmentImagesController } from "../controller/createApartmentImages.js";
import upload from "../services/multerConfig.js";

const apartmentsRouter = Router();

apartmentsRouter.post(
  "/apartments",
  validateSchemaMiddleware(createApartmentSchema),
  createApartmentsController,
);
apartmentsRouter.get("/apartments", fetchApartmentsController);
apartmentsRouter.get("/apartments/:id", getApartmentsController);
apartmentsRouter.post(
  "/apartments/:apartmentId/images/",
  upload.fields([
    { name: "main", maxCount: 1 },
    { name: "images", maxCount: 30 },
  ]),
  createApartmentImagesController,
);

export default apartmentsRouter;
