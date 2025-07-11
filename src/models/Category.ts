import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true }
});

export default model("Category", categorySchema);
