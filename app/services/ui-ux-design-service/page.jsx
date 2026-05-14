import ServiceDetail from "@/components/sections/ServiceDetail";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "UI / UX Design — Devspark Studio",
  description:
    "Interfaces and journeys with a point of view — interactive prototypes, design systems, and dashboards your team can actually maintain.",
};

const data = {
  kicker: "Service / 02 — UI / UX Design",
  title: "Interfaces with a",
  highlight: "point",
  trailing: "of view.",
  description:
    "Pixel-perfect interface design, scalable design systems, and interactive prototypes that get stakeholders to yes faster.",
  accent: "iris",
  outcomes: [
    { value: "3.2×", label: "Avg. conversion lift" },
    { value: "62%", label: "Fewer support tickets" },
    { value: "10d", label: "From brief to clickable" },
    { value: "100%", label: "Design-system coverage" },
  ],
  deliverables: [
    {
      title: "Pixel-perfect interface design",
      body: "Type, hierarchy, motion, and edge cases. We design the unhappy paths with the same care as the happy one.",
    },
    {
      title: "Scalable design systems",
      body: "Tokens, components, and documentation built to live in Figma and ship in code — usually Tailwind or styled-system.",
    },
    {
      title: "High-fidelity interactive prototypes",
      body: "Real motion, real states, real data. Useful for stakeholder buy-in, usability testing, and Friday demos.",
    },
    {
      title: "Conversion-optimised landing pages",
      body: "Pages that earn their hosting bill. Built around copy, social proof, and a primary CTA — not stock illustrations.",
    },
    {
      title: "Responsive + adaptive UI",
      body: "Phone, tablet, desktop, and the giant 32-inch monitor your power users are quietly using. All of it.",
    },
    {
      title: "Dashboards + app interfaces",
      body: "Data-dense surfaces designed for daily use — keyboard shortcuts, density modes, and tables that actually scale.",
    },
  ],
  stack: [
    "Figma",
    "FigJam",
    "Framer",
    "Maze",
    "Lottie",
    "Tailwind",
    "Storybook",
    "Linear",
    "Notion",
  ],
  process: [
    {
      title: "Audit + intent",
      body: "We map the current experience, talk to users where it helps, and write down the three things this design has to nail.",
    },
    {
      title: "Architecture + flow",
      body: "Wireframes, journeys, and the structural decisions that decide whether the rest is easy or impossible.",
    },
    {
      title: "Visual + system",
      body: "Type scales, motion principles, components — built as a system, not a screen-by-screen race.",
    },
    {
      title: "Prototype + test",
      body: "Interactive prototypes you can click through; quick usability passes when the stakes warrant it.",
    },
    {
      title: "Handoff that works",
      body: "Tokens, documentation, and a Loom walkthrough. Engineering finds nothing surprising — and we're in the room either way.",
    },
  ],
  nextServices: [
    {
      slug: "web-development-service",
      title: "Web Development",
      tagline: "Where the design ships, fast, and stays fast.",
    },
    {
      slug: "graphic-design-service",
      title: "Graphic Design",
      tagline: "The brand layer that makes the UI feel made, not assembled.",
    },
  ],
};

const faqs = [
  {
    q: "Do you do user research?",
    a: "When it actually changes the design. We're not a research firm — we'll run usability sessions, surveys, and quick interviews when stakes warrant it, and skip the theatre when they don't.",
  },
  {
    q: "Can you work with our existing design system?",
    a: "Yes. We're happy to extend Material, Chakra, or your home-grown system. Our job becomes auditing the system, designing within its constraints, and proposing additions where it can't keep up.",
  },
  {
    q: "What deliverables do engineers actually get?",
    a: "Figma files with tokens and annotations, a Storybook stub for net-new components, plus a Loom walkthrough of the motion. Engineers shouldn't have to guess.",
  },
  {
    q: "Do you handle motion design?",
    a: "It's most of the job. Motion isn't an afterthought — page transitions, micro-interactions, and reduced-motion fallbacks are designed alongside the static comps.",
  },
];

export default function UIUXDesignPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <ServiceDetail data={data} />
      <FAQ
        kicker="FAQ / Design"
        heading="Design questions, answered."
        items={faqs}
      />
      <CTASection
        title="Want interfaces that"
        highlight="feel"
        trailing="inevitable?"
        description="Send a short brief on what you're shipping. We'll come back within one business day with a small plan."
      />
      <Footer />
    </main>
  );
}
