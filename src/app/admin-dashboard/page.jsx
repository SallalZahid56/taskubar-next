"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaGift,
  FaChartLine,
  FaList,
  FaStore,
  FaGlobe,
} from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import StatCard from "@/components/StatCard";
import SalesStatistics from "@/components/SalesStatics";
import UsersSection from "@/components/UserSection";
import CategoriesSection from "@/components/CategoriesSection";
import OrdersSection from "@/components/OrdersSection";
import VouchersSection from "@/components/VoucherSection";


export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard"); // 👈 section state
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.user?.role === "ADMIN") {
          setUser(data.user);
        } else {
          router.push("/user-dashboard");
        }
      } else {
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  if (!user) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} /> {/* 👈 pass state setter */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <TopNavbar user={user} />

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {activeSection === "dashboard" && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<FaUsers />} title="Total Users" value="2123k" />
                <StatCard icon={<FaGift />} title="No of Cards" value="12323k" />
                <StatCard
                  icon={<FaChartLine />}
                  title="Total Revenue"
                  value="$4876.98"
                />
                <StatCard icon={<FaGlobe />} title="Total Countries" value="195" />
                <StatCard icon={<FaGift />} title="Returned Cards" value="2123k" />
                <StatCard
                  icon={<FaGift />}
                  title="Utilized Cards"
                  value="12323k"
                />
                <StatCard icon={<FaList />} title="Total Categories" value="8" />
                <StatCard icon={<FaStore />} title="Total Brands" value="196" />
              </div>

              {/* Sales Statistics */}
              <SalesStatistics />
            </>
          )}

          {activeSection === "users" && <UsersSection />}
          {activeSection === "categories" && <CategoriesSection />}
          {activeSection === "orders" && <OrdersSection />}
          {activeSection === "vouchers" && <VouchersSection />}
        </main>
      </div>
    </div>
  );
}
