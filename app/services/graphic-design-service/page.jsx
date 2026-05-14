import ServiceDetail from "@/components/sections/ServiceDetail";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Graphic Design — Devspark Studio",
  description:
    "Identity systems, packaging, marketing creative, and motion that make a brand feel made — not assembled.",
};

const data = {
  kicker: "Service / 03 — Graphic Design",
  title: "Brand work that feels",
  highlight: "made",
  trailing: ", not assembled.",
  description:
    "Identity systems, packaging, illustration, and motion — built to survive a decade and at least three rebrands.",
  accent: "lime",
  outcomes: [
    { value: "120+", label: "Identities shipped" },
    { value: "30d", label: "Avg. brand build" },
    { value: "100%", label: "Original illustration" },
    { value: "AA+", label: "Accessibility-aware" },
  ],
  deliverables: [
    {
      title: "Complete brand identity systems",
      body: "Logo systems, type, palette, motion principles, and a guidelines doc your team will actually open more than once.",
    },
    {
      title: "Premium packaging + label design",
      body: "Shelf-stopping packaging with the structural and print specs your manufacturer needs — not just hero renders.",
    },
    {
      title: "Custom illustration + iconography",
      body: "Bespoke marks for product, marketing, and editorial. No stock libraries, no auto-traced AI art.",
    },
    {
      title: "Motion graphics + brand films",
      body: "Logo motion, social cuts, hero loops, and product launch films — designed in lockstep with the identity.",
    },
    {
      title: "High-end marketing campaigns",
      body: "OOH, social, paid — campaign creative that respects the brand and earns the click.",
    },
    {
      title: "Environmental + experiential",
      body: "Office signage, event design, and physical surfaces where the brand has to hold up at full scale.",
    },
  ],
  stack: [
    "Figma",
    "Illustrator",
    "Photoshop",
    "After Effects",
    "Cinema 4D",
    "Cavalry",
    "Glyphs",
    "Lottie",
  ],
  process: [
    {
      title: "Discovery",
      body: "We sit with the brand — origin, audience, what makes it weird. Most of the answers we need are already in your founders' heads.",
    },
    {
      title: "Strategy + positioning",
      body: "The verbal core: voice, manifesto, name (if needed). Strategy and design happen on the same wall, not in sequence.",
    },
    {
      title: "Identity design",
      body: "Logo systems, type, palette, motion. We present two distinct directions — never seven — and refine from there.",
    },
    {
      title: "Application + system",
      body: "Packaging, social, web hero, brand film, swag. The proofs that show whether the identity actually works.",
    },
    {
      title: "Handoff + guidelines",
      body: "A working file plus a living guidelines doc. Plus a Loom for whoever inherits the brand a year from now.",
    },
  ],
  nextServices: [
    {
      slug: "ui-ux-design-service",
      title: "UI / UX Design",
      tagline: "The product layer where the brand has to actually work.",
    },
    {
      slug: "web-development-service",
      title: "Web Development",
      tagline: "Marketing sites and launch surfaces that match the identity.",
    },
  ],
};

const faqs = [
  {
    q: "Do you do logo-only projects?",
    a: "Rarely — a logo is the easiest piece to design and the hardest to land in isolation. We'll happily do a focused identity sprint that includes the logo, type, palette, and a few applications.",
  },
  {
    q: "Can you art-direct a campaign with external photographers?",
    a: "Yes — art direction, casting, mood boards, on-set direction, retouching. We'll bring in our preferred photographers or work with yours.",
  },
  {
    q: "Do you provide guidelines and brand documentation?",
    a: "Always. Every identity ships with a Figma-native guidelines doc, asset library, and a Loom walkthrough for new team members.",
  },
  {
    q: "What about rebrands of existing brands?",
    a: "Roughly half our identity work is rebranding. We start with an audit — what to preserve, what to retire — and design the transition as carefully as the destination.",
  },
];

export default function GraphicDesignPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <ServiceDetail data={data} />
      <FAQ
        kicker="FAQ / Brand"
        heading="What brand teams ask first."
        items={faqs}
      />
      <CTASection
        title="Got a brand that needs"
        highlight="rebuilding?"
        trailing="Let's talk."
        description="Send a few lines on where the brand is now and where it's going. We'll come back within one business day."
      />
      <Footer />
    </main>
  );
}
