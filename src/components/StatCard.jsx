"use client";

export default function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
      <div className="text-purple-600 text-2xl">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}
