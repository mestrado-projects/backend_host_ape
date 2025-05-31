import type { Request, Response } from "express"
import CreateTestimonialUseCase from "../useCase/testimonials/createTestimonial.js"
import GetTestimonialsUseCase from "../useCase/testimonials/getTestimonial.js"
import GetTestimonialByIdUseCase from "../useCase/testimonials/getTestimonialById.js"
import UpdateTestimonialUseCase from "../useCase/testimonials/updateTestimonial.js"
import DeleteTestimonialUseCase from "../useCase/testimonials/deleteTestimonial.js"
import HeadersResponseHelper from "../utils/headerResponse.js"

async function createTestimonialController(req: Request, res: Response) {
  try {
    const testimonial = await new CreateTestimonialUseCase().execute(req.body)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(201).send(testimonial)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function getTestimonialsController(req: Request, res: Response) {
  try {
    const activeOnly = req.query.active === "true"
    const featuredOnly = req.query.featured === "true"
    const testimonials = await new GetTestimonialsUseCase().execute(activeOnly, featuredOnly)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send(testimonials)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function getTestimonialByIdController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)
    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid testimonial Id ${req.params?.id}`,
      })
      return
    }

    const testimonial = await new GetTestimonialByIdUseCase().execute(id)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send(testimonial)
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function updateTestimonialController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)
    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid testimonial Id ${req.params?.id}`,
      })
      return
    }

    const message = await new UpdateTestimonialUseCase().execute(id, req.body)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send({ message })
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

async function deleteTestimonialController(req: Request, res: Response) {
  try {
    const id = Number(req.params?.id)
    if (!id) {
      res.status(400).json({
        message: "Bad Request",
        details: `Invalid testimonial Id ${req.params?.id}`,
      })
      return
    }

    const message = await new DeleteTestimonialUseCase().execute(id)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(200).send({ message })
  } catch (error: any) {
    console.error(error)
    res.setHeaders(HeadersResponseHelper.getInstance().getDefaultHeaders())
    res.status(500).send({ message: "Unexpected Error", details: error?.message })
  }
}

export {
  createTestimonialController,
  getTestimonialsController,
  getTestimonialByIdController,
  updateTestimonialController,
  deleteTestimonialController,
}
