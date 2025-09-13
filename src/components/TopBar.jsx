"use client";

export default function TopBar({ user, onLogout }) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <span className="font-semibold text-gray-700">{user?.name}</span>
      <button
        onClick={onLogout}
        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
