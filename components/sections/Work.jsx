"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal, WordsReveal } from "@/components/Reveal";

const projects = [
  {
    n: "01",
    name: "Caldera Studio",
    sector: "Brand & Web",
    year: "2026",
    color: "from-ember/30 via-ember/15 to-transparent",
    accent: "#FF5A1F",
    blurb: "Editorial site for a Lisbon-based architecture practice.",
    span: "md:col-span-7",
  },
  {
    n: "02",
    name: "Northwind",
    sector: "SaaS Product",
    year: "2025",
    color: "from-iris/30 via-iris/15 to-transparent",
    accent: "#7C5CFF",
    blurb: "Logistics dashboard rebuilt for speed and clarity.",
    span: "md:col-span-5",
  },
  {
    n: "03",
    name: "Hello Mira",
    sector: "Commerce",
    year: "2025",
    color: "from-lime/30 via-lime/10 to-transparent",
    accent: "#C7FF3D",
    blurb: "Headless storefront for a clean skincare label.",
    span: "md:col-span-5",
  },
  {
    n: "04",
    name: "Foundry OS",
    sector: "Identity + UI",
    year: "2024",
    color: "from-bone/30 via-bone/10 to-transparent",
    accent: "#F4EFE6",
    blurb: "Internal platform identity, system, and component kit.",
    span: "md:col-span-7",
  },
];

function ProjectTile({ p, i }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative h-[420px] overflow-hidden rounded-[28px] border border-bone/10 bg-ink-800/60 md:h-[480px] ${p.span}`}
      data-cursor="link"
    >
      <motion.div
        aria-hidden
        style={{ y, scale }}
        className={`absolute inset-0 bg-gradient-to-br ${p.color}`}
      />

      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay"
      >
        <defs>
          <pattern
            id={`dots-${p.n}`}
            x="0"
            y="0"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${p.n})`} />
      </svg>

      <motion.div
        aria-hidden
        className="absolute -inset-x-10 -inset-y-10 opacity-30 mix-blend-screen"
        animate={{
          x: ["-2%", "3%", "-2%"],
          y: ["-1%", "2%", "-1%"],
        }}
        transition={{ duration: 18 + i * 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="h-2/3 w-2/3 rounded-full blur-[110px]"
          style={{ background: p.accent }}
        />
      </motion.div>

      <div className="relative flex h-full flex-col justify-between p-7 md:p-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-bone/50">
            {p.n} · {p.year}
          </span>
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-bone/15 text-bone/70 transition-colors group-hover:border-bone/40 group-hover:text-bone"
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/55">
            {p.sector}
          </span>
          <h3 className="font-display text-5xl leading-[1.02] text-bone md:text-6xl">
            {p.name}
          </h3>
          <p className="max-w-md text-sm text-bone/65 md:text-[15px]">
            {p.blurb}
          </p>
        </div>
      </div>

      <span className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-transparent transition-all duration-500 group-hover:ring-bone/20" />
    </motion.article>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      className="relative scroll-mt-24 px-5 py-24 md:px-8 md:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/50">
                / 04 — Selected work
              </p>
            </Reveal>
            <h2 className="font-display text-balance text-5xl leading-[1.04] text-bone md:text-7xl">
              <WordsReveal text="Things we've" />
              <br />
              <span className="italic">
                <WordsReveal text="quietly shipped." delay={0.15} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-bone/70 md:text-lg">
              A small sample. Full case studies, scopes, and outcomes are shared
              under NDA on a call.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {projects.map((p, i) => (
            <ProjectTile key={p.n} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
