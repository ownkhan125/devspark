import LegalShell from "@/components/LegalShell";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Accessibility — Devspark Studio",
  description:
    "Our accessibility commitments, conformance standards, and how to flag issues you find.",
};

const sections = [
  {
    id: "commitment",
    heading: "Our commitment",
    body: [
      "Devspark Studio designs and ships work that is usable by as many people as possible — including people who rely on assistive technology, low-bandwidth connections, or non-standard input devices.",
      "We treat accessibility as a craft requirement, not a checkbox. It's part of every project from kickoff, not bolted on at QA.",
    ],
  },
  {
    id: "standard",
    heading: "Conformance standard",
    body: [
      "We target WCAG 2.2 Level AA as the minimum baseline for every project we ship — our own site included. Where projects allow, we push for Level AAA in critical flows.",
    ],
  },
  {
    id: "what-we-do",
    heading: "What we ship by default",
    body: [
      "On every Devspark engagement, the following are baked into the work — not an upgrade or a paid add-on:",
    ],
    list: [
      "Semantic HTML and ARIA landmarks across all surfaces.",
      "Visible focus states and a logical keyboard tab order.",
      "Colour contrast that meets or exceeds WCAG AA, validated in CI.",
      "Reduced-motion fallbacks for every meaningful animation.",
      "Captioning and transcripts for any video we produce.",
      "Manual testing with NVDA, VoiceOver, and macOS Voice Control before launch.",
    ],
  },
  {
    id: "this-site",
    heading: "About this site",
    body: [
      "This site is audited quarterly. Known limitations: the magnetic cursor effect is disabled on touch devices and respects prefers-reduced-motion; the marquee components pause on focus.",
      "If something feels off — focus order, contrast, motion — we'd love to know. Email accessibility@devspark.studio and we'll respond within two business days.",
    ],
  },
  {
    id: "feedback",
    heading: "Feedback",
    body: [
      "Accessibility is a moving target. We update this page each time we ship a meaningful change. If our work — or yours — falls short for any reason, please tell us. We'd rather fix it than keep our score pretty.",
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <LegalShell
        kicker="Legal / Accessibility"
        title="Accessibility"
        highlight="statement"
        trailing="."
        description="Our accessibility commitments, conformance standards, and how to flag any issue you run into."
        updated="14 May 2026"
        sections={sections}
      />
      <Footer />
    </main>
  );
}
