"use client";

import { usePathname, useRouter } from "next/navigation";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import jwtService from "@/lib/services/jwt-service";
import { DASHBOARD_PAGE, PUBLIC_PAGES } from "@/lib/constants/common";
import { matchPath } from "../utils/app-utils";

interface User {
  userID: number;
  username: string;
  displayName: string;
  companyIDs?: number[];
  user_type: string;
  email?: string;
  [key: string]: any;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  setUser: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedInUser, setLoginUser] = useState(null);
  const router = useRouter();
  const currentPath = usePathname();

  /* const fetchAppProperties = useMasterStore(
    (state) => state.fetchAppProperties,
  ); */

  useEffect(() => {
    const jwtCheck = () => {
      console.log("jwt check: ")
      const path = currentPath.split("?")[0];

      jwtService.on("onAutoLogin", () => {
        console.info("onAutoLogin");
        let loginUser = jwtService.getLoginUser();
        if (loginUser) {
          setLoginUser(loginUser);
          const path = currentPath.split("?")[0];
          if (path === DASHBOARD_PAGE) {
            router.push(DASHBOARD_PAGE);
          }
        }
        //fetchAppProperties();
      });

      jwtService.on("onAutoLogout", (message) => {
        console.info("onAutoLogout: ", message);
        jwtService.logout();
        setLoginUser(null);
        router.push(PUBLIC_PAGES.LOGIN);
      });

      jwtService.on("onLoginSuccess", (data) => {
        console.log("onLoginSuccess : ", data);
        setLoginUser(data);
        //fetchAppProperties();

        if (data) {
          router.push(DASHBOARD_PAGE);
        }
      });

      jwtService.on("onRedirectLogin", () => {
        console.info("onRedirectLogin");
        const publicPaths = Object.values(PUBLIC_PAGES);
        const path = currentPath.split("?")[0];
        if (!matchPath(publicPaths, path)) {
          router.push(PUBLIC_PAGES.LOGIN);
        }
      });
      
      jwtService.init();
    };

    jwtCheck();
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated: !!loggedInUser,
      user: loggedInUser,
      setUser: setLoginUser,
    }),
    [loggedInUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
