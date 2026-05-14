import ServicesClient from "./ServicesClient";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Services — Devspark Studio",
  description:
    "Web, product, brand, and motion services delivered as one tight workshop. Strategy through launch — under one roof, on one-week sprints.",
};

const faqs = [
  {
    q: "What digital services do you offer?",
    a: "Web and product engineering (Next.js, headless commerce, custom apps), UI/UX design (design systems, dashboards, marketing flows), and brand identity (logo systems, motion, packaging). Most engagements are a blend of two or three.",
  },
  {
    q: "How do you ensure top quality and efficiency?",
    a: "One-week sprints, a single senior pod per project, weekly demos, and accessibility + performance gates baked into every release. We catch problems on Tuesday so we can ship on Friday.",
  },
  {
    q: "Can I request revisions?",
    a: "Yes — revisions are the work. Each scope includes structured review cycles, and we keep iterating on craft details until you'd put your name on it. We're transparent when a request changes scope, but most refinement is in-scope.",
  },
  {
    q: "How do I track progress?",
    a: "Shared Linear board, shared Figma file, and a dedicated Slack channel from kickoff. You get a Friday demo every week with a recorded walkthrough — no surprises, no status decks.",
  },
  {
    q: "How do I get started?",
    a: "Send a note via the contact form with what you're shipping, who it's for, and the rough timeline. We come back within one business day with a small plan and a calendar invite.",
  },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <ServicesClient />
      <FAQ
        kicker="FAQ / 05"
        heading="Common questions, straight answers."
        description="The five we get asked on every kickoff. If yours isn't here, ask us on the contact page."
        items={faqs}
      />
      <CTASection />
      <Footer />
    </main>
  );
}
