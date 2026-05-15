"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import MagneticButton from "@/components/MagneticButton";
import Counter from "@/components/Counter";
import { WordsReveal } from "@/components/Reveal";
import AnimatedGrid from "@/components/AnimatedGrid";

const stats = [
  { to: 1800, suffix: "", label: "Projects shipped" },
  { to: 1600, suffix: "", label: "Teams trusted us" },
  { to: 7, suffix: "d", pad: 2, label: "Avg. sprint cycle" },
  { to: 12, suffix: "yr", label: "Combined craft" },
];

function Stats() {
  const sRef = useRef(null);
  const inView = useInView(sRef, { once: true, amount: 0.35 });
  return (
    <motion.div
      ref={sRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4"
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{
            duration: 0.7,
            delay: 0.15 + i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex flex-col gap-1.5 border-t border-bone/15 pt-4"
        >
          <span className="font-mono text-[10px] text-bone/40">
            /0{i + 1}
          </span>
          <span className="font-display text-4xl text-bone tabular-nums md:text-5xl">
            <Counter
              to={s.to}
              pad={s.pad ?? 0}
              suffix={s.suffix}
              duration={2 + i * 0.15}
              delay={0.25 + i * 0.12}
              amount={0.5}
            />
            <span className="text-ember">+</span>
          </span>
          <span className="text-xs text-bone/60">{s.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const op = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden pb-20 pt-32 md:pb-32 md:pt-40"
    >
      <motion.div
        aria-hidden
        style={{ y: yA }}
        className="absolute -right-32 -top-24 h-[520px] w-[520px] rounded-full bg-iris/40 blur-[140px] md:h-[680px] md:w-[680px]"
      />
      <motion.div
        aria-hidden
        style={{ y: yB }}
        className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-ember/30 blur-[140px] md:h-[560px] md:w-[560px]"
      />
      <motion.div
        aria-hidden
        style={{ y: yC }}
        className="absolute bottom-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-lime/20 blur-[120px]"
      />

      <AnimatedGrid />

      <motion.div
        style={{ opacity: op }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between gap-12 px-5 md:px-8 lg:px-12"
      >
        <div className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/60"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-bone/15 px-3 py-1.5">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-lime/70" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-lime" />
              </span>
              Available · May 2026
            </span>
            <span className="text-bone/30">/</span>
            <span>Independent design + engineering studio</span>
          </motion.div>

          <h1 className="font-display text-balance text-[clamp(2.75rem,11vw,9rem)] leading-[1.04] text-bone">
            <span className="block">
              <WordsReveal text="We turn ambitious" />
            </span>
            <span className="block">
              <WordsReveal text="ideas into" delay={0.18} />
              <span className="relative ml-[0.22em] inline-block">
                <WordsReveal
                  text="digital"
                  delay={0.32}
                  className="italic text-ember"
                />
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1.1,
                    delay: 1.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute -bottom-0.5 left-0 block h-[2px] w-full origin-left bg-ember"
                  aria-hidden
                />
              </span>
            </span>
            <span className="block">
              <WordsReveal text="objects of craft." delay={0.48} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-pretty text-base text-bone/70 md:text-lg"
          >
            Devspark is a small, opinionated team building web, product, and
            brand experiences for founders, operators, and teams who refuse to
            ship the average. Engineering, interface, identity — under one
            roof, on one-week sprints.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#contact" variant="accent" cursor="cta">
              Schedule a free consultation
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M13 5l7 7-7 7" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#services" variant="outline" cursor="link">
              Explore the studio
            </MagneticButton>
          </motion.div>
        </div>

        <Stats />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="pointer-events-none absolute bottom-6 right-6 hidden flex-col items-center gap-2 text-bone/40 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-bone/40"
        />
      </motion.div>
    </section>
  );
}
