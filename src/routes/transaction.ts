import { Router, Request, Response } from "express";
import Transaction from "../models/Transaction";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const transactions = await Transaction.find().populate("category").sort({ date: -1 });
  res.json(transactions);
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { amount, date, description, category } = req.body;
  if (!amount || !date || !description || !category) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }
  const tx = await Transaction.create({ amount, date, description, category });
  res.status(201).json(tx);
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid transaction ID" });
    return;
  }
  const { amount, date, description, category } = req.body;
  if (!amount || !date || !description || !category) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }
  const tx = await Transaction.findByIdAndUpdate(
    id,
    { amount, date, description, category },
    { new: true }
  );
  if (!tx) {
    res.status(404).json({ error: "Transaction not found" });
    return;
  }
  res.json(tx);
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid transaction ID" });
    return;
  }
  const tx = await Transaction.findByIdAndDelete(id);
  if (!tx) {
    res.status(404).json({ error: "Transaction not found" });
    return;
  }
  res.status(204).end();
});

export default router;
