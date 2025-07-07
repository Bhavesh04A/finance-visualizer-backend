import { Schema, model, Types } from "mongoose";

const transactionSchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: Types.ObjectId, ref: "Category", required: true }
});

export default model("Transaction", transactionSchema);
