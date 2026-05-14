"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import PageHero from "@/components/PageHero";
import SectionDivider from "@/components/SectionDivider";
import SpotlightCard from "@/components/SpotlightCard";
import ProcessTimeline from "@/components/ProcessTimeline";
import { Reveal, StaggerGroup, StaggerItem, WordsReveal } from "@/components/Reveal";

const services = [
  {
    slug: "web-development-service",
    accent: "ember",
    n: "01",
    title: "Web Development",
    tagline:
      "Marketing sites, dashboards, and full product surfaces — fast, accessible, built to last.",
    bullets: [
      "Next.js, edge runtimes, headless CMS",
      "Custom web apps + API architecture",
      "Progressive web app development",
      "Performance and Core Web Vitals",
      "Long-term care + maintenance plans",
    ],
  },
  {
    slug: "ui-ux-design-service",
    accent: "iris",
    n: "02",
    title: "UI / UX Design",
    tagline:
      "Interfaces and journeys with a point of view — interactive prototypes, design systems, and dashboards your team can actually maintain.",
    bullets: [
      "Pixel-perfect interface design",
      "Scalable design systems + style guides",
      "High-fidelity interactive prototypes",
      "Conversion-optimised landing pages",
      "Responsive, adaptive UI + dashboards",
    ],
  },
  {
    slug: "graphic-design-service",
    accent: "lime",
    n: "03",
    title: "Graphic Design",
    tagline:
      "Identity systems, packaging, marketing creative, and motion that make a brand feel made — not assembled.",
    bullets: [
      "Complete brand identity systems",
      "Premium packaging + label design",
      "Custom illustration + iconography",
      "Motion graphics + brand films",
      "High-end marketing campaign creative",
    ],
  },
];

const accentBg = {
  ember: "bg-ember/10 text-ember",
  iris: "bg-iris/10 text-iris",
  lime: "bg-lime/10 text-lime-500",
};
const accentDot = {
  ember: "bg-ember",
  iris: "bg-iris",
  lime: "bg-lime",
};

const process = [
  {
    n: "01",
    title: "Discovery",
    body: "We sit with the brief — your goals, your constraints, your existing surfaces. Output: a one-page plan, a price band, a calendar.",
  },
  {
    n: "02",
    title: "Strategy",
    body: "Architecture, audience, voice, and the three things this project absolutely has to nail. We lock the shape before we draw a pixel.",
  },
  {
    n: "03",
    title: "Design",
    body: "Type, motion, hierarchy. We sweat the details that decide whether the work feels handmade or assembled.",
  },
  {
    n: "04",
    title: "Build",
    body: "Engineering happens in the same room as design — no relay-race handoff. Performance and accessibility are gates, not afterthoughts.",
  },
  {
    n: "05",
    title: "Launch + care",
    body: "We launch with you, monitor the first weeks, and stick around for whatever comes next — even if that's nothing for a while.",
  },
];

const partners = [
  "Anthropic",
  "Stripe",
  "Vercel",
  "Linear",
  "Framer",
  "Notion",
  "Figma",
  "Webflow",
];

export default function ServicesClient() {
  return (
    <>
      <PageHero
        kicker="Services / Overview"
        title="Three crafts,"
        highlight="one"
        trailing="studio."
        description="Web, product, and brand work delivered as one tight workshop. Strategy through launch — no relay race, no slack in the middle."
        primaryCta={{ label: "Start a project", href: "/contact-us" }}
        secondaryCta={{ label: "See recent work", href: "/projects" }}
      />

      <SectionDivider index={1} label="In good company · partners we've shipped with" />

      {/* Partner marquee */}
      <section className="relative w-full overflow-hidden border-y border-bone/10 py-7">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={48}
          slidesPerView="auto"
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={6500}
          loop
          allowTouchMove={false}
          className="!overflow-visible"
        >
          {[...partners, ...partners].map((p, i) => (
            <SwiperSlide key={`${p}-${i}`} className="!w-auto">
              <span className="whitespace-nowrap font-display text-2xl italic text-bone/40 md:text-3xl">
                {p}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Service cards */}
      <section id="services" className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                  / What we do
                </p>
              </Reveal>
              <h2 className="mt-4 font-display text-balance text-4xl leading-[1.05] text-bone md:text-6xl">
                <span className="block">
                  <WordsReveal text="Where vision meets" />
                </span>
                <span className="block">
                  <span className="italic text-ember">
                    <WordsReveal text="precision." delay={0.2} />
                  </span>
                </span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={0.15}>
                <p className="text-base text-bone/65 md:text-lg">
                  Most engagements blend two or three of these. We'll tell you
                  honestly which mix makes sense for what you're trying to ship.
                </p>
              </Reveal>
            </div>
          </div>

          <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.slug}>
                <SpotlightCard
                  accent={s.accent}
                  className="h-full"
                  innerClassName="flex h-full flex-col p-7"
                >
                  <Link
                    href={`/services/${s.slug}`}
                    data-cursor="link"
                    aria-label={`Read more about ${s.title}`}
                    className="absolute inset-0 z-20"
                  />
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-full font-mono text-[11px] ${accentBg[s.accent]}`}
                    >
                      {s.n}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone/15 text-bone/60 transition-all duration-300 group-hover:-rotate-45 group-hover:border-bone/40 group-hover:text-bone">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-3xl leading-tight text-bone">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-bone/65">
                    {s.tagline}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-bone/10 pt-5 text-sm text-bone/70">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span
                          className={`mt-2 inline-block h-1 w-1 shrink-0 rounded-full ${accentDot[s.accent]}`}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40 transition-colors group-hover:text-bone/70">
                    Read more →
                  </span>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <SectionDivider index={3} label="Process · how a sprint actually runs" tone="iris" />

      <ProcessTimeline
        id="process"
        kicker="/ How it works"
        heading="A streamlined five-step process."
        description="The same rhythm whether we're shipping a brand identity, a product surface, or a full marketing site."
        steps={process}
        accent="iris"
      />
    </>
  );
}
