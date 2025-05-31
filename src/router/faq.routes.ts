import { Router } from "express"
import {
  createFAQController,
  getFAQsController,
  updateFAQController,
  deleteFAQController,
} from "../controller/faqController.js"
import tokenValidateMiddleware from "../middlewares/tokenValidateMiddleware.js"
import { requireAdmin } from "../middlewares/roleValidateMiddleware.js"

const faqRouter = Router()

faqRouter.post("/faq", tokenValidateMiddleware, requireAdmin(), createFAQController)
faqRouter.get("/faq", getFAQsController)
faqRouter.put("/faq/:id", updateFAQController)
faqRouter.delete("/faq/:id", deleteFAQController)

export default faqRouter
