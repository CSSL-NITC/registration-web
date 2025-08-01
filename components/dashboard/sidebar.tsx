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
}

export function Sidebar({ onLogout, collapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
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
              <div className="relative w-32 h-10"> {/* Adjust width/height as needed */}
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
          {/* Collapse toggle - desktop only */}
          <div className="hidden lg:block ml-auto">
            <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="p-1">
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {user && SIDENAV_ITEMS.filter((item: SideNavItem) => AppUtil.hasAnyPrivilege(
            user.privileges ?? [],
            item.privileges ?? [],
          )).map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.title}
                href={item.path}
                className={cn(
                  "flex items-center text-sm font-medium rounded-lg transition-colors group",
                  collapsed ? "px-3 py-3 justify-center" : "px-3 py-2",
                  isActive
                    ? "bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
                )}
                title={collapsed ? item.title : undefined}
              >
                {item.icon && (
                  <item.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive ? "text-blue-800 dark:text-blue-200" : "text-gray-400 dark:text-gray-500",
                      collapsed ? "" : "mr-3",
                    )}
                  />
                )}
                {!collapsed && <span className="truncate">{item.title}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
          <Button
            variant="ghost"
            onClick={onLogout}
            className={cn(
              "justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
              collapsed ? "w-full px-3 py-3" : "w-full justify-start",
            )}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className={cn("h-5 w-5 flex-shrink-0", collapsed ? "" : "mr-3")} />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </div>
    </div>
  )
}