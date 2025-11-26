import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createClient,
  getClients,
  updateClient,
  deleteClient
} from "../controllers/client.controller.js";

const router = express.Router();

router.get("/", auth, getClients);
router.post("/", auth, createClient);
router.put("/:id", auth, updateClient);
router.delete("/:id", auth, deleteClient);

export default router;
