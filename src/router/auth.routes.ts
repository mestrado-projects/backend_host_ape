import { Router } from "express";
import {
  deleteGuestController,
  getGuestController,
  signInController,
  signUpController,
  updateGuestController,
} from "../controller/authGuestController.js";

const authGuestRouter = Router();

authGuestRouter.post("/guests/sign-up", signUpController);
authGuestRouter.post("/guests/sign-in", signInController);
authGuestRouter.get("/guest/:id", getGuestController);
authGuestRouter.put("/guest/:id", updateGuestController);
authGuestRouter.delete("/guest/:id", deleteGuestController);

export default authGuestRouter;
