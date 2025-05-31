import type { Request, Response } from "express"
import CreateItineraryUseCase from "../useCase/itinerary/createItinerary.js"
import GetItinerariesUseCase from "../useCase/itinerary/getItineraries.js"
import GetItineraryByIdUseCase from "../useCase/itinerary/getItineraryById.js"
import UpdateItineraryUseCase from "../useCase/itinerary/updateItinerary.js"
import DeleteItineraryUseCase from "../useCase/itinerary/deleteItinerary.js"
import HeadersResponseHelper from "../utils/headerResponse.js"

async function createItineraryController(req: Request, res: Response) {
  try {
    const itinerary = await new CreateItineraryUseCase().execute(req.body)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(201).send(itinerary)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function getItinerariesController(req: Request, res: Response) {
  try {
    const activeOnly = req.query.active === "true"
    const location = req.query.location as string
    const itineraries = await new GetItinerariesUseCase().execute(activeOnly, location)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send(itineraries)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function getItineraryByIdController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)
    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid itinerary Id ${req.params?.id}`,
      })
      return
    }

    const itinerary = await new GetItineraryByIdUseCase().execute(id)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send(itinerary)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function updateItineraryController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)
    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid itinerary Id ${req.params?.id}`,
      })
      return
    }

    const message = await new UpdateItineraryUseCase().execute(id, req.body)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send({ message })
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function deleteItineraryController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)
    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid itinerary Id ${req.params?.id}`,
      })
      return
    }

    const message = await new DeleteItineraryUseCase().execute(id)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send({ message })
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

export {
  createItineraryController,
  getItinerariesController,
  getItineraryByIdController,
  updateItineraryController,
  deleteItineraryController,
}
