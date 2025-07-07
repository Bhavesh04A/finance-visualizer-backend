import { Router, Request, Response } from "express";
import Category from "../models/Category";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
});

router.post("/seed", async (_req: Request, res: Response) => {
  const defaultCategories = [
    { name: "Food", color: "#f472b6" },
    { name: "Transport", color: "#60a5fa" },
    { name: "Shopping", color: "#fbbf24" },
    { name: "Bills", color: "#34d399" },
    { name: "Other", color: "#a78bfa" },
  ];
  await Category.insertMany(defaultCategories, { ordered: false }).catch(() => {});
  res.json({ message: "Seeded" });
});

export default router;
