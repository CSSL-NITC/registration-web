"use client";

import { AppBar } from "@/components/dashboard/app-bar";
import { Sidebar } from "@/components/dashboard/sidebar";
import { getUser } from "@/lib/api/user-api";
import { PUBLIC_PAGES } from "@/lib/constants/common";
import { useAuth } from "@/lib/contexts/auth-provider";
import jwtService from "@/lib/services/jwt-service";
import routerService from "@/lib/services/router-service";
import { useAppDispatch } from "@/lib/store";
import type React from "react";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      let userID: number = user.userID;
      dispatch(getUser(userID))
    }
  }, [user?.userID]);

  const handleLogout = () => {
    jwtService.logout();

    routerService.navigateToPage({
      page: PUBLIC_PAGES.LOGIN,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
          }`}
      >
        <AppBar
          title="Admin Dashboard"
          subtitle="NIT Conference 2025"
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
