import AboutClient from "./AboutClient";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "About — Devspark Studio",
  description:
    "An independent design and engineering studio building expressive web, product, and brand experiences for ambitious teams.",
};

const faqs = [
  {
    q: "What kind of teams do you usually work with?",
    a: "Founders, operators, and product teams shipping something they actually care about — early-stage startups raising a seed, established brands re-platforming, and in-house teams that need a second engine for a sprint or two.",
  },
  {
    q: "How is Devspark different from a typical agency?",
    a: "We work in one-week sprints, share progress every Friday, and bill against scoped deliverables — not hours. The same three people who scope the project ship it, so nothing gets lost in a handoff.",
  },
  {
    q: "Do you take on full builds or just design / dev pieces?",
    a: "Both. We're happiest end-to-end — strategy, identity, product, code, launch — but we'll happily come in for a focused engagement (a new marketing site, a design system, a critical flow) when that's what you need.",
  },
  {
    q: "Where are you based, and do you work remotely?",
    a: "Our studio is in Rawalpindi, Pakistan. We work remotely with teams in North America, Europe, and the Middle East. Real-time overlap with most timezones, and async-first documentation always.",
  },
  {
    q: "How do I know if we're a good fit?",
    a: "Send us a note via the contact form with a few sentences about what you're shipping. We'll come back within one business day with a small plan, a price band, and a calendar invite — even if the answer is 'this isn't for us.'",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <AboutClient />
      <FAQ
        kicker="FAQ / 07"
        heading="The questions everyone asks first."
        description="The short version. Anything we missed lives one email away."
        items={faqs}
      />
      <CTASection />
      <Footer />
    </main>
  );
}
