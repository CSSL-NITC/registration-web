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
      console.log(user)
      dispatch(getUser(userID))
    }
  }, [user?.userID]);

  const handleLogout = () => {
    jwtService.logout();
    routerService.navigateToPage({
      page: PUBLIC_PAGES.LOGIN,
    });
  };

  // Function to get title based on user role
  const getTitle = () => {
    if (!user?.roles) return "Dashboard";
    
    if (user.roles.includes("SUPER_ADMIN")) {
      return "Admin Dashboard";
    } else if (user.roles.includes("COMPANY")) {
      return "Company Dashboard";
    } else if (user.roles.includes("COMPANY_USER")) {
      return "Company User Dashboard";
    } else if (user.roles.includes("INDIVIDUAL_USER")) {
      return "My Dashboard";
    }
    return "Dashboard";
  };

  // Function to get subtitle based on user role
  const getSubtitle = () => {
    if (!user?.roles) return "CSSL NITC 2025";
    
    if (user.roles.includes("SUPER_ADMIN")) {
      return "CSSL NITC 2025 - Admin Panel";
    } else if (user.roles.includes("COMPANY")) {
      return "CSSL NITC 2025 - Company Portal";
    } else if (user.roles.includes("COMPANY_USER")) {
      return "CSSL NITC 2025 - Company User";
    } else if (user.roles.includes("INDIVIDUAL_USER")) {
      return "CSSL NITC 2025 - My Account";
    }
    return "CSSL NITC 2025";
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
          title={getTitle()}
          subtitle={getSubtitle()}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}