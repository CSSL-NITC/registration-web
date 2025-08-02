"use client";

import { AppBar } from "@/components/dashboard/app-bar";
import { Sidebar } from "@/components/dashboard/sidebar";
import { getUser } from "@/lib/api/user-api";
import { PUBLIC_PAGES } from "@/lib/constants/common";
import { useAuth } from "@/lib/contexts/auth-provider";
import jwtService from "@/lib/services/jwt-service";
import routerService from "@/lib/services/router-service";
import { useAppDispatch } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();

  // Close mobile sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      let userID: number = user.userID;
      dispatch(getUser(userID));
    }
  }, [user?.userID]);

  const handleLogout = () => {
    jwtService.logout();
    routerService.navigateToPage({
      page: PUBLIC_PAGES.LOGIN,
    });
  };

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

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const toggleDesktopSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 lg:hidden z-40 transition-opacity duration-300",
          mobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleMobileSidebar}
      />

      {/* Sidebar */}
      <Sidebar
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleDesktopSidebar}
        mobileOpen={mobileSidebarOpen}
        onMobileToggle={toggleMobileSidebar}
      />

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        <AppBar
          title={getTitle()}
          subtitle={getSubtitle()}
          onLogout={handleLogout}
          onMenuClick={toggleMobileSidebar}
        />
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}