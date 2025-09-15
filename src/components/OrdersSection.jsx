"use client";
import { useEffect, useState } from "react";
import { Download, FileText, Receipt, RotateCcw } from "lucide-react"; // 👈 added reset icon

export default function OrdersSection() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const totalPages = Math.ceil(totalOrders / limit);

  useEffect(() => {
    fetchOrders();
  }, [page, search]);

  const fetchOrders = async () => {
    const res = await fetch(`/api/orders?page=${page}&limit=${limit}&search=${search}`);
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders);
      setTotalOrders(data.totalOrders);
    }
  };

  // ✅ Send Quotation
  const handleSendQuotation = async (orderId) => {
    const quotation = prompt("Enter quotation (e.g. $50 for 5 days):");
    if (!quotation) return;
    await fetch(`/api/orders/${orderId}/quotation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quotation }),
    });
    fetchOrders();
  };

  // ✅ Generate Invoice
  const handleGenerateInvoice = async (orderId) => {
    await fetch(`/api/orders/${orderId}/invoice`, { method: "POST" });
    fetchOrders();
  };

  // ✅ Reset to Pending
  const handleResetOrder = async (orderId) => {
    if (!confirm("Are you sure you want to reset this order to Pending?")) return;
    await fetch(`/api/orders/${orderId}/reset`, { method: "POST" });
    fetchOrders();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      {/* Search & Filters */}
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by Service / Topic / User"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={() => fetchOrders()}
          className="bg-purple-600 text-white px-4 rounded-r-md"
        >
          Search
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Sr. No</th>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Topic</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">File</th>
              <th className="p-2 border">Quotation / Invoice</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{(page - 1) * limit + index + 1}</td>
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.service}</td>
                  <td className="p-2 border">{order.topic}</td>
                  <td className="p-2 border">{order.user?.name || "Deleted User"}</td>

                  {/* File Download */}
                  <td className="p-2 border text-center">
                    {order.fileUrl ? (
                      <a
                        href={order.fileUrl.startsWith("/uploads") ? order.fileUrl : `/uploads/${order.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800"
                        title="Download File"
                      >
                        <Download className="w-5 h-5 inline" />
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">—</span>
                    )}
                  </td>

                  {/* Quotation / Invoice Column */}
                  <td className="p-2 border text-center">
                    {order.quotation ? (
                      order.invoiceSent ? (
                        <span className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                          Invoice Sent
                          <button
                            onClick={() => handleResetOrder(order.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Reset to Pending"
                          >
                            <RotateCcw className="w-5 h-5 inline" />
                          </button>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleGenerateInvoice(order.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Generate Invoice"
                        >
                          <Receipt className="w-5 h-5 inline" />
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => handleSendQuotation(order.id)}
                        className="text-purple-600 hover:text-purple-800"
                        title="Send Quotation"
                      >
                        <FileText className="w-5 h-5 inline" />
                      </button>
                    )}
                  </td>

                  {/* Status */}
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        order.status === "Pending"
                          ? "bg-yellow-500"
                          : order.status === "Quotation Sent"
                          ? "bg-purple-600"
                          : order.status === "Invoice Sent"
                          ? "bg-green-700"
                          : order.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-green-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Created At */}
                  <td className="p-2 border">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-2 border text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing {(page - 1) * limit + 1}-
          {Math.min(page * limit, totalOrders)} of {totalOrders}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ⬅
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, page - 2), Math.min(totalPages, page + 1))
            .map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 border rounded ${page === p ? "bg-purple-600 text-white" : ""}`}
              >
                {p}
              </button>
            ))}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ➡
          </button>
        </div>
      </div>
    </div>
  );
}
