import { Router } from "express"
import {
  createBookingController,
  getBookingsController,
  getBookingByIdController,
  updateBookingController,
  deleteBookingController,
} from "../controller/bookingsController.js"

const bookingsRouter = Router()

bookingsRouter.post("/bookings", createBookingController)
bookingsRouter.get("/bookings", getBookingsController)
bookingsRouter.get("/bookings/:id", getBookingByIdController)
bookingsRouter.put("/bookings/:id", updateBookingController)
bookingsRouter.delete("/bookings/:id", deleteBookingController)

export default bookingsRouter
