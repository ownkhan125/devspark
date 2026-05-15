"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import MagneticButton from "@/components/MagneticButton";
import { WordsReveal } from "@/components/Reveal";
import AnimatedGrid from "@/components/AnimatedGrid";

export default function CTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yBlobA = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yBlobB = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const scaleHead = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.04]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative isolate scroll-mt-24 overflow-hidden px-5 pb-12 pt-24 md:px-8 md:pb-20 md:pt-36 lg:px-12"
    >
      <motion.div
        aria-hidden
        style={{ y: yBlobA }}
        className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-iris/30 blur-[140px]"
      />
      <motion.div
        aria-hidden
        style={{ y: yBlobB }}
        className="absolute -right-24 bottom-0 h-[460px] w-[460px] rounded-full bg-ember/30 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[36px] border border-bone/10 bg-ink-800/70 px-7 py-16 backdrop-blur md:px-16 md:py-24">
          <AnimatedGrid spacing={48} opacity={0.06} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-bone/[0.04] via-transparent to-iris/[0.06]" />

          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/50">
                / 07 — Let's begin
              </p>
              <motion.h2
                style={{ scale: scaleHead }}
                className="font-display text-balance text-[clamp(2.5rem,9vw,6rem)] leading-[1.04] text-bone"
              >
                <WordsReveal text="Ready to elevate" />
                <br />
                <span className="italic text-ember">
                  <WordsReveal text="your digital presence?" delay={0.18} />
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-7 max-w-xl text-bone/70 md:text-lg"
              >
                A free 30-minute consultation. Bring a problem, a brief, or a
                rough idea — we'll come back with a sharper version, a scope, and
                a path to the first ship.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <MagneticButton
                  href="mailto:hello@devspark.studio"
                  variant="accent"
                  cursor="cta"
                >
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
                    <path d="M7 17L17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </MagneticButton>
                <MagneticButton
                  href="mailto:hello@devspark.studio"
                  variant="outline"
                  cursor="link"
                >
                  hello@devspark.studio
                </MagneticButton>
              </motion.div>
            </div>

            <div className="md:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative rounded-3xl border border-bone/10 bg-ink-700/60 p-7"
              >
                <div className="flex items-start justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/45">
                    Studio
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-bone/15 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-bone/65">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
                    Online
                  </span>
                </div>

                <ul className="mt-6 divide-y divide-bone/10">
                  {[
                    { k: "Email", v: "hello@devspark.studio" },
                    { k: "Phone", v: "+1 (646) 349-9973" },
                    {
                      k: "Office",
                      v: "Plaza 06, Bahria Town · Rawalpindi",
                    },
                    { k: "Hours", v: "Mon–Fri · 09:00–19:00 PKT" },
                  ].map((row) => (
                    <li
                      key={row.k}
                      className="flex items-baseline justify-between gap-5 py-3.5"
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/45">
                        {row.k}
                      </span>
                      <span className="text-right text-sm text-bone">
                        {row.v}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-2">
                  {["FB", "IG", "IN"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      data-cursor="link"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone/15 text-[10px] font-mono text-bone/70 transition-colors hover:border-ember hover:text-ember"
                      aria-label={s}
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
