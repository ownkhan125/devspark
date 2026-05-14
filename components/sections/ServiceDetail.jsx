"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionDivider from "@/components/SectionDivider";
import SpotlightCard from "@/components/SpotlightCard";
import ProcessTimeline from "@/components/ProcessTimeline";
import { Reveal, StaggerGroup, StaggerItem, WordsReveal } from "@/components/Reveal";

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

export default function ServiceDetail({ data }) {
  const {
    kicker,
    title,
    highlight,
    trailing,
    description,
    accent = "ember",
    deliverables = [],
    process = [],
    stack = [],
    outcomes = [],
    nextServices = [],
  } = data;

  return (
    <>
      <PageHero
        kicker={kicker}
        title={title}
        highlight={highlight}
        trailing={trailing}
        description={description}
        primaryCta={{ label: "Schedule a consultation", href: "/contact-us" }}
        secondaryCta={{ label: "See related projects", href: "/projects" }}
      />

      <SectionDivider index={1} label="At a glance · outcomes we ship" tone={accent} />

      {/* Outcomes / KPIs */}
      {outcomes.length > 0 && (
        <section className="relative w-full px-5 pb-4 pt-10 md:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <ul className="grid grid-cols-2 gap-6 border-y border-bone/10 py-8 md:grid-cols-4">
                {outcomes.map((o, i) => (
                  <li key={o.label} className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
                      /0{i + 1}
                    </span>
                    <span className="font-display text-3xl text-bone md:text-4xl">
                      {o.value}
                    </span>
                    <span className="text-sm text-bone/55">{o.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* Deliverables */}
      <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                  / What's included
                </p>
              </Reveal>
              <h2 className="mt-4 font-display text-balance text-4xl leading-[1.05] text-bone md:text-6xl">
                <span className="block">
                  <WordsReveal text="Every engagement," />
                </span>
                <span className="block">
                  <WordsReveal text="end-to-end" delay={0.18} />{" "}
                  <span className="italic text-ember">
                    <WordsReveal text="craft." delay={0.36} />
                  </span>
                </span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={0.15}>
                <p className="text-base text-bone/65 md:text-lg">
                  These are the deliverables we ship as standard. Anything
                  bespoke we'll scope on a project-by-project basis.
                </p>
              </Reveal>
            </div>
          </div>

          <StaggerGroup className="mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 hide-scrollbar md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:[scroll-snap-type:none] lg:grid-cols-3">
            {deliverables.map((d, i) => (
              <StaggerItem key={d.title} className="w-[85vw] shrink-0 snap-start md:w-auto md:shrink">
                <SpotlightCard accent={accent} className="h-full rounded-[24px] p-6">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full font-mono text-[10px] ${accentBg[accent]}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-xl leading-tight text-bone">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone/65">
                    {d.body}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Stack / Tools */}
      {stack.length > 0 && (
        <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-28 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <Reveal>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                    / Tools we reach for
                  </p>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="mt-4 font-display text-3xl leading-[1.1] text-bone md:text-4xl">
                    A small kit, sharp tools.
                  </h2>
                </Reveal>
              </div>
              <div className="md:col-span-8">
                <Reveal delay={0.1}>
                  <div className="flex flex-wrap gap-2">
                    {stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-bone/15 bg-ink-800/30 px-4 py-2 text-sm text-bone/75"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      <SectionDivider index={4} label="Process · how a sprint runs" />

      <ProcessTimeline
        kicker="/ How we work"
        heading="A predictable rhythm — never a black box."
        steps={process}
        accent={accent}
      />

      {/* Related services */}
      {nextServices.length > 0 && (
        <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-28 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                / Pairs well with
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl leading-[1.1] text-bone md:text-4xl">
                Most projects blend two or three.
              </h2>
            </Reveal>
            <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              {nextServices.map((s, i) => (
                <StaggerItem key={s.slug}>
                  <SpotlightCard
                    accent={i === 0 ? "iris" : "lime"}
                    className="rounded-[24px]"
                    innerClassName="flex items-center justify-between gap-6 p-6"
                  >
                    <Link
                      href={`/services/${s.slug}`}
                      data-cursor="link"
                      aria-label={`Read about ${s.title}`}
                      className="absolute inset-0 z-20"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
                        Next service
                      </span>
                      <span className="font-display text-2xl text-bone">
                        {s.title}
                      </span>
                      <span className="text-sm text-bone/55">{s.tagline}</span>
                    </div>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bone/15 text-bone/60 transition-all duration-300 group-hover:-rotate-45 group-hover:border-bone/40 group-hover:text-bone">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}
    </>
  );
}
