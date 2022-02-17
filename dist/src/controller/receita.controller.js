"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const receitaSchema_1 = require("../database/model/receitaSchema");
class Receita {
    async pegarTodasReceitas(req, res, next) {
        try {
            const respostaQuery = await receitaSchema_1.receitaModel.find().exec();
            res.status(http_status_codes_1.StatusCodes.OK).send({ respostaQuery });
        }
        catch (err) {
            console.log(err);
            res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
    async pegarReceitaPeloNome(req, res, next) {
        try {
            const { nomeReceita } = req.params;
            const respostaQuery = await receitaSchema_1.receitaModel
                .find({ titulo: { $regex: nomeReceita, $options: "i" } })
                .exec();
            res.status(http_status_codes_1.StatusCodes.ACCEPTED).send(respostaQuery);
        }
        catch (err) {
            console.log(err);
            res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.default = new Receita();
