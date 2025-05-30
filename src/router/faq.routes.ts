import { Router } from "express"
import {
  createFAQController,
  getFAQsController,
  updateFAQController,
  deleteFAQController,
} from "../controller/faqController.js"

const faqRouter = Router()

faqRouter.post("/faq", createFAQController)
faqRouter.get("/faq", getFAQsController)
faqRouter.put("/faq/:id", updateFAQController)
faqRouter.delete("/faq/:id", deleteFAQController)

export default faqRouter
