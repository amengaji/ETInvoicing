import prisma from "../config/prisma.js";

export const getInvoices = async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { client: true },
      orderBy: { id: "desc" }
    });
    res.json({ invoices });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: { client: true }
    });

    if (!invoice)
      return res.status(404).json({ message: "Invoice not found" });

    res.json({ invoice });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      issueDate,
      dueDate,
      items,
      subtotal,
      tax,
      total,
      clientId
    } = req.body;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        issueDate: new Date(issueDate),
        dueDate: new Date(dueDate),
        items,
        subtotal,
        tax,
        total,
        clientId
      }
    });

    res.json({ message: "Invoice created", invoice });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;

    const invoice = await prisma.invoice.update({
      where: { id },
      data
    });

    res.json({ message: "Invoice updated", invoice });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.invoice.delete({
      where: { id }
    });

    res.json({ message: "Invoice deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
