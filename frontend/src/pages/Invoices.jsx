import { useEffect, useState } from "react";
import { getInvoices } from "../services/api";
import { PlusCircle, Eye, Trash2 } from "lucide-react";
import InvoiceModal from "../components/InvoiceModal";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const res = await getInvoices();
      setInvoices(res.data);
    } catch (err) {
      console.log("Error fetching invoices:", err);
    }
  };

  return (
    <div className="text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Invoices</h1>

        <button
          className="bg-[#3194A0] hover:bg-[#277884] transition-all px-5 py-3 rounded-lg flex items-center gap-2 font-semibold"
          onClick={() => setShowCreateModal(true)}
        >
          <PlusCircle size={20} />
          Create Invoice
        </button>
      </div>

      {/* INVOICE TABLE */}
      <div className="bg-[#222] p-6 rounded-xl border border-[#333] shadow-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-300">
              <th className="pb-3">Invoice #</th>
              <th className="pb-3">Client</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No invoices found
                </td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-gray-700 hover:bg-[#2a2a2a] transition-all"
                >
                  <td className="py-3 font-semibold">#{inv.id}</td>
                  <td className="py-3">{inv.client?.name || "Client"}</td>
                  <td className="py-3">₹{inv.total}</td>

                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        inv.status === "PAID"
                          ? "bg-green-600"
                          : inv.status === "PENDING"
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-4">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Eye size={20} />
                      </button>

                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE INVOICE MODAL */}
      <InvoiceModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={loadInvoices}
      />
    </div>
  );
}
