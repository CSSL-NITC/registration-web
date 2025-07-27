"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

const DURATION = 20 // seconds per loop

export function Gallery() {
  const [isHovered, setIsHovered] = useState(false)
  const controls1 = useAnimation()
  const controls2 = useAnimation()

  const row1Images = [
    { id: 1, src: "/gallery_1.png", alt: "Conference session" },
    { id: 2, src: "/gallery_2.png", alt: "Keynote speech" },
    { id: 3, src: "/gellery_3.png", alt: "Networking event" },
    { id: 4, src: "/gallery_4.png", alt: "Panel discussion" },
  ]

  const row2Images = [
    { id: 5, src: "/gallery_4.png", alt: "Panel discussion" },
    { id: 6, src: "/gallery_5.png", alt: "Award ceremony" },
    { id: 7, src: "/gallery_6.png", alt: "Workshop session" },
    { id: 8, src: "/gallery_7.png", alt: "Attendees networking" },
  ]

  useEffect(() => {
    let animationId: NodeJS.Timeout

    const loopAnimation = async (
      controls: any,
      direction: "left" | "right"
    ) => {
      const fromX = direction === "left" ? "0%" : "-50%"
      const toX = direction === "left" ? "-50%" : "0%"

      const runLoop = async () => {
        await controls.start({
          x: [fromX, toX],
          transition: {
            duration: DURATION,
            ease: "linear",
          },
        })
        controls.set({ x: fromX })
        if (!isHovered) animationId = setTimeout(runLoop, 10)
      }

      runLoop()
    }

    loopAnimation(controls1, "left")
    loopAnimation(controls2, "right")

    return () => {
      clearTimeout(animationId)
      controls1.stop()
      controls2.stop()
    }
  }, [isHovered])

  const renderRow = (
    images: { id: number; src: string; alt: string }[],
    controls: any,
    heightClass: string,
    widthClass: string,
    rowKey: string
  ) => (
    <motion.div
      className="flex w-max"
      animate={controls}
      initial={{ x: "0%" }}
    >
      {images.map((image, index) => (
        <div
          key={`${rowKey}-${image.id}-${index}`}
          className={`relative ${heightClass} ${widthClass} flex-shrink-0 overflow-hidden group`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            quality={100}
          />
        </div>
      ))}
    </motion.div>
  )

  // ✅ Row 1 - Standard duplicated
  const seamlessRow1 = [...row1Images, ...row1Images]

  // ✅ Row 2 - Prepend last image and duplicate
  const seamlessRow2 = [
    row2Images[row2Images.length - 1], // prepend last image
    ...row2Images,
    ...row2Images,
    row2Images[0], // optional: append first image for clean ending
  ]

  return (
    <section
      className="w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Row 1: left to right */}
      <div className="overflow-hidden">
        {renderRow(
          seamlessRow1, 
          controls1, 
          "h-[30vh] md:h-[50vh]", // Smaller height on mobile
          "w-[50vw] md:w-[25vw]", // Wider images on mobile
          "row1"
        )}
      </div>

      {/* Row 2: right to left */}
      <div className="overflow-hidden">
        {renderRow(
          seamlessRow2, 
          controls2, 
          "h-[30vh] md:h-[50vh]", // Smaller height on mobile
          "w-[40vw] md:w-[20vw]", // Wider images on mobile
          "row2"
        )}
      </div>
    </section>
  )
}