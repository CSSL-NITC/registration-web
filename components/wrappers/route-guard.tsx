"use client";

import routerService from "@/lib/services/router-service";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { matchPath } from "@/lib/utils/app-utils";
import { useAuth } from "@/lib/contexts/auth-provider";
import { PUBLIC_PAGES } from "@/lib/constants/common";

const RouteGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const currentPath = usePathname();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    routerService.on("onNavigation", (pageInfo) => {
      router.push(pageInfo.page);
    });
  }, [router]);

  const publicPaths = Object.values(PUBLIC_PAGES);
  const path = currentPath.split("?")[0];

  return (isAuthenticated || matchPath(publicPaths, path)) && children;
};

export default RouteGuard;
