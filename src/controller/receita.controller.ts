import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { receitaModel } from "../database/model/receitaSchema";
// import receitas from "../../receitas.json";

class Receita {
  async pegarTodasReceitas(
    req: Request<{ page: string; limite: string }>,
    res: Response,
  ): Promise<void> {
    try {
      let page = 1;
      let limite = 12;
      const estrelas = req.body.filtros?.estrelas || 0;
      const tempoMaximoPreparo = req.body.filtros?.tempoMaximoPreparo || 9999;

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

      const filtrosQuery = [
        { classificacao: { $gte: estrelas } },
        { preparo: { $lte: tempoMaximoPreparo } },
      ];

      const respostaQuery = await receitaModel
        .find({ $and: filtrosQuery })
        .skip(limite * (page - 1))
        .limit(limite)
        .exec();

      if (!respostaQuery.length) {
        res.sendStatus(StatusCodes.NO_CONTENT);
        return;
      }

      const totalQuery = await receitaModel.count({ $and: filtrosQuery });

      res.status(StatusCodes.OK).send({ total: totalQuery, respostaQuery });
    } catch (err) {
      console.log(err);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // async salvarReceitas(req: Request, res: Response): Promise<void> {
  //   try {
  //     const novaReceita = receitas;
  //     await receitaModel.insertMany(novaReceita);

  //     res.sendStatus(StatusCodes.CREATED);
  //   } catch (err) {
  //     console.log(err);
  //     res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  //   }
  // }

  async pesquisarPorNome(
    req: Request<{ nomeReceita: string; limite: string; page: string }>,
    res: Response,
  ): Promise<void> {
    try {
      const nomeReceita = req.params.nomeReceita;
      let page = 1;
      let limite = 12;
      const estrelas = req.body.filtros?.estrelas || 0;
      const tempoMaximoPreparo = req.body.filtros?.tempoMaximoPreparo || 9999;

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

      const filtrosQuery = [
        ...termosBusca,
        { classificacao: { $gte: estrelas } },
        { preparo: { $lte: tempoMaximoPreparo } },
      ];

      const respostaQuery = await receitaModel
        .find({ $and: filtrosQuery })
        .skip(limite * (page - 1))
        .limit(limite)
        .exec();

      const totalQuery = await receitaModel.count({ $and: filtrosQuery });

      if (!respostaQuery.length) {
        res.sendStatus(StatusCodes.NO_CONTENT);
        return;
      }

      res.status(StatusCodes.OK).send({ total: totalQuery, respostaQuery });
    } catch (err) {
      console.log(err);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async pesquisarPorIngredientes(
    req: Request<{
      page: string;
      limite: string;
      body: {
        filtros: {
          estrela: number;
          tempoMaximoPreparo: number;
        };
      };
    }>,
    res: Response,
  ): Promise<void> {
    try {
      const { ingredientes } = req.body;
      const estrelas = req.body.filtros?.estrelas || 0;
      const tempoMaximoPreparo = req.body.filtros?.tempoMaximoPreparo || 9999;

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

      const filtrosQuery: any[] = [
        ...arrIngredientesPesquisa,
        { classificacao: { $gte: estrelas } },
        { preparo: { $lte: tempoMaximoPreparo } },
      ];

      const respostaQuery = await receitaModel
        .find({
          $and: filtrosQuery,
        })
        .skip(limite * (page - 1))
        .limit(limite)
        .exec();

      if (!respostaQuery.length) {
        res.sendStatus(StatusCodes.NO_CONTENT);
        return;
      }

      const totalQuery = await receitaModel.count({ $and: filtrosQuery });

      res.status(StatusCodes.OK).send({ total: totalQuery, respostaQuery });
    } catch (err) {
      console.log(err);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async pesquisarPorCategoria(
    req: Request<{ categoria: string }>,
    res: Response,
  ) {
    try {
      const categoria = req.params.categoria.replace(/\+/g, " ");
      const rgxCategoria = new RegExp(categoria, "i");
      const estrelas = req.body.filtros?.estrelas || 0;
      const tempoMaximoPreparo = req.body.filtros?.tempoMaximoPreparo || 9999;

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

      const filtrosQuery: any[] = [
        { categoria: { $regex: rgxCategoria } },
        { classificacao: { $gte: estrelas } },
        { preparo: { $lte: tempoMaximoPreparo } },
      ];

      const respostaQuery = await receitaModel
        .find({ $and: filtrosQuery })
        .skip(limite * (page - 1))
        .limit(limite)
        .exec();

      if (!respostaQuery.length) {
        res.sendStatus(StatusCodes.NO_CONTENT);
        return;
      }

      const totalQuery = await receitaModel.count({ $and: filtrosQuery });

      res.status(StatusCodes.OK).send({ total: totalQuery, respostaQuery });
    } catch (err) {
      console.log(err);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ erro: err });
    }
  }

  async pegarReceitasPorId(req: Request<{ idReceita: string }>, res: Response) {
    try {
      const { idReceita } = req.params;

      const respostaQuery = await receitaModel.findById(idReceita);

      if (!respostaQuery) res.sendStatus(StatusCodes.NO_CONTENT);

      res.status(StatusCodes.OK).send(respostaQuery);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ erro: err });
    }
  }
}

export default new Receita();
