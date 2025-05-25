'use client';

import CallToAction from "@/infrastructure/components/sections/CallToActions";
import Features from "@/infrastructure/components/sections/Features";
import Hero from "@/infrastructure/components/sections/Hero";
import HowItWorks from "@/infrastructure/components/sections/HowItWorks";
import MenusPreview from "@/infrastructure/components/sections/MenusPreview";
import RestaurantPreview from "@/infrastructure/components/sections/RestaurantPreviw";
import Testimonials from "@/infrastructure/components/sections/Testimonials";
import Footer from "@/infrastructure/layout/Footer";
import Header from "@/infrastructure/layout/Header";


export default function LoginPage() {

  return (
    <div className="">
      <Header />
      <main className="">
        <Hero />
        <MenusPreview />
        <RestaurantPreview />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
