import { type Request, type Response, Router } from "express"
import apartmentsRouter from "./apartments.routes.js"
import authGuestRouter from "./auth.routes.js"
import bookingsRouter from "./bookings.routes.js"
import faqRouter from "./faq.routes.js"
import swaggerUi from "swagger-ui-express"
import { swaggerDefinition } from "../setup.js"
import testimonialsRouter from "./testimonials.routes.js"
import itineraryRouter from "./itinerary.routes.js"

const router = Router()

router.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "healthy" })
})
router.use(apartmentsRouter)
router.use(authGuestRouter)
router.use(bookingsRouter)
router.use(faqRouter)
router.use(testimonialsRouter)
router.use(itineraryRouter)
router.use("/api-docs", swaggerUi.serve)
router.get("/api-docs", swaggerUi.setup(swaggerDefinition))

export default router
