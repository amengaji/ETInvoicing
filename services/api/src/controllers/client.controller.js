import prisma from "../config/prisma.js";

export const getClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { id: "desc" }
    });
    res.json({ clients });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const createClient = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const client = await prisma.client.create({
      data: { name, email, phone, address }
    });

    res.json({ message: "Client created", client });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateClient = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, phone, address } = req.body;

    const client = await prisma.client.update({
      where: { id },
      data: { name, email, phone, address }
    });

    res.json({ message: "Client updated", client });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.client.delete({
      where: { id }
    });

    res.json({ message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
