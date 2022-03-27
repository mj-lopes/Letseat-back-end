import { Router } from "express";
import rc from "../controller/receita.controller";

const routerReceitas = Router();

// routerReceitas.post("/", rc.salvarReceitas);
routerReceitas.get("/", rc.pegarTodasReceitas);
routerReceitas.post("/ingredientes", rc.pesquisarPorIngredientes);
routerReceitas.get("/categoria/:categoria", rc.pesquisarPorCategoria);
routerReceitas.get("/receitas/:nomeReceita", rc.pesquisarPorNome);
// routerReceitas.get("/receita/:idReceita", rc.pegarReceitaPeloID);

export default routerReceitas;
