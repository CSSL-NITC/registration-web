"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Building2,
  CreditCard,
  QrCode,
  FileText,
  Settings,
  LogOut,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { SIDENAV_ITEMS, SideNavItem } from "@/lib/constants/navigation"
import { useAuth } from "@/lib/contexts/auth-provider"
import AppUtil from "@/lib/utils/app-utils"

interface SidebarProps {
  onLogout: () => void
  collapsed?: boolean
  onToggleCollapse?: () => void
  mobileOpen?: boolean
  onMobileToggle?: () => void
}

export function Sidebar({ 
  onLogout, 
  collapsed = false, 
  onToggleCollapse, 
  mobileOpen = false,
  onMobileToggle 
}: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        // Mobile behavior
        "lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
      aria-label="Sidebar"
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div
          className={cn(
            "flex items-center border-b border-gray-200 dark:border-gray-800 transition-all duration-300 h-16",
            collapsed ? "px-4 justify-center" : "px-6",
          )}
        >
          <div className="flex items-center space-x-3">
            {!collapsed && (
              <div className="relative w-32 h-10">
                <Image
                  src="https://res.cloudinary.com/djxtjt1uf/image/upload/v1753804463/NITC-Logo-7c1f04fc_qobxl1.png"
                  alt="NITC Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
            {collapsed && (
              <div className="relative w-10 h-10">
                <Image
                  src="https://res.cloudinary.com/djxtjt1uf/image/upload/v1753804463/NITC-Logo-7c1f04fc_qobxl1.png"
                  alt="NITC Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
          </div>
          
          {/* Mobile close button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMobileToggle}
            className="ml-auto lg:hidden p-1"
            aria-label="Close sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Desktop collapse toggle - Always visible */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleCollapse} 
            className="hidden lg:flex ml-auto p-1"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {user && SIDENAV_ITEMS.filter((item: SideNavItem) => AppUtil.hasAnyPrivilege(
            user.privileges ?? [],
            item.privileges ?? [],
          )).map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.title}
                href={item.path}
                className={cn(
                  "flex items-center text-sm font-medium rounded-lg transition-colors group",
                  collapsed ? "px-3 py-3 justify-center" : "px-3 py-2 mx-2",
                  isActive
                    ? "bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
                )}
                title={collapsed ? item.title : undefined}
                onClick={onMobileToggle}
              >
                {item.icon && (
                  <item.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive ? "text-blue-800 dark:text-blue-200" : "text-gray-400 dark:text-gray-500",
                      collapsed ? "" : "mr-3",
                    )}
                    aria-hidden="true"
                  />
                )}
                {!collapsed && (
                  <span className="truncate">
                    {item.title}
                    {isActive && (
                      <span className="sr-only">(current)</span>
                    )}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-800 space-y-1">
          {/* Settings Link */}
          <Link
            href="/settings"
            className={cn(
              "flex items-center text-sm font-medium rounded-lg transition-colors group",
              collapsed ? "px-3 py-3 justify-center" : "px-3 py-2 mx-2",
              pathname === "/settings"
                ? "bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
            )}
            title={collapsed ? "Settings" : undefined}
            onClick={onMobileToggle}
          >
            <Settings
              className={cn(
                "h-5 w-5 flex-shrink-0",
                pathname === "/settings" ? "text-blue-800 dark:text-blue-200" : "text-gray-400 dark:text-gray-500",
                collapsed ? "" : "mr-3",
              )}
              aria-hidden="true"
            />
            {!collapsed && "Settings"}
          </Link>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className={cn(
              "w-full flex items-center text-sm font-medium rounded-lg transition-colors group",
              collapsed ? "px-3 py-3 justify-center" : "px-3 py-2 mx-2",
              "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
            )}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut
              className={cn(
                "h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500",
                collapsed ? "" : "mr-3",
              )}
              aria-hidden="true"
            />
            {!collapsed && "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}