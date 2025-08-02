"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Settings, User, LogOut, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/contexts/auth-provider"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface AppBarProps {
  title: string
  subtitle?: string
  onMenuClick?: () => void
  onLogout: () => void
  showSearch?: boolean
}

export function AppBar({ title, subtitle, onMenuClick, onLogout, showSearch = true }: AppBarProps) {
  const [notifications] = useState(3) // Mock notification count
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Left Section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden" 
            onClick={onMenuClick}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Title - hidden on mobile when search is open */}
          <div className={cn(
            "transition-all duration-200",
            searchOpen ? "hidden md:block" : "block"
          )}>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Center Section - Search */}
        {showSearch && (
          <div className={cn(
            "absolute left-0 right-0 mx-4 transition-all duration-200 origin-top",
            searchOpen 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-95 pointer-events-none",
            "md:relative md:flex md:flex-1 md:max-w-md md:mx-8 md:opacity-100 md:scale-100"
          )}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 md:hidden"
                onClick={toggleSearch}
                aria-label="Close search"
              >
                <span className="text-sm">Cancel</span>
              </Button>
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Mobile Search Button - hidden when search is open */}
          {showSearch && (
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "md:hidden",
                searchOpen ? "hidden" : "flex"
              )}
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative hidden sm:flex"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                {notifications}
              </Badge>
            )}
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full"
                aria-label="User menu"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={user?.avatar || "/placeholder.svg?height=32&width=32"} 
                    alt={user?.name || "User"} 
                  />
                  <AvatarFallback>
                    {user?.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "US"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}