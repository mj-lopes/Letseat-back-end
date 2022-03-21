require("dotenv").config();
import express from "express";
import cors from "cors";

import rc from "./controller/receita.controller";
import database from "./database";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", rc.pegarTodasReceitas);
app.post("/", rc.pegarReceitaPorIngredientes);
app.post("/:nomeReceita", rc.pegarReceitaPeloNome);

database.connect();

const door = process.env.PORT || 3030;
app.listen(door, () => console.log(`App rodando na porta ${door}`));
