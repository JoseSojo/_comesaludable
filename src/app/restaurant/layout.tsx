"use client"

import { useAuth } from "@/domain/context/AuthContext";
import FullScreenLoader from "@/infrastructure/components/common/Loadding";
import Header from "@/infrastructure/components/sections/dashboard/Header";
import Sidebar from "@/infrastructure/components/sections/dashboard/Sidebar";
import { redirect } from "next/navigation";
import { useState } from "react";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const { restaurant, loadding } = useAuth();

  if (loadding) return <FullScreenLoader />

  if (!restaurant) return redirect("/")

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />

          <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
