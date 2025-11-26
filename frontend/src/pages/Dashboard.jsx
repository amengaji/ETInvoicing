import { useEffect, useState } from "react";
import { getClients, getInvoices, getExpenses } from "../services/api";
import {
  Users,
  FileText,
  Receipt,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalInvoices: 0,
    totalExpenses: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const clients = await getClients();
        const invoices = await getInvoices();
        const expenses = await getExpenses();

        const totalInvoiceAmount = invoices.data.reduce(
          (sum, inv) => sum + inv.total,
          0
        );

        const totalExpenseAmount = expenses.data.reduce(
          (sum, exp) => sum + exp.amount,
          0
        );

        setStats({
          totalClients: clients.data.length,
          totalInvoices: invoices.data.length,
          totalExpenses: expenses.data.length,
          totalRevenue: totalInvoiceAmount - totalExpenseAmount,
        });
      } catch (err) {
        console.log("Dashboard load error:", err);
      }
    }

    loadData();
  }, []);

  const summaryCards = [
    {
      label: "Total Clients",
      value: stats.totalClients,
      icon: <Users size={26} />,
      color: "bg-blue-700",
    },
    {
      label: "Total Invoices",
      value: stats.totalInvoices,
      icon: <FileText size={26} />,
      color: "bg-purple-700",
    },
    {
      label: "Total Expenses",
      value: stats.totalExpenses,
      icon: <Receipt size={26} />,
      color: "bg-red-700",
    },
    {
      label: "Net Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: <Activity size={26} />,
      color: "bg-green-700",
    },
  ];

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {summaryCards.map((card, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-[#222] border border-[#333] flex items-center justify-between shadow-lg hover:scale-[1.02] transition-all"
          >
            <div>
              <p className="text-gray-400">{card.label}</p>
              <p className="text-3xl font-bold mt-1">{card.value}</p>
            </div>
            <div className={`${card.color} p-4 rounded-xl`}>{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Invoices Summary */}
        <div className="bg-[#222] p-6 rounded-xl border border-[#333] shadow-lg">
          <h2 className="text-xl font-bold mb-4">Invoice Overview</h2>

          <div className="flex items-center justify-between bg-[#111] p-4 rounded-lg mb-4">
            <p className="text-gray-300">Total Invoices</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {stats.totalInvoices}
              </span>
              <ArrowUpRight className="text-green-400" />
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#111] p-4 rounded-lg">
            <p className="text-gray-300">Total Revenue</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">₹{stats.totalRevenue}</span>
              <ArrowUpRight className="text-green-400" />
            </div>
          </div>
        </div>

        {/* Expenses Summary */}
        <div className="bg-[#222] p-6 rounded-xl border border-[#333] shadow-lg">
          <h2 className="text-xl font-bold mb-4">Expenses Overview</h2>

          <div className="flex items-center justify-between bg-[#111] p-4 rounded-lg mb-4">
            <p className="text-gray-300">Total Expenses</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {stats.totalExpenses}
              </span>
              <ArrowDownRight className="text-red-400" />
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#111] p-4 rounded-lg">
            <p className="text-gray-300">Net Balance</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">₹{stats.totalRevenue}</span>
              <ArrowUpRight className="text-green-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
