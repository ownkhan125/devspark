import ServiceDetail from "@/components/sections/ServiceDetail";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Web Development — Devspark Studio",
  description:
    "Custom Next.js apps, headless commerce, and marketing sites built for speed, accessibility, and a long shelf life.",
};

const data = {
  kicker: "Service / 01 — Web Development",
  title: "Web that's fast,",
  highlight: "accessible",
  trailing: ", built to last.",
  description:
    "Marketing sites, dashboards, and full product surfaces. Next.js by default, edge-rendered where it matters, hand-tuned where it counts.",
  accent: "ember",
  outcomes: [
    { value: "98+", label: "Lighthouse, consistently" },
    { value: "< 1.2s", label: "Avg. LCP on launch" },
    { value: "7d", label: "Sprint cadence" },
    { value: "WCAG AA", label: "Accessibility baseline" },
  ],
  deliverables: [
    {
      title: "Custom web apps + API architecture",
      body: "Backed by Postgres, Drizzle, or Prisma — designed for the surfaces you'll add a year from now, not just the first one.",
    },
    {
      title: "Progressive web app development",
      body: "Installable, offline-aware experiences that feel as good as a native app — without the App Store gauntlet.",
    },
    {
      title: "Headless e-commerce",
      body: "Shopify Hydrogen, Medusa, or BigCommerce front-ends with the conversion polish of a bespoke shop.",
    },
    {
      title: "Next.js + Astro frontends",
      body: "Server components, edge rendering, partial prerendering — chosen to match the surface, not the trend deck.",
    },
    {
      title: "Performance + Core Web Vitals",
      body: "Real-user monitoring, regression budgets in CI, and a habit of optimising what users actually see first.",
    },
    {
      title: "Security + long-term care",
      body: "Auth hardening, dependency hygiene, scheduled audits — and a maintenance plan after launch if you want it.",
    },
  ],
  stack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind",
    "Motion / Framer Motion",
    "Vercel / Cloudflare",
    "Sanity / Contentful",
    "Postgres / Drizzle",
    "Shopify Hydrogen",
    "Playwright",
  ],
  process: [
    {
      title: "Discovery",
      body: "Audit existing surfaces, map data flows, surface the integrations and constraints that secretly own the timeline.",
    },
    {
      title: "Architecture",
      body: "We agree on the shape — routing, rendering strategy, content model, monitoring — before a single component lands.",
    },
    {
      title: "Design + build in parallel",
      body: "Engineering happens in the same room as design from week one. No handoff Jira ticket; just two people at the same board.",
    },
    {
      title: "Hardening + launch",
      body: "Accessibility, performance, and SEO checks gated in CI. We launch with you and watch the first weeks live.",
    },
    {
      title: "Care",
      body: "Optional ongoing retainer for evolution, experiments, and the inevitable Tuesday request from the founder.",
    },
  ],
  nextServices: [
    {
      slug: "ui-ux-design-service",
      title: "UI / UX Design",
      tagline:
        "The interface layer that makes engineering decisions feel inevitable.",
    },
    {
      slug: "graphic-design-service",
      title: "Graphic Design",
      tagline:
        "Brand systems and motion that give the product something to look like.",
    },
  ],
};

const faqs = [
  {
    q: "Do you take over existing codebases?",
    a: "Often, yes. The first week is usually an audit — code health, performance baselines, what to keep, what to quietly retire. You get a written verdict and a plan before any rewrite begins.",
  },
  {
    q: "How do you handle CMS and content workflows?",
    a: "We default to Sanity or Contentful for marketing surfaces and bespoke models for product UI. Editors get a workflow they actually want to use — preview, scheduled publish, structured fields.",
  },
  {
    q: "What about hosting and infrastructure?",
    a: "Vercel and Cloudflare for most projects. We're happy to deploy to AWS or your existing infra if there's a reason — we just won't pretend it's simpler than it is.",
  },
  {
    q: "Do you offer maintenance after launch?",
    a: "Yes — a monthly retainer covers dependency updates, performance regressions, and a budget of small evolutions. You can also engage us for focused sprints later.",
  },
];

export default function WebDevelopmentPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <ServiceDetail data={data} />
      <FAQ
        kicker="FAQ / Web"
        heading="What teams ask before a web build."
        items={faqs}
      />
      <CTASection
        title="Got a web build in mind?"
        highlight="Let's"
        trailing="scope it."
        description="Send a short brief — current site, goals, deadlines. We'll come back within one business day with a small plan and a calendar invite."
      />
      <Footer />
    </main>
  );
}
