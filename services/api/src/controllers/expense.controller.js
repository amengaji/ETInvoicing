import prisma from "../config/prisma.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { id: "desc" }
    });
    res.json({ expenses });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { title, amount, date, category, notes } = req.body;

    const expense = await prisma.expense.create({
      data: {
        title,
        amount: Number(amount),
        date: new Date(date),
        category,
        notes
      }
    });

    res.json({ message: "Expense created", expense });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const expense = await prisma.expense.update({
      where: { id },
      data: req.body
    });

    res.json({ message: "Expense updated", expense });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.expense.delete({
      where: { id }
    });

    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
