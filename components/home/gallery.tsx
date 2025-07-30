"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

const DURATION = 100 // seconds per loop

export function Gallery() {
  const [isHovered, setIsHovered] = useState(false)
  const controls1 = useAnimation()
  const controls2 = useAnimation()

  const row1Images = [
    { id: 1, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753863565/VIN_8324_sle3sx.jpg", alt: "Conference session" },
    { id: 2, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753863561/VIN_7857_ifqobl.jpg", alt: "Keynote speech" },
    { id: 3, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753863557/Minister_xp05j7.jpg", alt: "Networking event" },
    { id: 4, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753863553/VIN_9745_yxwrwq.jpg", alt: "Panel discussion" },
    { id: 5, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753863553/Mastercard_Mr._Sadun_ic3c7o.jpg", alt: "Panel discussion" },
    { id: 6, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753863537/VIN_9500_vzf0pa.jpg", alt: "Panel discussion" },
    { id: 7, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753863523/VIN_7863_tsv6pq.jpg", alt: "Panel discussion" },
    { id: 8, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753863518/482225782_936691098672405_6325915416407491625_n_j7iffq.jpg", alt: "Panel discussion" },
    { id: 9, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753863513/DMS_Mr._Lasantha_wftuul.jpg", alt: "Panel discussion" },
    { id: 10, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862407/VIN_9654_bskxxf.jpg", alt: "Panel discussion" },
    { id: 11, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862397/Maldives_Minister_ophy6h.jpg", alt: "Panel discussion" },
    { id: 12, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862396/VIN_9490_ohh4wh.jpg", alt: "Panel discussion" },
    { id: 13, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862395/Ministry_Adviser_dmfhcx.jpg", alt: "Panel discussion" },
    { id: 14, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862389/VIN_9490_1_oqw5be.jpg", alt: "Panel discussion" },
  ]

  const row2Images = [
    { id: 15, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862389/484076266_936691845338997_1477051100389345442_n_lf56a7.jpg", alt: "Panel discussion" },
    { id: 16, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862389/Ministry_Secretary_zkwtzk.jpg", alt: "Panel discussion" },
    { id: 17, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862387/482987475_936691052005743_2960590711557695158_n_jf5znz.jpg", alt: "Panel discussion" },
    { id: 18, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862379/484502483_936691412005707_6596441687341399027_n_gpww45.jpg", alt: "Panel discussion" },
    { id: 19, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862377/Prime_Minister_Secretary___Awards_mqmc87.jpg", alt: "Panel discussion" },
    { id: 20, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862376/Awards_2_da1yys.jpg", alt: "Panel discussion" },
    { id: 21, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862376/484455452_936691105339071_4958754842354105891_n_gflc6y.jpg", alt: "Panel discussion" },
    { id: 22, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862374/Awards_3_g7jzgu.jpg", alt: "Panel discussion" },
    { id: 23, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862373/482961275_936690985339083_5012980438034487690_n_i1byzs.jpg", alt: "Panel discussion" },
    { id: 24, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862373/482975895_936691718672343_6902061615608446611_n_gxauao.jpg", alt: "Panel discussion" },
    { id: 25, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862370/482981575_936691838672331_8658370284131489517_n_x34w36.jpg", alt: "Panel discussion" },
    { id: 26, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862370/482986361_936691725339009_6079977130589082684_n_glqyvr.jpg", alt: "Panel discussion" },
    { id: 27, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862369/SAT_z3lyrr.jpg", alt: "Panel discussion" },
    { id: 28, src: "https://res.cloudinary.com/djxtjt1uf/image/upload/v1753862369/482961305_936691805339001_4331480410631030077_n_ryuskl.jpg", alt: "Panel discussion" },
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