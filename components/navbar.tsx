"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ExternalLink } from "lucide-react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Schedule", href: "#schedule" },
    { name: "Awards", href: "#awards" },
    { name: "Gallery", href: "#gallery" },
    { name: "Pricing", href: "#pricing" },
    { name: "Sponsors", href: "#sponsors" },
  ]

  return (
    <nav className={`fixed w-full top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0a1440]/90 border-white/10' 
        : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image 
              src="https://res.cloudinary.com/djxtjt1uf/image/upload/v1753804463/NITC-Logo-7c1f04fc_qobxl1.png" 
              alt="NITC 2025 Logo" 
              width={70} 
              height={70} 
              className="h-14 w-auto" 
            />
          </div>
          
          {/* Centered Menu - Desktop */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="relative text-white font-medium group transition-colors"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className="relative">
                  {link.name}
                  <span className={`
                    absolute left-0 -bottom-1 w-full h-0.5 bg-white
                    transition-all duration-300 transform origin-left
                    ${hoveredLink === link.name ? 'scale-x-100' : 'scale-x-0'}
                  `}></span>
                </span>
              </Link>
            ))}
          </div>
          
          {/* Right Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button 
              variant="ghost" 
              className="relative text-white hover:border hover:border-white hover:bg-transparent hover:rounded-full"
            >
              <span className="relative z-10">Login</span>
            </Button>
          </Link>
            <Link href="#digital-investment-summit">
              <Button className="bg-white text-[#0a1440] font-semibold rounded-full px-6 py-2 shadow transition-all duration-300 transform-gpu hover:scale-105 hover:border hover:border-white hover:text-white hover:bg-transparent hover:shadow-xl focus-visible:scale-105 focus-visible:shadow-xl">
                Digital Investment Summit
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* <ThemeToggle /> */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2 text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-black/80 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-white hover:text-blue-300 hover:bg-white/10 rounded-md transition-colors relative group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute left-3 right-3 -bottom-1 h-0.5 bg-blue-300 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </span>
                </Link>
              ))}
              <div className="border-t border-white/20 pt-3 mt-3 space-y-2">
                <Link 
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-transparent text-white font-medium hover:bg-white/10">
                    Login
                  </Button>
                </Link>
                <Link 
                  href="#digital-investment-summit" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-white text-[#0a1440] font-semibold rounded-full px-6 py-2 transition-all duration-300 transform-gpu hover:scale-105 hover:bg-blue-100 hover:shadow-xl focus-visible:scale-105 focus-visible:shadow-xl">
                    Digital Investment Summit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}