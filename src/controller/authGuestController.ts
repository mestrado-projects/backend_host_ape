import { Request, Response } from "express";
import { Guests } from "../models/index.js";
import SignUpGuestUseCase from "../useCase/signUpGuest.js";
import SignInGuestUseCase from "../useCase/signInGuest.js";

async function signUpController(req: Request, res: Response) {
  const user: Guests = req.body;

  await new SignUpGuestUseCase().execute(user);

  res.sendStatus(201);
}

async function signInController(req: Request, res: Response) {
  const user: Guests = req.body;

  const token = await new SignInGuestUseCase().execute(user);

  res.send({ token });
}

export { signInController, signUpController };
