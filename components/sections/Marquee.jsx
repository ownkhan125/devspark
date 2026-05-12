"use client";

import { motion } from "motion/react";

const items = [
  "Product Hunt",
  "AWS",
  "Bubble",
  "Make",
  "Flutter Flow",
  "Rapid",
  "Vercel",
  "Linear",
  "Notion",
];

const symbols = ["✺", "✷", "✦", "✶", "✻", "✸", "❋"];

function Row({ direction = 1, speed = 38 }) {
  const dup = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        className="flex w-max items-center gap-12 whitespace-nowrap py-3 md:gap-16"
      >
        {dup.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-12 font-display text-3xl italic text-bone/70 md:gap-16 md:text-5xl"
          >
            <span className="text-bone/90 transition-colors hover:text-ember">
              {item}
            </span>
            <span className="text-ember/70">
              {symbols[i % symbols.length]}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      aria-label="Trusted by"
      className="relative border-y border-bone/10 py-8 md:py-12"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink to-transparent md:w-40" />

      <div className="mx-auto mb-6 max-w-7xl px-5 md:px-8 lg:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
          / Trusted by builders, founders, and product teams
        </p>
      </div>

      <Row direction={1} speed={48} />
    </section>
  );
}
