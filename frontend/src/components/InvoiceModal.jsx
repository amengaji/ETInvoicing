import { useEffect, useState } from "react";
import { createInvoice, getClients } from "../services/api";
import { X } from "lucide-react";

export default function InvoiceModal({ open, onClose, onCreated }) {
  // 🔥 ALL HOOKS MUST COME FIRST
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load clients only once when modal opens
  useEffect(() => {
    if (!open) return; // safe: does NOT skip hooks
    const fetchClients = async () => {
      try {
        const res = await getClients();
        setClients(res.data || []);
      } catch (err) {
        console.error("Error loading clients:", err);
      }
    };
    fetchClients();
  }, [open]);

  // ❗ Modal must return AFTER hooks
  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!clientId) {
      setError("Please select a client");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);

      await createInvoice({
        clientId: Number(clientId),
        total: Number(amount),
        status,
        note,
      });

      setLoading(false);
      onClose();
      if (onCreated) onCreated();
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(err.response?.data?.message || "Failed to create invoice");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#222] text-white rounded-2xl shadow-2xl w-full max-w-lg border border-[#333]">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333]">
          <h2 className="text-xl font-bold">Create Invoice</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {error && (
            <div className="bg-red-600/80 text-sm px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* CLIENT */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Client</label>
            <select
              className="w-full bg-[#333] border border-[#444] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3194A0]"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              <option value="">Select client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.email ? `(${c.email})` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* AMOUNT */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Amount (₹)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full bg-[#333] border border-[#444] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3194A0]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter total amount"
            />
          </div>

          {/* STATUS */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Status</label>
            <select
              className="w-full bg-[#333] border border-[#444] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3194A0]"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="OVERDUE">Overdue</option>
            </select>
          </div>

          {/* NOTE */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Notes (optional)</label>
            <textarea
              className="w-full bg-[#333] border border-[#444] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3194A0] resize-none"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note or description for this invoice"
            />
          </div>

          {/* FOOTER BUTTONS */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#333] text-sm font-medium hover:bg-[#3a3a3a] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-[#3194A0] text-sm font-semibold hover:bg-[#277884] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Creating..." : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
