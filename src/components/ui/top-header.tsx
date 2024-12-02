import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        // Scroll down = hide, Scroll up = show
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // Cleanup
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);
  return (
    <div>
      <div
        className={`w-full bg-white border-b fixed top-0 z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex flex-col lg:flex-row items-center lg:justify-around px-4 space-y-2 sm:space-y-4 md:space-y-0 py-1 sm:py-2">
          {/* Left side - Logo */}
          <div className=" flex justify-start gap-10">
            <Link className="flex justify-start gap-10 " href="/">
              <Image
                src="/spandana_english.jpeg"
                alt="Hospital Logo"
                className="h-10 md:h-12 w-auto"
                width={200}
                height={100}
              />
            </Link>
            <Link className="flex justify-start gap-10 " href="/">
              <Image
                src="/spandana_telugu.png"
                alt="Hospital Logo"
                className="h-10 md:h-12 w-auto"
                width={200}
                height={100}
              />
            </Link>
          </div>

          {/* Right side - Contact Information */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full lg:w-auto">
            <ContactItem title="Book Appointment" number="+91 80 6215 3400" />
            <ContactItem title="Patient Care" number="+91 80 6215 3300" />
            <ContactItem
              title="Emergency Number"
              number="1800 123 1133"
              emergency
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({
  title,
  number,
  emergency,
}: {
  title: string;
  number: string;
  emergency?: boolean;
}) {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <span className="text-[10px] xs:text-xs md:text-sm text-gray-600 whitespace-nowrap">
        {title}
      </span>
      <div className="flex items-center gap-1">
        <Phone
          className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4"
          color={emergency ? "#dc2626" : "#4b5563"}
        />
        <span
          className={`text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap ${
            emergency ? "text-red-600" : "text-gray-700"
          }`}
        >
          {number}
        </span>
      </div>
    </div>
  );
}
