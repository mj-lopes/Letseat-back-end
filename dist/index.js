"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = 5000;
app.get("/", async (req, res, next) => {
    const receita = await fetch("../receitas.json");
    console.log(receita);
    res.status(http_status_codes_1.default.OK).send({ ok: "Tudo ok!" });
});
database_1.default.connect();
app.listen(port, () => console.log("App rodando na porta 5000"));
