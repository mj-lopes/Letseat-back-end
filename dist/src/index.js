"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const receita_controller_1 = __importDefault(require("./controller/receita.controller"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = 5000;
app.get("/", receita_controller_1.default.pegarTodasReceitas);
app.post("/", receita_controller_1.default.pegarReceitaPorIngredientes);
app.post("/:nomeReceita", receita_controller_1.default.pegarReceitaPeloNome);
database_1.default.connect();
app.listen(port, () => console.log("App rodando na porta 5000"));
