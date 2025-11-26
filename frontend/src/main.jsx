import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Clients from "./pages/Clients";
import Expenses from "./pages/Expenses";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/invoices", element: <Invoices /> },
      { path: "/clients", element: <Clients /> },
      { path: "/expenses", element: <Expenses /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
