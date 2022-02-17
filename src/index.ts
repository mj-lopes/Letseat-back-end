import express, { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import cors from "cors";
import database from "./database";
import receitas from "../receitas.json";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5000;

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const receita = receitas;

  res.status(StatusCodes.OK).send({ receita: receita[0] });
});

database.connect();

app.listen(port, () => console.log("App rodando na porta 5000"));
