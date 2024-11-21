"use client"
import { testimonials } from "@/mocks/spandana"
import { AnimatedTestimonials } from "../../components/ui/animated-testimonials"
import { useGetAllDoctors } from "@/api"

export default function HeroDoctorsSection() {
  const {data } = useGetAllDoctors({
    variables: {
      tenantId: "spandana"
    }
  })
  console.log(data)
  

  return (
    <section className="pt-12 md:py-24 flex justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center ">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Doctors</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Meet our team of experienced healthcare professionals dedicated to providing you with the best medical care.
          </p>
        </div>
        <div>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </section>
  )
}