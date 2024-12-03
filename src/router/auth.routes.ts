import { Router } from "express";
import {
  signInController,
  signUpController,
} from "../controller/authGuestController.js";

const authGuestRouter = Router();

authGuestRouter.post("/guests/sign-up", signUpController);
authGuestRouter.post("/guests/sign-in", signInController);

export default authGuestRouter;
