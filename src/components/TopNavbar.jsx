"use client";
import { useEffect, useState } from "react";

export default function TopNavbar({ user }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); // fetch every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4 relative">
        <button className="relative group">
          🔔
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs px-1 rounded-full">
              {notifications.length}
            </span>
          )}
          {/* Dropdown */}
          <div className="hidden group-hover:block absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-2 text-gray-700 z-50">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-400">No notifications</p>
            ) : (
              notifications.map((n) => (
                <p key={n.id} className="p-2 border-b last:border-none">
                  {n.message}
                </p>
              ))
            )}
          </div>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-medium">{user?.name}</span>
          <img
            src="/assets/avatar.png"
            alt="Admin"
            className="w-8 h-8 rounded-full border"
          />
        </div>
      </div>
    </header>
  );
}
