import ContactClient from "./ContactClient";
import Footer from "@/components/sections/Footer";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Contact — Devspark Studio",
  description:
    "Tell us about the project. We'll come back within one business day with a small plan, a price band, and a calendar invite.",
};

const faqs = [
  {
    q: "How fast do you reply?",
    a: "Within one business day, Monday through Friday. If we can't take the project on, we'll usually tell you in the same reply — and often refer you to someone who can.",
  },
  {
    q: "Do you do paid discovery calls?",
    a: "The first call is free. If the project needs a deeper paid discovery sprint to scope properly, we'll say so up front — that fee is credited against the engagement if you move forward.",
  },
  {
    q: "What information helps your reply most?",
    a: "A few sentences on what you're shipping, who it's for, a rough timeline, and any links — current site, deck, Figma. We don't need a perfect brief; we just need enough to give you a useful answer.",
  },
  {
    q: "Do you sign NDAs before kickoff?",
    a: "Yes — happy to sign a mutual NDA before any deep-dive call. We'd just rather not sign one to confirm we exist.",
  },
];

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <ContactClient />
      <FAQ
        kicker="FAQ / Contact"
        heading="Things people ask before reaching out."
        items={faqs}
      />
      <Footer />
    </main>
  );
}
