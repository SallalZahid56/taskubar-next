"use client";
import { useEffect, useState } from "react";

export default function NotificationBanner() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      const res = await fetch("/api/settings/reward-info");
      if (res.ok) {
        const data = await res.json();
        setMessage(data.message);
      }
    };
    fetchMessage();
  }, []);

  if (!message) return null;

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 rounded-lg shadow-md animate-pulse">
      <p className="font-medium">{message}</p>
    </div>
  );
}
