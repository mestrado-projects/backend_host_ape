import express, { Request, Response } from "express";
import { Apartments } from "./models/index.js";
import dotenv from "dotenv";
import router from "./router/index.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

app.get("/apartments", async (req: Request, res: Response) => {
  try {
    const apartments = await Apartments.findAll();
    res.json(apartments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar apartamentos");
  }
});

export default app;
