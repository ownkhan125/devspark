import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Philosophy from "@/components/sections/Philosophy";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <Work />
      <Philosophy />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
