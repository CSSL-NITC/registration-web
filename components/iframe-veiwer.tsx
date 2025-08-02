"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

interface IframeViewerProps {
  url: string
  open: boolean
  onClose: () => void
}

export function IframeViewer({ url, open, onClose }: IframeViewerProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = 'auto'
      document.body.style.touchAction = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
      document.body.style.touchAction = 'auto'
    }
  }, [open])

  const handleIframeLoad = () => {
    setIframeLoaded(true)
  }

  return (
    <div className="relative">
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) onClose()
    }}>
      <DialogContent
        className="p-0 overflow-hidden border-0 bg-transparent max-w-none w-screen h-[calc(100dvh-60px)] sm:max-w-[95vw] sm:max-h-[90vh] sm:rounded-xl"
      >
        {/* Mobile Close Button */}
        <div className="absolute top-4 right-4 z-50 sm:hidden">
          <button
            onClick={onClose}
            className="rounded-full p-2 bg-background/80 backdrop-blur-sm border shadow-sm"
            aria-label="Close payment dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Header for accessibility */}
        <DialogHeader className="sr-only">
          <DialogTitle>Payment Gateway</DialogTitle>
        </DialogHeader>

        {/* Loading Spinner */}
        {!iframeLoaded && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Loading payment gateway...</p>
            </div>
          </div>
        )}

        {/* Iframe */}
        <div className={`w-full h-full ${iframeLoaded ? 'block' : 'invisible'}`}>
          <iframe
            src={url}
            className="w-full h-full min-h-[calc(100dvh-60px)] sm:min-h-[90vh] border-0"
            allowFullScreen
            allow="payment *"
            loading="eager"
            onLoad={handleIframeLoad}
            style={{
              opacity: iframeLoaded ? 1 : 0,
              transition: 'opacity 300ms ease-in-out',
            }}
            title="Payment Gateway"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          />
        </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}
