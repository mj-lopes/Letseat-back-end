import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import receitas from "../../receitas.json";
import { receita, receitaModel } from "../database/model/receitaSchema";

class Receita {
  async pegarTodasReceitas(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const respostaQuery = await receitaModel.find().exec();

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
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { nomeReceita } = req.params;

      const respostaQuery = await receitaModel
        .find({ titulo: { $regex: nomeReceita, $options: "i" } })
        .exec();

      res.status(StatusCodes.ACCEPTED).send(respostaQuery);
    } catch (err) {
      console.log(err);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async pegarReceitaPorIngredientes(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { ingredientes } = req.body;
    const arrIngredientesPesquisa: any[] = ingredientes.map((e: string) => {
      const regex = new RegExp(e, "i");
      return { ingredientes: regex };
    });

    const resultadoQuery = await receitaModel.find({
      $and: arrIngredientesPesquisa,
    });

    res.status(200).send(resultadoQuery);
  }
}

export default new Receita();
