"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { Reveal, WordsReveal } from "@/components/Reveal";

const pillars = [
  {
    n: "01",
    h: "Dedicated specialists, not freelancers.",
    p: "Seasoned developers, UX/UI designers, and graphic artists working as a team — same hands from kickoff to launch.",
  },
  {
    n: "02",
    h: "Real-time, where you already live.",
    p: "Notion, ClickUp, Trello, Asana, Linear — we plug into your tools. Progress is visible, not reported.",
  },
  {
    n: "03",
    h: "Weekly sprints. No bottlenecks.",
    p: "A one-week loop with a deliverable every Friday keeps decisions small and momentum permanent.",
  },
  {
    n: "04",
    h: "Quality assurance, built-in.",
    p: "Performance, cross-browser sweeps, accessibility, semantic markup — non-negotiables, not extras.",
  },
  {
    n: "05",
    h: "Unlimited revisions until approval.",
    p: "We iterate as many rounds as it takes. Scope, not perfection, is the constraint.",
  },
];

export default function Philosophy() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const subY = useTransform(scrollYProgress, [0, 1], [60, -20]);

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden px-5 py-24 md:px-8 md:py-36 lg:px-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-[360px] w-[360px] rounded-full bg-ember/15 blur-[140px]"
      />
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <Reveal>
                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/50">
                  / 05 — Why teams choose us
                </p>
              </Reveal>

              <motion.h2
                style={{ y: headlineY }}
                className="font-display text-balance text-5xl leading-[1.04] text-bone md:text-7xl"
              >
                <WordsReveal text="Five quiet" />
                <br />
                <span className="italic text-ember">
                  <WordsReveal text="convictions." delay={0.15} />
                </span>
              </motion.h2>

              <motion.p
                style={{ y: subY }}
                className="mt-7 max-w-md text-bone/70 md:text-lg"
              >
                We don't write manifestos. But there are a few things we won't
                bend on — and they show up in everything we make.
              </motion.p>

              <div className="mt-10 hidden h-px w-32 bg-bone/30 md:block" />
              <p className="mt-6 hidden max-w-sm font-display text-2xl italic leading-tight text-bone/75 md:block">
                "If it's worth shipping, it's worth shipping with intention."
              </p>
            </div>
          </div>

          <ol className="md:col-span-7">
            {pillars.map((pl, i) => (
              <motion.li
                key={pl.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative border-b border-bone/10 py-7 transition-colors duration-500 first:border-t md:py-9"
              >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ember/0 via-ember/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                  <div className="flex w-full items-center justify-between md:w-auto">
                    <span className="font-mono text-[11px] tracking-[0.22em] text-bone/40">
                      {pl.n}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/30 md:hidden">
                      —
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display text-3xl leading-tight text-bone md:text-[42px]">
                      <span className="bg-gradient-to-r from-bone to-bone bg-[length:0%_1px] bg-no-repeat [background-position:0_88%] transition-[background-size] duration-500 group-hover:bg-[length:60%_1px]">
                        {pl.h}
                      </span>
                    </h3>
                    <p className="mt-3 max-w-xl text-bone/65 md:mt-4 md:text-[15px]">
                      {pl.p}
                    </p>
                  </div>

                  <div
                    aria-hidden
                    className="absolute right-0 top-1 hidden text-bone/20 transition-all duration-500 group-hover:text-ember md:block"
                  >
                    <span className="font-mono text-xs">+</span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
