"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import { loadingSubs } from '@/utils/LoaderHelper';

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const currentPath = usePathname();
  const [loading, setLoading] = useState(false);

  useMemo(() => {
    const onLoading = (isLoading: boolean) => {
      setLoading(isLoading);
    };
    loadingSubs(onLoading);
  }, []);

  const isRestrictedRoute = useMemo(() => {
    const publicPaths = Object.values(Constants.PUBLIC_PAGES);
    const path = currentPath.split("?")[0];
    return !matchPath(publicPaths, path);
  }, [currentPath]);

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-white opacity-50 z-[100]">
          <LoadingComponent />
        </div>
      )}
      {isRestrictedRoute ? (
        <>
          <div className="flex">
            <SideNav />
          </div>

          <main className="flex-1">
            <DefaultWrapper>
              <Header />
              <HeaderMobile />
              <PageWrapper>{children}</PageWrapper>
            </DefaultWrapper>
          </main>
        </>
      ) : (
        <main className="flex">
          <PublicPageWrapper>{children}</PublicPageWrapper>
        </main>
      )}
    </div>
  );
};

export default LayoutWrapper;
