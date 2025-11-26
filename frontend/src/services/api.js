import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // Backend URL
});

// AUTH
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// CLIENTS
export const getClients = () => API.get("/clients");
export const createClient = (data) => API.post("/clients", data);

// INVOICES
export const getInvoices = () => API.get("/invoices");
export const createInvoice = (data) => API.post("/invoices", data);

// EXPENSES
export const getExpenses = () => API.get("/expenses");
export const createExpense = (data) => API.post("/expenses", data);

export default API;
