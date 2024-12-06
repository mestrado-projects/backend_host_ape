import { Request, Response } from "express";
import { Guests } from "../models/index.js";
import SignUpGuestUseCase from "../useCase/signUpGuest.js";
import SignInGuestUseCase from "../useCase/signInGuest.js";
import HeadersResponseHelper from "../utils/headerResponse.js";
import DeleteGuestUseCase from "../useCase/deleteGuest.js";
import UpdateGuestUseCase from "../useCase/updateGuest.js";
import GetGuestUseCase from "../useCase/getGuest.js";

async function signUpController(req: Request, res: Response) {
  try {
    const user: Guests = req.body;

    await new SignUpGuestUseCase().execute(user);
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders());

    res.sendStatus(201);
  } catch (error: any) {
    console.error(error);
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders());

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
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders());

    res
      .status(500)
      .send({ message: "Unexpected Error", details: error?.message });
  }
}

async function deleteGuestController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id);

    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid guest Id ${req.params?.id}`,
      });
      return;
    }

    const message = await new DeleteGuestUseCase().execute(id);
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders());

    res.status(200).send({ message });
  } catch (error: any) {
    console.error(error);
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders());

    res
      .status(500)
      .send({ message: "Unexpected Error", details: error?.message });
  }
}

async function updateGuestController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id);
    const newData = req.body;

    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid guest Id ${req.params?.id}`,
      });
      return;
    }

    const message = await new UpdateGuestUseCase().execute(id, newData);
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders());

    res.status(200).send({ message });
  } catch (error: any) {
    console.error(error);
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders());

    res
      .status(500)
      .send({ message: "Unexpected Error", details: error?.message });
  }
}

async function getGuestController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id);

    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid guest Id ${req.params?.id}`,
      });
      return;
    }

    const user = await new GetGuestUseCase().execute(id);
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders());

    res.status(200).send({ ...user });
  } catch (error: any) {
    console.error(error);
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders());

    res
      .status(500)
      .send({ message: "Unexpected Error", details: error?.message });
  }
}

export {
  signInController,
  signUpController,
  deleteGuestController,
  updateGuestController,
  getGuestController,
};
