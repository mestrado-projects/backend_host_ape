import express, { Request, Response } from "express";
import sequelize from "./database/connection";
import Apartment from "./models/apartment";

const app = express();
const port = 3000;

sequelize
  .authenticate()
  .then(() => console.log("Conectado ao banco de dados com sucesso!"))
  .catch((err) => console.error("Erro ao conectar ao banco:", err));

sequelize.sync();

app.get("/apartments", async (req: Request, res: Response) => {
  try {
    const apartments = await Apartment.findAll();
    res.json(apartments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar apartamentos");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
