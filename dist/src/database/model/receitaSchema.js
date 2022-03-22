"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receitaModel = void 0;
const mongoose_1 = require("mongoose");
const receitaSchema = new mongoose_1.Schema({
    titulo: { required: true, type: String },
    preparo: { required: true, type: String },
    rendimento: { required: true, type: String },
    ingredientes: { required: true, type: [String] },
    instrucoes: { required: true, type: [String] },
    imgUrl: { required: false, type: String },
    classificacao: { required: true, type: [String] },
});
exports.receitaModel = (0, mongoose_1.model)("receitas", receitaSchema);
