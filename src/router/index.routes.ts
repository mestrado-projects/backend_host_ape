import { Router } from "express";
import apartmentsRouter from "./apartments.routes";

const router = Router();

router.use(apartmentsRouter);

export default router;
