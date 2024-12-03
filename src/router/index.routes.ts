import { Request, Response, Router } from "express";
import apartmentsRouter from "./apartments.routes.js";
import authGuestRouter from "./auth.routes.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "healthy" });
});
router.use(apartmentsRouter);
router.use(authGuestRouter);

export default router;
