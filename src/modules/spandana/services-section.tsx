
"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { departments } from "@/mocks/departments"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"
import { useGetAllDepartments } from "@/api/departments"



export default function ServicesSection() {

  const {data} = useGetAllDepartments({
    variables:{
      tenantId: "spandana"
    }
  })
  console.log(data)

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Departments Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-[#3b5998] text-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Departments</h2>
            <nav className="space-y-3">
              {departments.map((department, index) => (
                <Link
                  key={index}
                  href="#"
                  className="block text-white/90 hover:text-white transition-colors"
                >
                  {department.title}
                </Link>
              ))}
              <Link
                href="#"
                className="block text-white/90 hover:text-white transition-colors font-medium"
              >
                View All
              </Link>
            </nav>
          </div>
        </div>

        {/* Services Content */}
        <div className="lg:w-3/4">
          <h1 className="text-3xl font-bold mb-8">Our Services</h1>
          <Carousel 
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          className="w-full">
            <CarouselContent>
              {departments.map((department, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-0">
                      <div className="relative w-full aspect-video">
                        <Image
                          src={department.image}
                          alt={department.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-[#3b5998] mb-2">
                          {department.title}
                        </h3>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                                {department.description}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{department.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Button variant="link" className="p-0 h-auto text-[#3b5998]">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-12 gap-2">
              <CarouselPrevious variant="outline" size="icon" className="static">
                <ArrowLeft className="h-4 w-4" />
              </CarouselPrevious>
              <CarouselNext variant="outline" size="icon" className="static">
                <ArrowRight className="h-4 w-4" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}