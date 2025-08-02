"use client";

import routerService from "@/lib/services/router-service";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { matchPath } from "@/lib/utils/app-utils";
import { useAuth } from "@/lib/contexts/auth-provider";
import { DashboardPages, PUBLIC_PAGES } from "@/lib/constants/common";
import Privileges from "@/lib/constants/privileges";

const RouteGuard = ({ children }: { children: ReactNode }) => {
  let canAccess = false;
  const router = useRouter();
  const currentPath = usePathname();

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    routerService.on("onNavigation", (pageInfo) => {
      router.push(pageInfo.page);
    });
  }, [router]);

  const publicPaths = Object.values(PUBLIC_PAGES);
  const path = currentPath.split("?")[0];

  if (matchPath(publicPaths, path)) {
    canAccess = true;
  } else if (isAuthenticated || currentPath.startsWith('/dashboard')) {
    // Temporarily allow access to all dashboard routes for testing
    canAccess = true;
  }

  if (canAccess) {
    return <>{children}</>;
  }

  // If access is denied, redirect to login or show access denied message
  if (!isAuthenticated) {
    routerService.navigateToPage({
      page: PUBLIC_PAGES.LOGIN,
    });
    return null;
  }

  // Show access denied message
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
        <button 
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default RouteGuard;
