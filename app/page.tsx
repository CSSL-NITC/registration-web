"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { Navbar } from "@/components/navbar"
import { NitcAwards } from "@/components/home/nitcAwards"
import { EventSchedule } from "@/components/home/eventSchedule";
import { EventHighlights } from "@/components/home/eventHighlights";
import { Hero } from "@/components/home/hero";
import { AboutConference } from "@/components/home/about";
import { DigitalInvestmentSummit } from "@/components/home/digitalInvestmentSummit";
import AboutCSSL from '@/components/home/aboutCSSL';
import { Footer } from '@/components/home/footer';
import { TicketPricing } from '@/components/home/ticketPricing';
import { Gallery } from '@/components/home/gallery';
import { SponsorsSection } from '@/components/home/sponsorsSection';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('inauguration');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <div className="min-h-screen" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Navigation */}
      <Navbar />

      <Hero />

      <div id="about">
        <AboutConference />
      </div>

      <EventHighlights />

      {/* Event Schedule Section */}
      <div id="schedule">
        <EventSchedule />
      </div>

      <div id="gallery">
        <Gallery />
      </div>

      <div id="awards">
        <NitcAwards />
      </div>

      <div id="pricing">
        <TicketPricing />
      </div>

      <div id="digital-investment-summit">
        <DigitalInvestmentSummit />
      </div>

      <AboutCSSL />
      
      <div id="sponsors">
        <SponsorsSection />
      </div>

      <Footer />

      
    </div>
  )
}
