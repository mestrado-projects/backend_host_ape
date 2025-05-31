import { Router } from "express";
import { createApartmentsController } from "../controller/createApartmentsController.js";
import validateSchemaMiddleware from "../middlewares/schemaValidateMiddleware.js";
import { createApartmentSchema } from "../schemas/createApartmentSchema.js";
import { getApartmentsController } from "../controller/getApartmentControlle.js";
import { fetchApartmentsController } from "../controller/fetchApartmentsController.js";
import { createApartmentImagesController } from "../controller/createApartmentImages.js";
import upload from "../services/multerConfig.js";
import tokenValidateMiddleware from "../middlewares/tokenValidateMiddleware.js";
import { requireAdmin } from "../middlewares/roleValidateMiddleware.js";

const apartmentsRouter = Router();

apartmentsRouter.post(
  "/apartments",
  tokenValidateMiddleware,
  requireAdmin(),
  validateSchemaMiddleware(createApartmentSchema),
  createApartmentsController,
);
apartmentsRouter.post(
  "/apartments/:apartmentId/images/",
  tokenValidateMiddleware,
  requireAdmin(),
  upload.fields([
    { name: "main", maxCount: 1 },
    { name: "thumb", maxCount: 1 },
    { name: "images", maxCount: 30 },
  ]),
  createApartmentImagesController,
);
apartmentsRouter.get("/apartments", fetchApartmentsController);
apartmentsRouter.get("/apartments/:id", getApartmentsController);

export default apartmentsRouter;
