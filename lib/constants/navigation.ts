"use client";
import { JSX, ComponentType } from "react";
import { DASHBOARD_PAGE } from "./common";
import Privileges from "./privileges";
import { DashboardPages } from "./common";
import { Building2, CreditCard, FileText, LayoutDashboard, QrCode, Settings, Users } from "lucide-react";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: ComponentType<any>;
  submenu?: boolean;
  privileges?: string[];
  subMenuItems?: SideNavItem[];
};

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Dashboard",
    path: DASHBOARD_PAGE,
    privileges: [Privileges.VIEW_DASHBOARD],
    subMenuItems: [],
    icon: LayoutDashboard
  },
  {
    title: "Registrations",
    path: DashboardPages.REGISTRATIONS,
    privileges: [Privileges.VIEW_REGISTRATION],
    subMenuItems: [],
    icon: Users
  },
  {
    title: "Companies",
    path: DashboardPages.COMPANIES,
    privileges: [],
    subMenuItems: [],
    icon: Building2
  },
  {
    title: "Payments",
    path: DashboardPages.PAYMENTS,
    privileges: [],
    subMenuItems: [],
    icon: CreditCard,
  },
  {
    title: "QR Codes",
    path: DashboardPages.QR_CODES,
    privileges: [],
    subMenuItems: [],
    icon: QrCode
  },
  {
    title: "Reports",
    path: DashboardPages.REPORTS,
    privileges: [],
    subMenuItems: [],
    icon: FileText
  },
  {
    title: "Settings",
    path: DashboardPages.SETTINGS,
    privileges: [],
    icon: Settings,
    subMenuItems: [
      {
        title: "Users",
        privileges: [],
        path: DashboardPages.SETTINGS_USERS,
      },
      {
        title: "Roles",
        privileges: [],
        path: DashboardPages.SETTINGS_ROLES,
      },
    ],
  },
];
