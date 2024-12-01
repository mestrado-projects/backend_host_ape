import { Router } from "express";
import apartmentsRouter from "./apartments.routes.js";
const router = Router();
router.get("/", (req, res) => {
    res.status(200).send({ message: "healthy" });
});
router.use(apartmentsRouter);
export default router;
