// ❗ FIX FOR PRISMA 7 — DO NOT USE DEFAULT IMPORT
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
