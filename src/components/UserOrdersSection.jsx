"use client";
import { useEffect, useState } from "react";

export default function UserOrdersSection() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch("/api/users/orders");
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders);
    }
  };

  const applyVoucher = async (orderId) => {
    const code = prompt("Enter voucher code:");
    if (!code) return;
    await fetch(`/api/orders/${orderId}/voucher`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    fetchOrders();
  };

  const requestInvoice = async (orderId) => {
    await fetch(`/api/orders/${orderId}/request-invoice`, { method: "POST" });
    fetchOrders();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      {/* ✅ Responsive scroll wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border whitespace-nowrap">Order ID</th>
              <th className="p-2 border whitespace-nowrap">Service</th>
              <th className="p-2 border whitespace-nowrap">Quotation</th>
              <th className="p-2 border whitespace-nowrap">Voucher</th>
              <th className="p-2 border whitespace-nowrap">Invoice</th>
              <th className="p-2 border whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-2 border whitespace-nowrap">{order.id}</td>
                  <td className="p-2 border">{order.service}</td>

                  {/* Quotation */}
                  <td className="p-2 border whitespace-nowrap">
                    {order.quotation ? (
                      <span className="text-purple-600">{order.quotation}</span>
                    ) : (
                      <span className="text-gray-400 italic">Pending</span>
                    )}
                  </td>

                  {/* Voucher */}
                  <td className="p-2 border whitespace-nowrap">
                    {order.voucher ? (
                      <span className="text-green-600">{order.voucher}</span>
                    ) : order.quotation ? (
                      <button
                        onClick={() => applyVoucher(order.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Apply Voucher
                      </button>
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Invoice */}
                  <td className="p-2 border whitespace-nowrap">
                    {order.invoiceSent ? (
                      <span className="text-green-700 font-semibold">Sent</span>
                    ) : order.quotation && order.voucher ? ( // ✅ only show if voucher is applied
                      <button
                        onClick={() => requestInvoice(order.id)}
                        className="text-purple-600 hover:underline"
                      >
                        Request Invoice
                      </button>
                    ) : (
                      <span className="text-gray-400 italic">Apply voucher first</span> // guide user
                    )}
                  </td>

                  {/* Status */}
                  <td className="p-2 border whitespace-nowrap">
                    {order.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-2 border text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
