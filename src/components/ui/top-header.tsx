import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TopHeader() {
  return (
    <div className="w-full bg-white py-2 border-b">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4 space-y-4 md:space-y-0">
        {/* Left side - Logo */}
        <div className="w-full md:w-auto">
          <Link
            className="flex items-center justify-center md:justify-start gap-2 md:gap-4"
            href="/"
          >
            <Image
              src="/spandana_english.jpeg"
              alt="Hospital Logo"
              className="h-8 md:h-12 w-auto"
              width={200}
              height={100}
            />
            <Image
              src="/spandana_telugu.png"
              alt="Hospital Logo"
              className="h-8 md:h-12 w-auto"
              width={200}
              height={100}
            />
          </Link>
        </div>

        {/* Right side - Contact Information */}
        <div className="grid xs:grid-cols-3 grid-cols-1 gap-4 w-full lg:w-auto">
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
      <span className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
        {title}
      </span>
      <div className="flex items-center gap-1">
        <Phone
          className="h-3 w-3 md:h-4 md:w-4"
          color={emergency ? "#dc2626" : "#4b5563"}
        />
        <span
          className={`text-sm md:text-base font-semibold whitespace-nowrap ${
            emergency ? "text-red-600" : "text-gray-700"
          }`}
        >
          {number}
        </span>
      </div>
    </div>
  );
}
