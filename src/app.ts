import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import categoryRoutes from "./routes/category";
import transactionRoutes from "./routes/transaction";
import budgetRoutes from "./routes/budget";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/categories", categoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Personal Finance API is running!" });
});

export default app;
