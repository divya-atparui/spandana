import HeroDoctorsSection from "@/modules/spandana/hero-doctors-section";
import HeroSection from "@/modules/spandana/hero-section";
import HospitalInfoSection from "@/modules/spandana/hospital-info-section";
import PartnerLogosSection from "@/modules/spandana/partner-logos-section";
import ServicesSection from "@/modules/spandana/services-section";
import StatsSection from "@/modules/spandana/stats-section";
import TestimonialsSection from "@/modules/spandana/testimonials-section";
import { Separator } from "@/components/ui/separator";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />

      <div className="my-4 mt-24" />

      <HospitalInfoSection />
      <Separator className="my-4" />
      <ServicesSection />
      <Separator className="my-4" />

      <TestimonialsSection />

      <StatsSection />
      <HeroDoctorsSection />
      <PartnerLogosSection />

    </div>
  );
};

export default LandingPage;
