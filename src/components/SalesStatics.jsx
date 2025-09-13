"use client";

export default function SalesStatistics() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Sales Statistics</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-purple-600 text-white rounded">
            Sales
          </button>
          <button className="px-4 py-2 border rounded">Orders</button>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="date"
            className="border rounded px-2 py-1"
            defaultValue="2024-02-08"
          />
          <span>to</span>
          <input
            type="date"
            className="border rounded px-2 py-1"
            defaultValue="2024-02-14"
          />
          <button className="px-4 py-1 bg-purple-600 text-white rounded">
            Apply
          </button>
        </div>
      </div>
      <div className="h-40 flex items-center justify-center text-gray-400">
        📊 Chart Placeholder
      </div>
    </div>
  );
}
