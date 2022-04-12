import { Router } from "express";
import rc from "../controller/receita.controller";

const routerReceitas = Router();

// routerReceitas.post("/", rc.salvarReceitas);
routerReceitas.get("/", rc.pegarTodasReceitas);
routerReceitas.post("/ingredientes", rc.pesquisarPorIngredientes);
routerReceitas.post("/categoria/:categoria", rc.pesquisarPorCategoria);
routerReceitas.post("/receitas/:nomeReceita", rc.pesquisarPorNome);
routerReceitas.post("/receita/:idReceita", rc.pegarReceitasPorId);

export default routerReceitas;
