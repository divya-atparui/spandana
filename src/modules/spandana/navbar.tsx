"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import TopHeader from "@/components/ui/top-header";

import AnimatedButton from "@/components/ui/animated-button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/departments", label: "Departments" },
    { href: "/doctors", label: "Our Doctors" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={cn(
        "fixed  top-16 left-0 right-0 z-50 transition-all duration-300 font-sans",
        scrolled ? "top-0 left-0 right-0 bg-white shadow-md shadow-black/30" : "bg-violet-200"
      )}
    >
      <div className="">
        <TopHeader />
        <nav className="container mx-auto px-4 py-4">
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <AnimatedButton
                  key={item.href}
                  className={cn(
                    "px-4 py-2 transition-all duration-200",
                    scrolled
                      ? "text-gray-700 hover:text-violet-600"
                      : "text-black hover:text-white",
                    pathname === item.href && "bg-violet-700 text-white hover:text-white"
                  )}
                  textColor={
                  cn(
                      pathname === item.href
                      ? "text-white"
                     : "text-black hover:text-white",
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </AnimatedButton>
              ))}
            </div>
            <div>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-violet-600 
                          hover:from-blue-700 hover:to-violet-700 
                          text-white font-medium px-6 py-2 
                          rounded-md shadow-lg hover:shadow-xl 
                          transition-all duration-200"
              >
                <Link href="/doctors">Book Appointment</Link>
              </Button>
            </div>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 md:hidden"
                onClick={() => setIsOpen(true)}
              >
                <span className="sr-only">Toggle menu</span>
                {isOpen ? (
                  <X
                    className={cn(
                      "h-6 w-6",
                      scrolled ? "text-black" : "text-white"
                    )}
                  />
                ) : (
                  <Menu color="black" size={24} className={cn("h-16 w-16")} />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-xl font-medium">Menu</SheetTitle>
              <Separator className="my-4" />
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium hover:text-blue-600 hover:bg-violet-100 rounded-md px-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 w-full text-base"
                >
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    Book Appointment
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
