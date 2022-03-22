"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const receitaSchema_1 = require("../database/model/receitaSchema");
class Receita {
    async pegarTodasReceitas(req, res, next) {
        try {
            let page = 1;
            let limite = 12;
            if (req.query && req.query.page && typeof req.query.page === "string") {
                page = Number.parseInt(req.query.page);
            }
            if (req.query &&
                req.query.limite &&
                typeof req.query.limite === "string") {
                limite = Number.parseInt(req.query.limite);
            }
            const respostaQuery = await receitaSchema_1.receitaModel
                .find()
                .skip(limite * (page - 1))
                .limit(limite)
                .exec();
            res.status(http_status_codes_1.StatusCodes.OK).send({ respostaQuery });
        }
        catch (err) {
            console.log(err);
            res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
    async pegarReceitaPeloNome(req, res, next) {
        try {
            const nomeReceita = req.params.nomeReceita;
            let page = 1;
            let limite = 12;
            if (req.query && req.query.page && typeof req.query.page === "string") {
                page = Number.parseInt(req.query.page);
            }
            if (req.query &&
                req.query.limite &&
                typeof req.query.limite === "string") {
                limite = Number.parseInt(req.query.limite);
            }
            const termosBusca = nomeReceita.split("+").map((termo) => {
                const rgx = new RegExp(termo, "i");
                return { titulo: rgx };
            });
            const respostaQuery = await receitaSchema_1.receitaModel
                .find({ $and: termosBusca })
                .skip(limite * (page - 1))
                .limit(limite)
                .exec();
            res.status(http_status_codes_1.StatusCodes.ACCEPTED).send(respostaQuery);
        }
        catch (err) {
            console.log(err);
            res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
    async pegarReceitaPorIngredientes(req, res, next) {
        const { ingredientes } = req.body;
        let page = 1;
        let limite = 12;
        if (req.query && req.query.page && typeof req.query.page === "string") {
            page = Number.parseInt(req.query.page);
        }
        if (req.query && req.query.limite && typeof req.query.limite === "string") {
            limite = Number.parseInt(req.query.limite);
        }
        const arrIngredientesPesquisa = ingredientes.map((ingrediente) => {
            const rgx = new RegExp(ingrediente, "i");
            return { ingredientes: rgx };
        });
        const resultadoQuery = await receitaSchema_1.receitaModel
            .find({
            $and: arrIngredientesPesquisa,
        })
            .skip(limite * (page - 1))
            .limit(limite)
            .exec();
        res.status(200).send(resultadoQuery);
    }
}
exports.default = new Receita();
