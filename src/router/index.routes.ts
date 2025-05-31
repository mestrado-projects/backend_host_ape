import { Request, Response, Router } from "express";
import apartmentsRouter from "./apartments.routes.js";
import authGuestRouter from "./auth.routes.js";
import bookingsRouter from "./bookings.routes.js";
import faqRouter from "./faq.routes.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "healthy" });
});
router.use(apartmentsRouter);
router.use(authGuestRouter);
router.use(bookingsRouter)
router.use(faqRouter)

export default router;
