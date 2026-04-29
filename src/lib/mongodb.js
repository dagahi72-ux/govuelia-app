import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("🟢 Mongo ya conectado");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Mongo conectado");
  } catch (error) {
    console.log("❌ Error conectando Mongo", error);
  }
};