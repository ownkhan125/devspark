import LegalShell from "@/components/LegalShell";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Privacy Policy — Devspark Studio",
  description:
    "How Devspark Studio collects, uses, and protects information about visitors and clients.",
};

const sections = [
  {
    id: "overview",
    heading: "Overview",
    body: [
      "This policy explains what information Devspark Studio collects, why, and how we handle it. We aim to collect the minimum needed to do the work — and to keep what we do collect safely.",
    ],
  },
  {
    id: "info-we-collect",
    heading: "Information we collect",
    body: ["Two categories, both kept to a minimum:"],
    list: [
      "Information you provide directly — name, email, phone, company, and the message you send via the contact form.",
      "Information collected automatically — basic analytics like page views, referrer, device class, and country. No fingerprinting, no third-party ad tracking.",
    ],
  },
  {
    id: "why-we-collect",
    heading: "How we use it",
    body: [
      "We use contact information to reply to you, scope a project, and (with consent) send the occasional studio update. We use analytics to understand which pages help and which need rewriting — never to build profiles of individual visitors.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies",
    body: [
      "We use a single first-party analytics cookie and a session cookie for the contact form. We do not use advertising cookies. If your browser sends a Do Not Track header, we honour it.",
    ],
  },
  {
    id: "sharing",
    heading: "Sharing",
    body: [
      "We do not sell or rent personal information. We share it only with service providers that help us run the studio (email, analytics, hosting), under contracts that bind them to the same standards as this policy.",
    ],
  },
  {
    id: "retention",
    heading: "Retention",
    body: [
      "Contact form messages are kept for 24 months unless a project moves forward. Analytics are aggregated after 13 months. Project files are kept for the life of the engagement plus three years, then archived to cold storage.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: [
      "You can request access, correction, or deletion of your information at any time. Most requests are handled within seven business days — write to privacy@devspark.studio.",
    ],
  },
  {
    id: "security",
    heading: "Security",
    body: [
      "All information is stored encrypted at rest and in transit. Access is limited to the team members who need it, logged, and reviewed quarterly.",
    ],
  },
  {
    id: "changes",
    heading: "Changes",
    body: [
      "We'll mark this page when the policy materially changes and email active clients. Older versions are available on request.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <LegalShell
        kicker="Legal / Privacy"
        title="Privacy"
        highlight="policy"
        trailing="."
        description="How Devspark Studio collects, uses, and protects information — and the rights you have over it."
        updated="14 May 2026"
        sections={sections}
      />
      <Footer />
    </main>
  );
}
