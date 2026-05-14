import LegalShell from "@/components/LegalShell";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Terms of Service — Devspark Studio",
  description:
    "The terms under which Devspark Studio offers its services. Plain language, no surprises.",
};

const sections = [
  {
    id: "agreement",
    heading: "Agreement",
    body: [
      "By engaging Devspark Studio for design, engineering, or brand work, you agree to these terms. They cover the scope of every engagement we run, and they supplement any signed statement of work for a specific project.",
      "These terms can change. If they do, we'll mark the page with the new date and email active clients ahead of the change.",
    ],
  },
  {
    id: "scope",
    heading: "Scope of work",
    body: [
      "Each engagement begins with a written statement of work that names the deliverables, timeline, owners, and price. Anything outside that scope is a change order — we'll quote it before we start.",
    ],
    list: [
      "Statements of work supersede general terms where they conflict.",
      "We track scope in writing, not over voice calls.",
      "Out-of-scope requests get a friendly 'happy to scope that separately.'",
    ],
  },
  {
    id: "payment",
    heading: "Payment terms",
    body: [
      "Most engagements bill 50% on kickoff and 50% on delivery, with monthly milestones for projects longer than six weeks. Invoices are due within 14 days; we pause work on overdue accounts after a written notice.",
      "Currencies, payment methods, and any retainer arrangements are agreed in writing before kickoff.",
    ],
  },
  {
    id: "ip",
    heading: "Intellectual property",
    body: [
      "On full payment, you own the final deliverables. We retain the right to use the work in our portfolio and to keep working files (a quiet archive — not a publication) for our own reference.",
      "Tools, frameworks, and pre-built components developed by Devspark across multiple projects remain ours, licensed to you for the project.",
    ],
  },
  {
    id: "confidentiality",
    heading: "Confidentiality",
    body: [
      "We treat everything you share — strategy, code, customers, the unflattering screenshots — as confidential. We're happy to sign a mutual NDA before a deep-dive call, and we expect the same protection going the other way.",
    ],
  },
  {
    id: "warranty",
    heading: "Warranty",
    body: [
      "We warrant that the work is original, that we have the right to ship it to you, and that it'll perform substantially as described in the statement of work. We do not warrant that it will be free of every imaginable bug forever; software is software.",
    ],
  },
  {
    id: "liability",
    heading: "Liability",
    body: [
      "Our total liability for any engagement is capped at the fees paid to us for that engagement in the prior six months. We are not liable for consequential, incidental, or special damages — lost profits, lost data, lost time.",
    ],
  },
  {
    id: "termination",
    heading: "Termination",
    body: [
      "Either party may terminate an engagement with 14 days written notice. On termination, you pay for work completed and any non-refundable third-party costs. Anything else is handed off cleanly.",
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    body: [
      "Questions? Reach out at hello@devspark.studio or via the contact page. Most answers come back the same day.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <LegalShell
        kicker="Legal / Terms"
        title="Terms of"
        highlight="service"
        trailing="."
        description="The terms under which Devspark Studio takes on work. Plain language, fair limits, no surprises."
        updated="14 May 2026"
        sections={sections}
      />
      <Footer />
    </main>
  );
}
