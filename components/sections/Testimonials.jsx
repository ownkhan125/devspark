"use client";

import { motion } from "motion/react";
import { Reveal, StaggerGroup, StaggerItem, WordsReveal } from "@/components/Reveal";

const quotes = [
  {
    body: "They moved through our rebrand and product rebuild without the usual agency friction. Weekly deliveries, opinions in the room, and a level of craft I'd struggle to replicate in-house.",
    name: "Lena Marchetti",
    role: "Head of Design, Caldera Studio",
    accent: "ember",
    tilt: -2.4,
  },
  {
    body: "Felt like an embedded team from week one. The Linear board, the Figma flows, the previews — we always knew exactly what was happening.",
    name: "Daniel Okafor",
    role: "CTO, Northwind",
    accent: "iris",
    tilt: 1.8,
  },
  {
    body: "Most studios hand you a beautiful design and leave engineering to fight it. These people ship the production version, accessible and fast.",
    name: "Priya Anand",
    role: "Founder, Hello Mira",
    accent: "lime",
    tilt: -1.4,
  },
  {
    body: "Unlimited revisions doesn't mean unlimited noise — they push back, defend ideas, and only iterate where it matters. Refreshing.",
    name: "Marcus Vela",
    role: "Product Lead, Foundry OS",
    accent: "ember",
    tilt: 2.2,
  },
];

const accentMap = {
  ember: { ring: "ring-ember/40", glow: "bg-ember/30", text: "text-ember" },
  iris: { ring: "ring-iris/40", glow: "bg-iris/30", text: "text-iris" },
  lime: { ring: "ring-lime/40", glow: "bg-lime/30", text: "text-lime" },
};

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden px-5 py-24 md:px-8 md:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 pb-12 text-center md:pb-16">
          <Reveal>
            <p className="mx-auto inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/50">
              <span className="h-px w-8 bg-bone/30" />/ 06 — Voices
              <span className="h-px w-8 bg-bone/30" />
            </p>
          </Reveal>
          <h2 className="font-display text-balance text-5xl leading-[1.04] text-bone md:text-7xl">
            <WordsReveal text="Real client" />{" "}
            <span className="italic text-ember">
              <WordsReveal text="success stories." delay={0.15} />
            </span>
          </h2>
          <Reveal delay={0.25}>
            <p className="mx-auto max-w-xl text-bone/65 md:text-lg">
              A handful of words from the teams we've shipped with — startups,
              operators, and a few quietly-growing enterprises.
            </p>
          </Reveal>
        </div>

        <StaggerGroup
          stagger={0.1}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7"
        >
          {quotes.map((q, i) => {
            const a = accentMap[q.accent];
            return (
              <StaggerItem key={q.name} y={50}>
                <motion.figure
                  whileHover={{ y: -6, rotate: q.tilt * 0.5 }}
                  initial={{ rotate: q.tilt }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  className={`relative h-full rounded-[28px] border border-bone/10 bg-ink-800/70 p-7 backdrop-blur md:p-9`}
                >
                  <span
                    aria-hidden
                    className={`absolute -top-3 left-7 inline-flex h-6 w-6 items-center justify-center rounded-full ${a.glow} ring-2 ${a.ring}`}
                  />
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  <svg
                    aria-hidden
                    viewBox="0 0 32 32"
                    className={`mb-5 h-7 w-7 ${a.text}`}
                    fill="currentColor"
                  >
                    <path d="M11 8c-3.3 0-6 2.7-6 6v9h9V14H8c0-1.7 1.3-3 3-3V8zm12 0c-3.3 0-6 2.7-6 6v9h9V14h-6c0-1.7 1.3-3 3-3V8z" />
                  </svg>

                  <blockquote className="font-display text-2xl leading-snug text-bone md:text-3xl">
                    "{q.body}"
                  </blockquote>

                  <figcaption className="mt-7 flex items-center gap-3">
                    <span
                      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-700 font-mono text-xs text-bone/80 ring-1 ring-bone/15`}
                    >
                      {q.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-bone">
                        {q.name}
                      </span>
                      <span className="text-[12px] text-bone/55">{q.role}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
