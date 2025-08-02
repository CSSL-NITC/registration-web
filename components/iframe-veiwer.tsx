"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IframeViewerProps {
  url: string
  onClose: () => void
}

export function IframeViewer({ url, onClose }: IframeViewerProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-white/90 hover:bg-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="aspect-video w-full">
          <iframe
            src={url}
            className="w-full h-full border-0"
            allowFullScreen
            loading="eager"
          />
        </div>
      </div>
    </div>
  )
}