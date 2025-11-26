import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceById
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.get("/", auth, getInvoices);
router.get("/:id", auth, getInvoiceById);
router.post("/", auth, createInvoice);
router.put("/:id", auth, updateInvoice);
router.delete("/:id", auth, deleteInvoice);

export default router;
