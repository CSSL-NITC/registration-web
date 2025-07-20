"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const heroImages = [
  {
    id: 1,
    url: "/placeholder.svg?height=600&width=800&text=Conference+Hall+2024",
    title: "Main Conference Hall",
    description: "State-of-the-art venue with 500+ capacity",
    category: "Venue",
  },
  {
    id: 2,
    url: "/placeholder.svg?height=600&width=800&text=Keynote+Speaker+2024",
    title: "Keynote Sessions",
    description: "Industry leaders sharing insights",
    category: "Sessions",
  },
  {
    id: 3,
    url: "/placeholder.svg?height=600&width=800&text=Networking+Event+2024",
    title: "Networking Events",
    description: "Connect with technology professionals",
    category: "Networking",
  },
  {
    id: 4,
    url: "/placeholder.svg?height=600&width=800&text=Tech+Exhibition+2024",
    title: "Technology Exhibition",
    description: "Latest innovations on display",
    category: "Exhibition",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((current) => (current + 1) % heroImages.length)
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    setProgress(0)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
    setProgress(0)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900 to-indigo-900">
      {/* Images */}
      <div className="relative w-full h-full">
        {(heroImages || []).map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : index === (currentSlide - 1 + heroImages.length) % heroImages.length
                  ? "opacity-0 scale-105"
                  : "opacity-0 scale-95"
            }`}
          >
            <img src={image.url || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-2xl">
                <Badge className="mb-3 bg-white/20 text-white border-white/30 backdrop-blur-sm">{image.category}</Badge>
                <h3 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">{image.title}</h3>
                <p className="text-lg lg:text-xl opacity-90 leading-relaxed">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-6 right-6 flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm h-10 w-10"
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm h-12 w-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm h-12 w-12"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Slide Indicators with Progress */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {(heroImages || []).map((_, index) => (
          <button key={index} className="relative group" onClick={() => goToSlide(index)}>
            <div
              className={`w-12 h-1 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/40"}`}
            >
              {index === currentSlide && (
                <div
                  className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
        {currentSlide + 1} / {heroImages.length}
      </div>
    </div>
  )
}
