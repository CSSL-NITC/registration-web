"use client";

import { AppBar } from "@/components/admin/app-bar";
import { AdminSidebar } from "@/components/admin/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import RouteGuard from "@/components/wrappers/route-guard";
import { PUBLIC_PAGES } from "@/lib/constants/common";
import { AuthProvider } from "@/lib/contexts/auth-provider";
import jwtService from "@/lib/services/jwt-service";
import routerService from "@/lib/services/router-service";
import type React from "react";
import { useState } from "react";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    jwtService.logout();

    routerService.navigateToPage({
      page: PUBLIC_PAGES.LOGIN,
    });
  };

  return (
    <AuthProvider>
      <RouteGuard>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            <AdminSidebar
              onLogout={handleLogout}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
            <div
              className={`flex-1 flex flex-col transition-all duration-300 ${
                sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
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

          <Toaster />
        </ThemeProvider>
      </RouteGuard>
    </AuthProvider>
  );
}
