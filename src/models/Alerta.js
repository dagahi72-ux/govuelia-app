import mongoose from "mongoose";

const AlertaSchema = new mongoose.Schema({
  email: String,
  origen: String,
  destino: String,
  fecha: String,
  precioObjetivo: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Alerta ||
  mongoose.model("Alerta", AlertaSchema);