require("dotenv").config();
import express from "express";
import cors from "cors";

import routerReceitas from "./routes/receitas.route";
import routerStatus from "./routes/status.route";
import database from "./database";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

database.connect();

app.use(routerReceitas);
app.use(routerStatus);

const door = process.env.PORT || 3030;
app.listen(door, () => console.log(`App rodando na porta ${door}`));
