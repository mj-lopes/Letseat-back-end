import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { receita, receitaModel } from "../database/model/receitaSchema";

class Receita {
  async pegarTodasReceitas(
    req: Request<{ page: string; limite: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      let page = 1;
      let limite = 12;

      if (req.query && req.query.page && typeof req.query.page === "string") {
        page = Number.parseInt(req.query.page);
      }

      if (
        req.query &&
        req.query.limite &&
        typeof req.query.limite === "string"
      ) {
        limite = Number.parseInt(req.query.limite);
      }

      const respostaQuery = await receitaModel
        .find()
        .skip(limite * (page - 1))
        .limit(limite)
        .exec();

      if (!respostaQuery.length) {
        res.sendStatus(StatusCodes.NO_CONTENT);
        return;
      }

      res.status(StatusCodes.OK).send({ respostaQuery });
    } catch (err) {
      console.log(err);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // async salvarReceita(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<void> {
  //   try {
  //     const novaReceita: receita[] = receitas;
  //     await receitaModel.insertMany(novaReceita);

  //     res.sendStatus(StatusCodes.CREATED);
  //   } catch (err) {
  //     console.log(err);
  //     res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  //   }
  // }

  async pegarReceitaPeloNome(
    req: Request<{ nomeReceita: string; limite: string; page: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const nomeReceita = req.params.nomeReceita;
      let page = 1;
      let limite = 12;

      if (req.query && req.query.page && typeof req.query.page === "string") {
        page = Number.parseInt(req.query.page);
      }

      if (
        req.query &&
        req.query.limite &&
        typeof req.query.limite === "string"
      ) {
        limite = Number.parseInt(req.query.limite);
      }

      const termosBusca = nomeReceita.split("+").map((termo) => {
        const rgx = new RegExp(termo, "i");
        return { titulo: rgx };
      });

      const respostaQuery = await receitaModel
        .find({ $and: termosBusca })
        .skip(limite * (page - 1))
        .limit(limite)
        .exec();

      if (!respostaQuery.length) {
        res.sendStatus(StatusCodes.NO_CONTENT);
        return;
      }

      res.status(StatusCodes.OK).send({ respostaQuery });
    } catch (err) {
      console.log(err);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async pegarReceitaPorIngredientes(
    req: Request<{ page: string; limite: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { ingredientes } = req.body;

      let page = 1;
      let limite = 12;

      if (req.query && req.query.page && typeof req.query.page === "string") {
        page = Number.parseInt(req.query.page);
      }

      if (
        req.query &&
        req.query.limite &&
        typeof req.query.limite === "string"
      ) {
        limite = Number.parseInt(req.query.limite);
      }

      const arrIngredientesPesquisa: any[] = ingredientes.map(
        (ingrediente: string) => {
          const rgx = new RegExp(ingrediente, "i");
          return { ingredientes: rgx };
        },
      );

      const respostaQuery = await receitaModel
        .find({
          $and: arrIngredientesPesquisa,
        })
        .skip(limite * (page - 1))
        .limit(limite)
        .exec();

      if (!respostaQuery.length) {
        res.sendStatus(StatusCodes.NO_CONTENT);
        return;
      }

      res.status(StatusCodes.OK).send({ respostaQuery });
    } catch (err) {
      console.log(err);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new Receita();
