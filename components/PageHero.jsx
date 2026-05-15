"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { WordsReveal } from "@/components/Reveal";
import AnimatedGrid from "@/components/AnimatedGrid";

export default function PageHero({
  kicker,
  title,
  highlight,
  trailing,
  description,
  primaryCta,
  secondaryCta,
  align = "left",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const op = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const alignCls =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <section
      ref={ref}
      className="relative isolate w-full overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32 md:pb-40 md:pt-44 lg:pb-48"
    >
      <motion.div
        aria-hidden
        style={{ y: yA }}
        className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] md:h-[560px] md:w-[560px]"
      >
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -22, 18, 0],
            scale: [1, 1.06, 0.97, 1],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full rounded-full bg-iris/35 blur-[140px] will-change-transform"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: yB }}
        className="pointer-events-none absolute -left-24 top-1/2 h-[340px] w-[340px] md:h-[460px] md:w-[460px]"
      >
        <motion.div
          animate={{
            x: [0, -24, 18, 0],
            y: [0, 20, -14, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          className="h-full w-full rounded-full bg-ember/25 blur-[140px] will-change-transform"
        />
      </motion.div>

      <AnimatedGrid />

      <motion.div
        style={{ opacity: op }}
        className={`relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:gap-8 md:px-8 lg:px-12 ${alignCls}`}
      >
        {kicker && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/60"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-bone/15 px-3 py-1.5">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-lime/70" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-lime" />
              </span>
              {kicker}
            </span>
          </motion.div>
        )}

        <h1 className="font-display text-balance text-[clamp(2.5rem,8vw,6.5rem)] leading-[1.04] text-bone">
          <span className="block">
            <WordsReveal text={title} />
          </span>
          {(highlight || trailing) && (
            <span className="block">
              {highlight && (
                <span className="relative mr-[0.22em] inline-block">
                  <WordsReveal
                    text={highlight}
                    delay={0.22}
                    className="italic text-ember"
                  />
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 1.0,
                      delay: 0.95,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute -bottom-0.5 left-0 block h-[2px] w-full origin-left bg-ember"
                    aria-hidden
                  />
                </span>
              )}
              {trailing && <WordsReveal text={trailing} delay={0.36} />}
            </span>
          )}
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`max-w-2xl text-pretty text-base text-bone/70 md:text-lg ${align === "center" ? "mx-auto" : ""}`}
          >
            {description}
          </motion.p>
        )}

        {(primaryCta || secondaryCta) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            {primaryCta && (
              <Link
                href={primaryCta.href}
                data-cursor="cta"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ember px-5 py-3 text-[13px] font-medium text-bone transition-transform hover:scale-[1.02]"
              >
                <span className="relative z-10">{primaryCta.label}</span>
                <svg
                  viewBox="0 0 24 24"
                  className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
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
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                data-cursor="link"
                className="inline-flex items-center gap-2 rounded-full border border-bone/20 px-5 py-3 text-[13px] font-medium text-bone/80 transition-colors hover:border-bone/40 hover:text-bone"
              >
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
