import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <section className="relative ">
        
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat h-full mt-20"
          style={{
            backgroundImage:
              'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eoujAy8MfM8IIKG7Gzi2vpO7XUStbo.png")',
          }}
        >
          <div className="absolute inset-0 bg-blue-950/10" />
        </div>
        <div className="relative top-11 mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8">
          <div className="max-w-xl text-left">
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
              Expert Healthcare
              <strong className="block font-extrabold text-sky-400">
                When You Need It Most
              </strong>
            </h1>
            <p className="mt-4 max-w-lg sm:text-xl/relaxed text-white">
            People are exceptional for us and delivering exceptional services are our culture
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/doctors">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg">
                  Book Appointment
                </Button>
              </Link>
          
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
