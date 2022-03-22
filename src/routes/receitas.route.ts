import { Router } from "express";
import rc from "../controller/receita.controller";

const routerReceitas = Router();

routerReceitas.get("/", rc.pegarTodasReceitas);
routerReceitas.post("/", rc.pegarReceitaPorIngredientes);
routerReceitas.post("/:nomeReceita", rc.pegarReceitaPeloNome);

export default routerReceitas;
