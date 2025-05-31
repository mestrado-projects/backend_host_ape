import express, { Request, Response } from "express";
import { Apartments } from "./models/index.js";
import dotenv from "dotenv";
import router from "./router/index.routes.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(router);

export default app;
