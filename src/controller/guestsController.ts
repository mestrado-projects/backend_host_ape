import type { Request, Response } from "express"
import CreateGuestProfileUseCase from "../useCase/guests/createGuestProfile.js"
import HeadersResponseHelper from "../utils/headerResponse.js"
import guestsRepository from "../repositories/guestsRepository.js"

async function createGuestProfileController(req: Request, res: Response) {
  try {
    const user = res.locals.user
    const guestData = req.body

    const guest = await new CreateGuestProfileUseCase().execute(user.id, guestData)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(201).send(guest)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function getGuestProfileController(req: Request, res: Response) {
  try {
    const user = res.locals.user

    const guest = await guestsRepository.findByUserId(user.id)
    if (!guest) {
      return res.status(404).json({ message: "Guest profile not found" })
    }

    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send(guest)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function updateGuestProfileController(req: Request, res: Response) {
  try {
    const user = res.locals.user
    const newData = req.body

    const guest = await guestsRepository.findByUserId(user.id)
    if (!guest) {
      return res.status(404).json({ message: "Guest profile not found" })
    }

    await guestsRepository.updateById(guest.id, newData)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(200).send({ message: "Guest profile updated successfully" })
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())

    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

export { createGuestProfileController, getGuestProfileController, updateGuestProfileController }
