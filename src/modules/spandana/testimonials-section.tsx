"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: "Sake Shanthi",
      title: "Product Manager",
      image: "/placeholder.svg?height=100&width=100",
      text: "My daughter has been admitted in spandana hospital in paediatric department. Diagnosed with viral fever and treatment was very good Thankyou so much spandana Hospital"
    },
    {
      name: "ADIANS",
      title: "Govt. Officer",
      image: "/placeholder.svg?height=100&width=100",
      text: "I got admitted in spandana hospital under Dr.Y.Sonia madam and had safe delivery ty so much madam ... Provided Good service and care and sisters and doctors responded immediately...ty spandan hospital..."
    },
    {
      name: "E.Rajiya Eeruru",
      title: "Private Employee",
      image: "/placeholder.svg?height=100&width=100",
      text: "I had good experience in spandana hospital because i had normal deliveey under Dr. Soniya madam thank you so much spandana hospital."
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Animated background */}
      <div 
        className="absolute inset-0  bg-cover bg-center"

        style={{
          animation: "moveBackground 30s linear infinite",
          backgroundImage:
          'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eoujAy8MfM8IIKG7Gzi2vpO7XUStbo.png")',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-white mb-12">Testimonials</h2>
        
        <div className="relative mx-auto max-w-2xl">
          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 z-20 flex -translate-y-1/2 justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)}
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setActiveIndex((current) => (current + 1) % testimonials.length)}
            >
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>

          {/* Testimonial cards */}
          <div className="relative h-[400px]">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className={`absolute inset-0 flex flex-col items-center p-6 text-center transition-all duration-500 ${
                  index === activeIndex
                    ? "opacity-100 translate-x-0"
                    : index < activeIndex
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                }`}
              >
                <img
                  src={testimonial.image}
                  alt=""
                  className="h-24 w-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{testimonial.title}</p>
                <p className="text-muted-foreground">{testimonial.text}</p>
              </Card>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === activeIndex ? "bg-white w-4" : "bg-white/50"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="sr-only">Go to testimonial {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes moveBackground {
          0% {
            transform: scale(1.1) translate(0, 0);
          }
          25% {
            transform: scale(1.1) translate(-2%, -2%);
          }
          50% {
            transform: scale(1.1) translate(2%, 2%);
          }
          75% {
            transform: scale(1.1) translate(-2%, 2%);
          }
          100% {
            transform: scale(1.1) translate(0, 0);
          }
        }
      `}</style>
    </div>
  )
}