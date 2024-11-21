"use client"
import Image from "next/image"
import { useEffect, useRef } from "react"

export default function PartnerLogosSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += 1
      }
    }

    const timer = setInterval(scroll, 30)
    return () => clearInterval(timer)
  }, [])

  const logos = [
    { name: "Family Medicine Clinic & Women's Health", src: "/placeholder.svg?height=60&width=200" },
    { name: "Clinical Revenue Streams", src: "/placeholder.svg?height=60&width=200" },
    { name: "Health Center", src: "/placeholder.svg?height=60&width=200" },
    { name: "Serimed", src: "/placeholder.svg?height=60&width=200" },
    { name: "Humble Family Practice", src: "/placeholder.svg?height=60&width=200" },
    // Duplicate logos for continuous scroll effect
    { name: "Family Medicine Clinic & Women's Health", src: "/placeholder.svg?height=60&width=200" },
    { name: "Clinical Revenue Streams", src: "/placeholder.svg?height=60&width=200" },
    { name: "Health Center", src: "/placeholder.svg?height=60&width=200" },
    { name: "Serimed", src: "/placeholder.svg?height=60&width=200" },
    { name: "Humble Family Practice", src: "/placeholder.svg?height=60&width=200" },
  ]

  return (
    <section className="py-12 bg-gray-50 flex justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Our Trusted Partners</h2>
          <p className="max-w-[600px] text-gray-500 md:text-lg">
            We work with leading healthcare institutions and insurance providers to ensure comprehensive care for our patients
          </p>
        </div>
        
        <div className="mt-12 relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />
          
          {/* Scrolling logos container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden gap-8 items-center py-4"
          >
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={200}
                  height={60}
                  className="h-[60px] w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}