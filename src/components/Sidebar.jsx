"use client";
import { FaUsers, FaGift, FaList, FaStore, FaGlobe } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-purple-900 text-white flex flex-col">
      <div className="p-6 font-bold text-lg border-b border-purple-700">
        Taskuber
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <a className="block p-2 rounded hover:bg-purple-700">Dashboard</a>
        <a className="block p-2 rounded hover:bg-purple-700">Categories</a>
        <a className="block p-2 rounded hover:bg-purple-700">Users</a>
        <a className="block p-2 rounded hover:bg-purple-700">Orders</a>
        <a className="block p-2 rounded hover:bg-purple-700">Gift Cards</a>
        <a className="block p-2 rounded hover:bg-purple-700">Total Brands</a>
        <a className="block p-2 rounded hover:bg-purple-700">Policies</a>
      </nav>
    </aside>
  );
}
