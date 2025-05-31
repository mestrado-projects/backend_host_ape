import { Router } from "express"
import {
  createBookingController,
  getBookingsController,
  getBookingByIdController,
  updateBookingController,
  deleteBookingController,
} from "../controller/bookingsController.js"
import tokenValidateMiddleware from "../middlewares/tokenValidateMiddleware.js"
import { requireAdmin, requireAnyRole } from "../middlewares/roleValidateMiddleware.js"

const bookingsRouter = Router()

bookingsRouter.post("/bookings", tokenValidateMiddleware, requireAdmin(), createBookingController)
bookingsRouter.get("/bookings", tokenValidateMiddleware, requireAdmin(), getBookingsController)
bookingsRouter.get("/bookings/:id", tokenValidateMiddleware, requireAnyRole(), getBookingByIdController)
bookingsRouter.put("/bookings/:id", tokenValidateMiddleware, requireAnyRole(), updateBookingController)
bookingsRouter.delete("/bookings/:id", tokenValidateMiddleware, requireAdmin(), deleteBookingController)

export default bookingsRouter
