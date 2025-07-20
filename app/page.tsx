"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeroSlider } from "@/components/hero-slider"
import { GallerySlider } from "@/components/gallery-slider"
import { ModernSponsors } from "@/components/modern-sponsors"
import {
  Calendar,
  Users,
  Building2,
  Star,
  CheckCircle,
  ArrowRight,
  MapPin,
  Award,
  Globe,
  Download,
  ExternalLink,
  Eye,
  Trophy,
  Camera,
  Zap,
  Shield,
  Clock,
  Menu,
  X,
  DollarSign,
} from "lucide-react"
import {
  EVENT_SCHEDULE,
  NITC_AWARDS,
  DIGITAL_INVESTMENT_SUMMIT,
  EVENT_GALLERY,
  ABOUT_CSSL,
} from "@/lib/constants/conference-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const packages = [
    {
      id: "day1",
      name: "Day 1 - Inauguration",
      price: 20000,
      usdPrice: 67,
      originalPrice: 20000,
      description: "Premium opening day with industry leaders",
      features: [
        "Opening ceremony access",
        "Keynote speeches",
        "Welcome reception",
        "Networking lunch",
        "Conference materials",
        "Certificate of attendance",
      ],
      popular: false,
    },
    {
      id: "day1-2",
      name: "NITC Conference Day 01 (Day 02)",
      price: 35000,
      usdPrice: 117,
      originalPrice: 35000,
      description: "Day 1 plus technical sessions",
      features: [
        "All Day 1 benefits",
        "Technical sessions Day 2",
        "Workshop access",
        "Panel discussions",
        "Networking events",
        "Digital resources access",
      ],
      popular: false,
    },
    {
      id: "day2-3",
      name: "NITC Conference Day 02 (Day 03)",
      price: 35000,
      usdPrice: 117,
      originalPrice: 35000,
      description: "Advanced technical sessions and innovation",
      features: [
        "Day 3 specialized tracks",
        "Innovation workshops",
        "Startup showcase",
        "Technology exhibitions",
        "Expert panel discussions",
        "Networking sessions",
      ],
      popular: false,
    },
    {
      id: "all3",
      name: "Full Conference with Inauguration (All 3 Days)",
      price: 50000,
      usdPrice: 167,
      originalPrice: 50000,
      description: "Complete conference experience with all benefits",
      features: [
        "All previous benefits",
        "VIP networking events",
        "Exclusive workshops",
        "Priority seating",
        "All meal sessions",
        "1-year digital access",
        "Special recognition",
        "Premium conference kit",
      ],
      popular: true,
    },
  ]

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price * (1 - discount / 100)
  }

  const calculateDiscountedUSD = (usdPrice: number, discount: number) => {
    return Math.round(usdPrice * (1 - discount / 100))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-800 to-indigo-800 dark:from-blue-600 dark:to-indigo-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">NIT Conference</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">2025</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#about"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 transition-colors font-medium"
              >
                About
              </Link>
              <Link
                href="#schedule"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Schedule
              </Link>
              <Link
                href="#awards"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Awards
              </Link>
              <Link
                href="#sponsors"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Sponsors
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />
              <Link href="/register">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white dark:border-blue-400 dark:text-blue-400 bg-transparent transition-all duration-200"
                >
                  Register
                </Button>
              </Link>
              <Link href="/company-login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white dark:border-blue-400 dark:text-blue-400 bg-transparent transition-all duration-200"
                >
                  Company
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-800 to-indigo-800 hover:from-blue-900 hover:to-indigo-900 dark:from-blue-600 dark:to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Admin
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="#about"
                  className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="#schedule"
                  className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Schedule
                </Link>
                <Link
                  href="#awards"
                  className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Awards
                </Link>
                <Link
                  href="#sponsors"
                  className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sponsors
                </Link>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 space-y-2">
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white dark:border-blue-400 dark:text-blue-400 bg-transparent"
                    >
                      Register
                    </Button>
                  </Link>
                  <Link href="/company-login" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white dark:border-blue-400 dark:text-blue-400 bg-transparent"
                    >
                      Company
                    </Button>
                  </Link>
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-800 to-indigo-800 hover:from-blue-900 hover:to-indigo-900 dark:from-blue-600 dark:to-indigo-600"
                    >
                      Admin
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Modern Slider */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/5 via-indigo-800/5 to-purple-800/5 dark:from-blue-600/10 dark:via-indigo-600/10 dark:to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                43rd National IT Conference
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Nation IT Conference{" "}
                <span className="bg-gradient-to-r from-blue-800 to-indigo-800 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  2025
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Join Sri Lanka's premier technology conference. Three days of innovation, networking, and cutting-edge
                insights from industry leaders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-800 to-indigo-800 hover:from-blue-900 hover:to-indigo-900 dark:from-blue-600 dark:to-indigo-600 px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Register Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-3 text-lg border-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-slate-900 bg-transparent transition-all duration-200"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                  <Calendar className="w-5 h-5 text-blue-800 dark:text-blue-400" />
                  <span className="font-medium">March 15-17, 2025</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-800 dark:text-blue-400" />
                  <span className="font-medium">Shangri-La Hotel, Colombo</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                  <Users className="w-5 h-5 text-blue-800 dark:text-blue-400" />
                  <span className="font-medium">500+ Attendees</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <HeroSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Attend NIT Conference 2025?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of technology with industry experts, innovative solutions, and networking
              opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:bg-slate-800 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-800 to-indigo-800 dark:from-blue-600 dark:to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Cutting-Edge Technology</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Explore the latest in AI, blockchain, cloud computing, and emerging technologies shaping the future.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:bg-slate-800 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Expert Speakers</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Learn from industry leaders, tech innovators, and thought leaders from around the world.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:bg-slate-800 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Networking</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Connect with peers, potential partners, and industry professionals in structured networking sessions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:bg-slate-800 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Corporate Packages</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Special packages for companies with bulk registration, centralized billing, and team management.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:bg-slate-800 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">CSSL Partnership</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Official partnership with Computer Society of Sri Lanka. Special discounts for CSSL members.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:bg-slate-800 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Seamless Experience</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Quick and easy entry with personalized QR codes. No queues, no hassle, just smooth access.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conference Pricing */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Conference Pricing</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose the package that best fits your needs with flexible attendance options
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {(packages || []).map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-slate-800 hover:scale-105 ${
                  pkg.popular
                    ? "ring-2 ring-blue-500 ring-offset-4 dark:ring-offset-slate-800 transform lg:scale-110"
                    : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-semibold shadow-lg animate-pulse">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-800 to-indigo-800 dark:from-blue-600 dark:to-indigo-600" />
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{pkg.description}</p>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-blue-800 dark:text-blue-400">
                        LKR {pkg.price.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-center space-x-1 text-gray-500 dark:text-gray-400">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-lg font-semibold">${pkg.usdPrice}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">per person</p>
                  </div>

                  <Link href="/register" className="block">
                    <Button
                      className={`w-full ${
                        pkg.popular
                          ? "bg-gradient-to-r from-blue-800 to-indigo-800 hover:from-blue-900 hover:to-indigo-900 shadow-lg"
                          : "bg-blue-800 hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-700"
                      } transition-all duration-200`}
                    >
                      Select Package
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Discounts Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Special Offers & Discounts
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Save more with our exclusive membership and early bird discounts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 dark:bg-slate-800 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">CSSL Members</h3>
                <p className="text-green-600 dark:text-green-300 mb-4">Computer Society of Sri Lanka</p>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">20% OFF</div>
                <p className="text-green-700 dark:text-green-300 mb-6">
                  Exclusive discount for CSSL members. Must provide valid membership ID during registration.
                </p>
                <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800">
                  Membership Required
                </Badge>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 dark:bg-slate-800 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500" />
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-orange-800 dark:text-orange-400 mb-2">Early Bird Special</h3>
                <p className="text-orange-600 dark:text-orange-300 mb-4">Limited time offer</p>
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-4">15% OFF</div>
                <p className="text-orange-700 dark:text-orange-300 mb-6">
                  Available for non-CSSL members who register before the deadline. Don't miss out!
                </p>
                <Badge className="bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-800">
                  Limited Time
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Discount Examples */}
          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Pricing Examples with Discounts
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-900 dark:text-white">Package</th>
                    <th className="text-right py-3 px-4 text-gray-900 dark:text-white">Original Price</th>
                    <th className="text-right py-3 px-4 text-gray-900 dark:text-white">CSSL Member (20% off)</th>
                    <th className="text-right py-3 px-4 text-gray-900 dark:text-white">Early Bird (15% off)</th>
                  </tr>
                </thead>
                <tbody>
                  {(packages || []).map((pkg) => (
                    <tr key={pkg.id} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{pkg.name}</td>
                      <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                        <div>LKR {pkg.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">${pkg.usdPrice}</div>
                      </td>
                      <td className="py-3 px-4 text-right text-green-600 dark:text-green-400 font-semibold">
                        <div>LKR {calculateDiscountedPrice(pkg.price, 20).toLocaleString()}</div>
                        <div className="text-sm">${calculateDiscountedUSD(pkg.usdPrice, 20)}</div>
                      </td>
                      <td className="py-3 px-4 text-right text-orange-600 dark:text-orange-400 font-semibold">
                        <div>LKR {calculateDiscountedPrice(pkg.price, 15).toLocaleString()}</div>
                        <div className="text-sm">${calculateDiscountedUSD(pkg.usdPrice, 15)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Event Schedule Section */}
      <section
        id="schedule"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-blue-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Event Schedule</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Three days of comprehensive programming</p>
            <Link href="/nitc-agenda.pdf" target="_blank">
              <Button className="bg-blue-800 hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
                <Download className="mr-2 h-4 w-4" />
                Download Full Agenda (PDF)
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.entries(EVENT_SCHEDULE).map(([key, day]) => (
              <Card
                key={key}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-slate-800 hover:scale-105"
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-800 to-indigo-800 dark:from-blue-600 dark:to-indigo-600" />
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{day.title}</h3>
                    <p className="text-blue-800 dark:text-blue-400 font-semibold mb-1">{day.date}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{day.time}</p>
                  </div>

                  <div className="space-y-3">
                    {(day.events || []).map((event, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-16 text-xs text-blue-800 dark:text-blue-400 font-medium flex-shrink-0 mt-1">
                          {event.time}
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">{event.event}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* NITC Awards Section */}
<section id="awards" className="py-20 bg-white dark:bg-slate-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">NITC Awards 2025</h2>
      <p className="text-xl text-gray-600 dark:text-gray-300">Recognizing excellence in technology innovation</p>
    </div>

    {/* Main Awards Intro */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-blue-800 to-indigo-800 dark:from-blue-600 dark:to-indigo-600 text-white border-0 px-4 py-2 text-sm">
                <Trophy className="w-4 h-4 mr-2" />
                Excellence in Technology
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Celebrating Innovation & Achievement
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                The NITC Awards program recognizes outstanding achievements in technology innovation, entrepreneurship,
                and digital transformation across Sri Lanka. Join us in celebrating the pioneers who are shaping the
                future of technology in our nation.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                With multiple categories spanning innovation, startups, digital transformation, and sustainable
                technology, these awards provide a platform for recognizing excellence and inspiring the next generation
                of technology leaders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-800 to-indigo-800 hover:from-blue-900 hover:to-indigo-900 dark:from-blue-600 dark:to-indigo-600 px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                  asChild
                >
                  <Link href="https://awards.nitconf.lk/apply" target="_blank">
                    <Trophy className="mr-2 h-5 w-5" />
                    Apply Now
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white dark:border-blue-400 dark:text-blue-400 bg-transparent px-6 py-3 transition-all duration-200"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  View Details
                </Button>
              </div>
            </div>
            <div className="relative">
              <Card className="border-0 shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-800 to-indigo-800 dark:from-blue-600 dark:to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">NITC Awards 2025</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Excellence in Technology</p>
                  </div>
                </div>
              </Card>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Star className="w-8 h-8 text-yellow-800" />
              </div>
            </div>
          </div>

    {/* Award Categories Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {(NITC_AWARDS?.categories || []).map((category) => (
        <Card
          key={category.id}
          className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-slate-800 group hover:scale-105"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-800 to-indigo-800 dark:from-blue-600 dark:to-indigo-600" />
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-800 to-indigo-800 dark:from-blue-600 dark:to-indigo-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {(category.awards || []).map((award, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <Award className="w-4 h-4 text-blue-800 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{award.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <Link href={category.applyUrl} target="_blank" className="flex-1">
                <Button
                  className="w-full bg-gradient-to-r from-blue-800 to-indigo-800 hover:from-blue-900 hover:to-indigo-900 dark:from-blue-600 dark:to-indigo-600 transition-all duration-200"
                  size="sm"
                >
                  Apply Now
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 dark:border-gray-600 bg-transparent"
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{category.title}</DialogTitle>
                    <DialogDescription>{category.description}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Award Categories:</h4>
                      <div className="space-y-2">
                        {(category.awards || []).map((award, index) => (
                          <div key={index} className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                            <p className="font-medium">{award.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{award.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Link href={category.applyUrl} target="_blank" className="flex-1">
                        <Button className="w-full">
                          Apply Now
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

      {/* Digital Investment Summit */}
      <section
        id="summit"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-blue-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {DIGITAL_INVESTMENT_SUMMIT.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{DIGITAL_INVESTMENT_SUMMIT.subtitle}</p>
            <p className="text-gray-700 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {DIGITAL_INVESTMENT_SUMMIT.description}
            </p>
          </div>

          <Card className="mx-auto max-w-3xl border-0 shadow-xl dark:bg-slate-800 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Summit Features</h3>
              <ul className="space-y-4">
                {(DIGITAL_INVESTMENT_SUMMIT.features || []).map((feature) => (
                  <li key={feature} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-center">
                <Link href={DIGITAL_INVESTMENT_SUMMIT.registerUrl} target="_blank">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Register for Summit
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Event Gallery */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Event Gallery</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Highlights from previous conferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {(EVENT_GALLERY?.images || []).map((image) => (
              <Card
                key={image.id}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-slate-800 group overflow-hidden hover:scale-105"
              >
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-blue-800 dark:text-blue-400" />
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <GallerySlider images={[image.url, image.url, image.url]} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section
        id="sponsors"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-blue-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Valued Sponsors</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Partnering with industry leaders to make this conference possible
            </p>
          </div>
          <ModernSponsors />
        </div>
      </section>

      {/* About CSSL */}
      <section id="about" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800 px-4 py-2">
                <Building2 className="w-4 h-4 mr-2" />
                About CSSL
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{ABOUT_CSSL.title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{ABOUT_CSSL.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {(ABOUT_CSSL.achievements || []).map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>

              <Link href={ABOUT_CSSL.website} target="_blank">
                <Button className="bg-gradient-to-r from-blue-800 to-indigo-800 hover:from-blue-900 hover:to-indigo-900 dark:from-blue-600 dark:to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-200">
                  Learn More About CSSL
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Card className="border-0 shadow-2xl overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-800 to-indigo-800 dark:from-blue-600 dark:to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">CSSL</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Computer Society of Sri Lanka</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">NIT Conference</h3>
                  <p className="text-gray-400 text-sm">2025</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Sri Lanka's premier technology conference bringing together innovators, entrepreneurs, and industry
                leaders.
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Shangri-La Hotel, Colombo, Sri Lanka</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/register" className="block text-gray-400 hover:text-white transition-colors">
                  Register
                </Link>
                <Link href="/pricing" className="block text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="#schedule" className="block text-gray-400 hover:text-white transition-colors">
                  Schedule
                </Link>
                <Link href="#awards" className="block text-gray-400 hover:text-white transition-colors">
                  Awards
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">For Companies</h4>
              <div className="space-y-2">
                <Link href="/company-login" className="block text-gray-400 hover:text-white transition-colors">
                  Company Portal
                </Link>
                <Link href="/pricing" className="block text-gray-400 hover:text-white transition-colors">
                  Bulk Registration
                </Link>
                <Link href="#sponsors" className="block text-gray-400 hover:text-white transition-colors">
                  Sponsorship
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>Email: info@nitconf.lk</p>
                <p>Phone: +94 11 234 5678</p>
                <p>Website: www.nitconf.lk</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Nation IT Conference. All rights reserved. Organized by Computer Society of Sri Lanka (CSSL).
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
