"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { WordsReveal } from "@/components/Reveal";

export default function CTASection({
  kicker = "/ Let's build",
  title = "Ready to elevate your",
  highlight = "digital",
  trailing = "presence?",
  description = "Tell us what you're shipping. We'll come back within one business day with a small plan, a price band, and a calendar invite.",
  primary = { label: "Schedule a free consultation", href: "/contact-us" },
  secondary = { label: "Explore the studio", href: "/about-us" },
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const yB = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative isolate w-full overflow-hidden px-5 py-20 sm:py-28 md:px-8 md:py-40 lg:px-12"
    >
      <motion.div
        aria-hidden
        style={{ y: yA }}
        className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] md:h-[560px] md:w-[560px]"
      >
        <motion.div
          animate={{
            x: [0, 20, -16, 0],
            y: [0, -16, 14, 0],
            scale: [1, 1.04, 0.97, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full rounded-full bg-iris/30 blur-[140px] will-change-transform"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: yB }}
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] md:h-[600px] md:w-[600px]"
      >
        <motion.div
          animate={{
            x: [0, -22, 18, 0],
            y: [0, 18, -14, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.3,
          }}
          className="h-full w-full rounded-full bg-ember/30 blur-[140px] will-change-transform"
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone/45"
        >
          {kicker}
        </motion.p>

        <motion.h2
          style={{ scale }}
          className="mx-auto mt-6 max-w-5xl font-display text-balance text-[clamp(2.5rem,9vw,7.5rem)] leading-[1.02] text-bone"
        >
          <span className="block">
            <WordsReveal text={title} />
          </span>
          <span className="block">
            <span className="relative mr-[0.22em] inline-block">
              <WordsReveal
                text={highlight}
                delay={0.22}
                className="italic text-ember"
              />
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.1,
                  delay: 0.95,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -bottom-0.5 left-0 block h-[2px] w-full origin-left bg-ember"
                aria-hidden
              />
            </span>
            <WordsReveal text={trailing} delay={0.4} />
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-2xl text-pretty text-base text-bone/70 md:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href={primary.href}
            data-cursor="cta"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ember px-6 py-3.5 text-sm font-medium text-bone transition-transform hover:scale-[1.02]"
          >
            <span className="relative z-10">{primary.label}</span>
            <svg
              viewBox="0 0 24 24"
              className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M13 5l7 7-7 7" />
            </svg>
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-bone/30 opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              data-cursor="link"
              className="inline-flex items-center gap-2 rounded-full border border-bone/20 px-6 py-3.5 text-sm font-medium text-bone/80 transition-colors hover:border-bone/40 hover:text-bone"
            >
              {secondary.label}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
