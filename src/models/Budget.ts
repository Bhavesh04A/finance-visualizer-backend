import { Schema, model, Types } from "mongoose";

const budgetSchema = new Schema({
  category: { type: Types.ObjectId, ref: "Category", required: true },
  month: { type: String, required: true }, // "YYYY-MM"
  amount: { type: Number, required: true }
});

budgetSchema.index({ category: 1, month: 1 }, { unique: true });

export default model("Budget", budgetSchema);
