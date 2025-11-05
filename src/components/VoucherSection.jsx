"use client";
import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function VouchersSection() {
  const [vouchers, setVouchers] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("PERCENT");
  const [appliesTo, setAppliesTo] = useState("REFEREE");
  const [condition, setCondition] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    const res = await fetch("/api/vouchers");
    if (res.ok) {
      const data = await res.json();
      setVouchers(data.vouchers || []);
    }
  };

  const handleAddVoucher = async (e) => {
    e.preventDefault();
    if (!name || !code || !discount || !appliesTo) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/vouchers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        code,
        discount,
        type,
        appliesTo,
        condition,
        expiresAt,
      }),
    });
    setLoading(false);

    if (res.ok) {
      setName("");
      setCode("");
      setDiscount("");
      setType("PERCENT");
      setAppliesTo("REFEREE");
      setCondition("");
      setExpiresAt("");
      fetchVouchers();
    } else {
      const err = await res.json();
      alert(err.error || "Failed to add voucher");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this voucher?")) return;
    const res = await fetch(`/api/vouchers/${id}`, { method: "DELETE" });
    if (res.ok) fetchVouchers();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Voucher Management</h2>

      {/* Add Voucher Form */}
      <form onSubmit={handleAddVoucher} className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-6">
        <input
          type="text"
          placeholder="Voucher Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Voucher Code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Discount (%)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="p-2 border rounded"
        />

        <select value={appliesTo} onChange={(e) => setAppliesTo(e.target.value)} className="p-2 border rounded">
          <option value="REFEREE">Referee (New User)</option>
          <option value="REFERRER">Referrer (Influencer)</option>
          <option value="MILESTONE3">Milestone – 3 Projects</option>
          <option value="MILESTONE5">Milestone – 5 Projects</option>
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)} className="p-2 border rounded">
          <option value="PERCENT">%</option>
          <option value="FLAT">Flat</option>
        </select>

        <input
          type="date"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="col-span-full bg-purple-600 text-white rounded p-2 mt-2 hover:bg-purple-700"
        >
          {loading ? "Adding..." : <><FaPlus className="inline mr-2" /> Add Voucher</>}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Code</th>
              <th className="p-2 border">For</th>
              <th className="p-2 border">Discount</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Expires</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.length ? (
              vouchers.map((v, i) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{i + 1}</td>
                  <td className="p-2 border">{v.name}</td>
                  <td className="p-2 border font-mono text-purple-700 font-semibold">{v.code}</td>
                  <td className="p-2 border">{v.appliesTo}</td>
                  <td className="p-2 border">{v.discount}%</td>
                  <td className="p-2 border">{v.type}</td>
                  <td className="p-2 border">
                    {v.expiresAt ? new Date(v.expiresAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => handleDelete(v.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-2 text-center">
                  No vouchers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
