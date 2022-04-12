import { model, Schema } from "mongoose";

export interface receita {
  titulo: string;
  categoria: string;
  classificacao: number;
  imgUrl: string;
  preparo: number;
  rendimento: string;
  ingredientes: string[];
  instrucoes: string[];
}

const receitaSchema = new Schema<receita>({
  titulo: { required: true, type: "string" },
  categoria: { required: true, type: "string" },
  classificacao: { required: true, type: "Number" },
  imgUrl: { required: false, type: "string" },
  preparo: { required: false, type: "Number" },
  rendimento: { required: true, type: "string" },
  ingredientes: { required: true, type: ["string"] },
  instrucoes: { required: true, type: ["string"] },
});

export const receitaModel = model<receita>("receitas", receitaSchema);
