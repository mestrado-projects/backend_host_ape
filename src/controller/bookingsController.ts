import type { Request, Response } from "express"
import CreateBookingUseCase from "../useCase/bookings/createBooking.js"
import GetBookingsUseCase from "../useCase/bookings/getBookings.js"
import GetBookingByIdUseCase from "../useCase/bookings/getBookingById.js"
import UpdateBookingUseCase from "../useCase/bookings/updateBooking.js"
import DeleteBookingUseCase from "../useCase/bookings/deleteBooking.js"
import HeadersResponseHelper from "../utils/headerResponse.js"

async function createBookingController(req: Request, res: Response) {
  try {
    const booking = await new CreateBookingUseCase().execute(req.body)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(201).send(booking)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function getBookingsController(req: Request, res: Response) {
  try {
    const bookings = await new GetBookingsUseCase().execute()
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send(bookings)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function getBookingByIdController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)
    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid booking Id ${req.params?.id}`,
      })
      return
    }

    const booking = await new GetBookingByIdUseCase().execute(id)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send(booking)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function updateBookingController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)
    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid booking Id ${req.params?.id}`,
      })
      return
    }

    const message = await new UpdateBookingUseCase().execute(id, req.body)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send({ message })
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function deleteBookingController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)
    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid booking Id ${req.params?.id}`,
      })
      return
    }

    const message = await new DeleteBookingUseCase().execute(id)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send({ message })
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

export {
  createBookingController,
  getBookingsController,
  getBookingByIdController,
  updateBookingController,
  deleteBookingController,
}
