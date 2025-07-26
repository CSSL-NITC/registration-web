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
  } else if (isAuthenticated) {
    // Dashboard routes auth
    switch (currentPath) {
      case DashboardPages.DASHBOARD:
        if (user.privileges.includes(Privileges.VIEW_DASHBOARD)) {
          canAccess = true;
        }
        break;
      case DashboardPages.REGISTRATIONS:
        if (user.privileges.includes(Privileges.VIEW_REGISTRATION)) {
          canAccess = true;
        }
        break;
    }
  }

  if (canAccess) {
    return children;
  }
};

export default RouteGuard;
