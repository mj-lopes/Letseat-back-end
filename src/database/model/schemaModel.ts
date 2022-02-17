import { model, Schema } from "mongoose";

export interface receita {
  titulo: string;
  preparo: string;
  rendimento: string;
  ingredientes: string[];
  instrucoes: string[];
}

const receitaSchema = new Schema<receita>({
  titulo: { required: true, type: String },
  preparo: { required: true, type: String },
  rendimento: { required: true, type: String },
  ingredientes: { required: true, type: [String] },
  instrucoes: { required: true, type: [String] },
});

export const receitaModel = model<receita>("receitas", receitaSchema);
