"use client";
import { FaUsers, FaGift, FaList, FaStore, FaGlobe } from "react-icons/fa";

export default function Sidebar({ setActiveSection }) {
  return (
    <aside className="w-64 bg-purple-900 text-white flex flex-col">
      <div className="p-6 font-bold text-lg border-b border-purple-700">
        Taskuber
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setActiveSection("dashboard")}
          className="block w-full text-left p-2 rounded hover:bg-purple-700"
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveSection("categories")}
          className="block w-full text-left p-2 rounded hover:bg-purple-700"
        >
          Categories
        </button>
        <button
          onClick={() => setActiveSection("users")}
          className="block w-full text-left p-2 rounded hover:bg-purple-700"
        >
          Users
        </button>
        <button
          onClick={() => setActiveSection("orders")}
          className="block w-full text-left p-2 rounded hover:bg-purple-700"
        >
          Orders
        </button>
        <button
          onClick={() => setActiveSection("vouchers")}
          className="block w-full text-left p-2 rounded hover:bg-purple-700"
        >
          Vouchers
        </button>
        <button
          onClick={() => setActiveSection("brands")}
          className="block w-full text-left p-2 rounded hover:bg-purple-700"
        >
          Total Brands
        </button>
        <button
          onClick={() => setActiveSection("policies")}
          className="block w-full text-left p-2 rounded hover:bg-purple-700"
        >
          Policies
        </button>
      </nav>
    </aside>
  );
}
