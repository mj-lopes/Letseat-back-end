import express from "express";
import rc from "./controller/receita.controller";

import cors from "cors";
import database from "./database";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5000;

app.get("/", rc.pegarTodasReceitas);
app.post("/", rc.pegarReceitaPorIngredientes);

// app.post("/:nomeReceita", rc.pegarReceitaPeloNome);

database.connect();

app.listen(port, () => console.log("App rodando na porta 5000"));
