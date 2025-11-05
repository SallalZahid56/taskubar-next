"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import LeftImage from "@/components/LeftImage";
import RequestForm from "@/components/RequestForm";
import UserOrdersSection from "@/components/UserOrdersSection"; // 👈 add this
import NotificationBanner from "@/components/NotificationBanner";


export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const taskOptions = ["Assignment", "Project", "Classwork", "Homework"];
  const services = {
    "Writing & Essays": [
      "Academic Essay Writing",
      "Plagiarism-Free Research Papers",
      "Custom Case Study Solutions",
      "Creative & Blog Content Writing",
      "Professional Reports & Reviews",
    ],
    "Cybersecurity & Labs": [
      "Network Security Lab Reports",
      "Ethical Hacking & Pen Testing Tasks",
      "Wireshark Packet Analysis",
      "Security Tool Usage Guidance",
      "Cyber Risk & Compliance Reports",
    ],
    "Programming Tasks": [
      "Python, Java & C++ Tasks",
      "Data Structures & Algorithms Help",
      "Object-Oriented Programming",
      "Database Queries (SQL & NoSQL)",
      "Code Review & Debugging Services",
    ],
    "Projects & FYPs": [
      "MERN & MEAN Stack Development",
      "WordPress & Web App Creation",
      "AI & Machine Learning Models",
      "UI/UX Prototypes & Design Systems",
      "Final Year Project Documentation",
    ],
    "Homework & Coursework": [
      "Mathematics & Statistics Solutions",
      "Engineering Subject Tasks",
      "PowerPoint Case Presentations",
      "Online Class & Quiz Support",
      "Deadline-Oriented Submissions",
    ],
  };
  const timelineOptions = [
    "3 days",
    "5 days",
    "1 week",
    "2 weeks",
    "15 days",
    "Less than a month",
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.user?.role === "USER") {
          setUser(data.user);
        } else {
          router.push("/admin-dashboard");
        }
      } else {
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  if (!user) return <p className="text-center mt-8">Loading...</p>;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-white px-4 flex flex-col">
      {/* ✅ Navbar on top */}
      <TopBar user={user} onLogout={handleLogout} />

      {/* ✅ Content below navbar */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto h-auto md:h-[90vh] shadow-lg rounded-lg overflow-hidden mt-4">
        {/* Left Image */}
        <LeftImage />

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="p-6 sm:p-8 flex flex-col gap-6 overflow-y-auto max-h-[90vh]">
            {/* Welcome Section */}
            <div className="mb-4 text-center md:text-left mt-8">
              <h1 className="text-2xl font-bold">
                Welcome, <span className="text-purple-600">{user.name}</span> 👋
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Submit a request for help with your tasks or projects.
              </p>
              <div className="mt-2 h-1 w-24 mx-auto md:mx-0 bg-gradient-to-r from-purple-400 to-purple-700"></div>
            </div>

            {/* Request Form */}
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <RequestForm
                services={services}
                taskOptions={taskOptions}
                timelineOptions={timelineOptions}
              />
            </div>

            {/* ✅ User Orders Section (separate block) */}
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <UserOrdersSection />
            </div>
            {/* Notification Banner */}
            <div className="mb-4">
              <NotificationBanner />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
