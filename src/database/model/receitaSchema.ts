import { model, Schema } from "mongoose";

export interface receita {
  titulo: string;
  categoria: string;
  classificacao: string[];
  imgUrl: string;
  preparo: string;
  rendimento: string;
  ingredientes: string[];
  instrucoes: string[];
}

const receitaSchema = new Schema<receita>({
  titulo: { required: true, type: String },
  categoria: { required: true, type: String },
  classificacao: { required: true, type: [String] },
  imgUrl: { required: false, type: String },
  preparo: { required: true, type: String },
  rendimento: { required: true, type: String },
  ingredientes: { required: true, type: [String] },
  instrucoes: { required: true, type: [String] },
});

export const receitaModel = model<receita>("receitas", receitaSchema);
