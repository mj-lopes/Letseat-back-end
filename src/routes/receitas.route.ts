import { Router } from "express";
import rc from "../controller/receita.controller";

const routerReceitas = Router();

// routerReceitas.get("/save", rc.salvarReceitas);
routerReceitas.post("/receitas", rc.pegarTodasReceitas);
routerReceitas.post("/busca/ingredientes", rc.pesquisarPorIngredientes);
routerReceitas.post("/busca/:nomeReceita", rc.pesquisarPorNome);
routerReceitas.post("/receitas/categoria/:categoria", rc.pesquisarPorCategoria);
routerReceitas.get("/receitas/receita/:idReceita", rc.pegarReceitasPorId);

export default routerReceitas;
