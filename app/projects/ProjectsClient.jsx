"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PageHero from "@/components/PageHero";
import SectionDivider from "@/components/SectionDivider";
import SpotlightCard from "@/components/SpotlightCard";
import MediaImage, { picsumSrc } from "@/components/MediaImage";
import { Reveal } from "@/components/Reveal";
import {
  projects,
  withCounts,
  accentByCategory,
} from "@/lib/projects";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsClient() {
  const [active, setActive] = useState("all");
  const gridRef = useRef(null);

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.category === active),
    [active]
  );

  // GSAP ScrollTrigger.batch — book-stacking reveal sequence
  useIsoLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".project-card");
    if (!cards.length) return;

    // Hide everything before the batch animates it in
    gsap.set(cards, {
      opacity: 0,
      y: 90,
      rotateX: -24,
      transformPerspective: 1400,
      transformOrigin: "center top",
      willChange: "transform, opacity",
    });

    const triggers = ScrollTrigger.batch(cards, {
      start: "top 88%",
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.95,
          stagger: 0.09,
          ease: "power3.out",
          overwrite: "auto",
          clearProps: "willChange",
        });
      },
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [filtered]);

  return (
    <>
      <PageHero
        kicker="Work / 03"
        title="Successful projects,"
        highlight="quietly"
        trailing="shipped."
        description="Selected work from the last year — web, product, brand, and motion. The header sometimes calls these case studies; we just call them the job."
      />

      <SectionDivider index={1} label="Catalogue · sort by discipline" tone="ember" />

      <section className="relative w-full px-5 pb-16 sm:pb-24 md:px-8 md:pb-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
              <LayoutGroup id="filter-pill">
                {withCounts.map((c) => {
                  const isActive = active === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      data-cursor="link"
                      onClick={() => setActive(c.key)}
                      className={`relative inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                        isActive
                          ? "border-bone/0 text-bone"
                          : "border-bone/15 text-bone/65 hover:border-bone/30 hover:text-bone"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="filter-pill-bg"
                          className="absolute inset-0 -z-10 rounded-full bg-bone/10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      {c.label}
                      <span className="font-mono text-[10px] text-bone/40">
                        {c.count}
                      </span>
                    </button>
                  );
                })}
              </LayoutGroup>
            </div>
          </Reveal>

          <div
            ref={gridRef}
            className="mt-8 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 hide-scrollbar md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:[scroll-snap-type:none] lg:grid-cols-3"
            style={{ perspective: 1400 }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => {
                const accent = accentByCategory[p.category] ?? "ember";
                return (
                  <motion.div
                    key={p.name}
                    layout
                    initial={false}
                    exit={{
                      opacity: 0,
                      y: -16,
                      scale: 0.94,
                      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                    }}
                    transition={{
                      layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    }}
                    className="project-card h-auto w-[85vw] shrink-0 snap-start md:h-full md:w-auto md:shrink"
                  >
                    <SpotlightCard
                      accent={accent}
                      radius={520}
                      className="h-full rounded-[28px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] transition-shadow duration-500 hover:shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)]"
                      innerClassName="flex h-full flex-col"
                    >
                      <Link
                        href={`/projects/${p.slug}`}
                        data-cursor="link"
                        aria-label={`View ${p.name} case study`}
                        className="absolute inset-0 z-20"
                      />

                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className="absolute inset-0 transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
                          <MediaImage
                            src={picsumSrc(p.name, 1200, 900)}
                            alt={`${p.name} — project preview`}
                            palette={p.palette}
                            accent={accent}
                            fallbackLabel={p.name}
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                        </div>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />

                        <div className="absolute left-5 top-5 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/65 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/85 backdrop-blur">
                            <span
                              className={`h-1 w-1 rounded-full ${
                                accent === "ember"
                                  ? "bg-ember"
                                  : accent === "iris"
                                    ? "bg-iris"
                                    : "bg-lime"
                              }`}
                            />
                            {withCounts.find((c) => c.key === p.category)
                              ?.label}
                          </span>
                        </div>
                        <span className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/65 font-mono text-[10px] text-bone/85 backdrop-blur">
                          /{String(i + 1).padStart(2, "0")}
                        </span>

                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
                          <h3 className="font-display text-3xl italic leading-[1.05] text-bone md:text-4xl">
                            {p.name}
                          </h3>
                          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bone text-ink transition-all duration-300 group-hover:rotate-[-45deg]">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-3.5 w-3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            >
                              <path d="M5 12h14" />
                              <path d="M13 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
                        <p className="text-[15px] leading-relaxed text-bone/65">
                          {p.summary}
                        </p>
                        <div className="mt-auto flex flex-col gap-4 border-t border-bone/10 pt-5 md:flex-row md:items-center md:justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {p.tags.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-bone/15 px-2.5 py-1 text-[11px] text-bone/60"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
                            <span className="h-px w-5 bg-bone/25" />
                            {p.timeline}
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-bone/60">
              Nothing to show in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
