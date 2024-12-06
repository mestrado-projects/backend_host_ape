import { Request, Response } from "express";
import { Guests } from "../models/index.js";
import SignUpGuestUseCase from "../useCase/signUpGuest.js";
import SignInGuestUseCase from "../useCase/signInGuest.js";
import HeadersResponseHelper from "../utils/headerResponse.js";

async function signUpController(req: Request, res: Response) {
  try {
    const user: Guests = req.body;

    await new SignUpGuestUseCase().execute(user);
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders());

    res.sendStatus(201);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Unexpected Error", details: error?.message });
  }
}

async function signInController(req: Request, res: Response) {
  try {
    const user: Guests = req.body;

    const token = await new SignInGuestUseCase().execute(user);
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders());

    res.status(200).send({ token });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Unexpected Error", details: error?.message });
  }
}

export { signInController, signUpController };
