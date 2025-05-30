import type { Request, Response } from "express"
import CreateFAQUseCase from "../useCase/faq/createFAQ.js"
import GetFAQsUseCase from "../useCase/faq/getFAQs.js"
import UpdateFAQUseCase from "../useCase/faq/updateFAQ.js"
import DeleteFAQUseCase from "../useCase/faq/deleteFAQ.js"
import HeadersResponseHelper from "../utils/headerResponse.js"

async function createFAQController(req: Request, res: Response) {
  try {
    const faq = await new CreateFAQUseCase().execute(req.body)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(201).send(faq)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function getFAQsController(req: Request, res: Response) {
  try {
    const activeOnly = req.query.active === "true"
    const faqs = await new GetFAQsUseCase().execute(activeOnly)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send(faqs)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function updateFAQController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)
    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid FAQ Id ${req.params?.id}`,
      })
      return
    }

    const message = await new UpdateFAQUseCase().execute(id, req.body)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send({ message })
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function deleteFAQController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)
    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid FAQ Id ${req.params?.id}`,
      })
      return
    }

    const message = await new DeleteFAQUseCase().execute(id)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send({ message })
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

export { createFAQController, getFAQsController, updateFAQController, deleteFAQController }
