"use client";
import { useEffect, useState } from "react";

export default function TopNavbar({ user }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  // ✅ Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Mark notification as read
  const markAsRead = async (id) => {
    await fetch(`/api/notifications/${id}`, { method: "PATCH" });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <div className="flex items-center gap-4 relative">
        {/* Notification Bell */}
        <button
          className="relative"
          onClick={() => setOpen((prev) => !prev)}
        >
          🔔
          {notifications.filter((n) => !n.isRead).length > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs px-1 rounded-full">
              {notifications.filter((n) => !n.isRead).length}
            </span>
          )}
        </button>

        {/* Dropdown (click toggle) */}
        {open && (
          <div className="absolute right-0 top-10 w-72 bg-white shadow-lg rounded-lg p-2 text-gray-700 z-50">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-400">No notifications</p>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`block w-full text-left p-2 border-b last:border-none ${
                    n.isRead ? "text-gray-400" : "font-semibold"
                  }`}
                >
                  {n.message}
                </button>
              ))
            )}
          </div>
        )}

        {/* User Profile */}
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
