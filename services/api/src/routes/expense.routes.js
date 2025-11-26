import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense
} from "../controllers/expense.controller.js";

const router = express.Router();

router.get("/", auth, getExpenses);
router.post("/", auth, createExpense);
router.put("/:id", auth, updateExpense);
router.delete("/:id", auth, deleteExpense);

export default router;
