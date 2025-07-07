import { Router, Request, Response } from "express";
import Budget from "../models/Budget";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const { month } = req.query;
  const filter = month ? { month } : {};
  const budgets = await Budget.find(filter).populate("category");
  res.json(budgets);
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { category, amount, month } = req.body;
  if (!category || amount === undefined || !month) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }
  const budget = await Budget.findOneAndUpdate(
    { category, month },
    { amount },
    { upsert: true, new: true }
  );
  res.status(201).json(budget);
});

// --- DELETE endpoint for resetting all budgets for a month ---
router.delete("/", async (req: Request, res: Response): Promise<void> => {
  const { month } = req.query;
  if (!month) {
    res.status(400).json({ error: "Month is required" });
    return;
  }
  await Budget.deleteMany({ month });
  res.status(204).end();
});

export default router;
