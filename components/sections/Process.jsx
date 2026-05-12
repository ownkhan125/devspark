"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import { Reveal, WordsReveal } from "@/components/Reveal";

const steps = [
  {
    n: "01",
    label: "Discover",
    title: "Listen, audit, map the terrain.",
    body: "We start by understanding the business, the users, and the current product surface. Out of this phase comes a clear, written brief — scope, success metrics, and the bets we're willing to make.",
    pills: ["Stakeholder interviews", "Heuristic audit", "Brief"],
  },
  {
    n: "02",
    label: "Design",
    title: "Sketch, prototype, decide.",
    body: "Concept directions, then interactive prototypes you can click through. We rehearse the experience before a single line of production code is written, so opinions are formed against real interactions.",
    pills: ["Wireframes", "Figma prototypes", "Design system"],
  },
  {
    n: "03",
    label: "Build",
    title: "Ship in one-week sprints.",
    body: "Production engineering on modern stacks — Next.js, accessible UI, animation as a first-class concern. You see progress weekly in a live preview, and feedback rolls into the next sprint.",
    pills: ["Next.js / React", "A11y baked in", "Live previews"],
  },
  {
    n: "04",
    label: "Polish",
    title: "Performance, accessibility, edge cases.",
    body: "Cross-browser sweep, Lighthouse / Core Web Vitals tuning, screen-reader passes. The last 10% is where opinions become craft.",
    pills: ["Lighthouse", "Cross-browser", "Edge cases"],
  },
  {
    n: "05",
    label: "Launch & care",
    title: "Hand-off, then keep building.",
    body: "Documented handover, then ongoing partnership — embedded design and engineering hours, retained for iteration, growth, and quiet improvements.",
    pills: ["Docs handover", "Retainers", "Iteration"],
  },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothLine = useSpring(lineHeight, { stiffness: 80, damping: 24 });
  const indicator = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const indicatorY = useSpring(indicator, { stiffness: 80, damping: 24 });
  const indicatorYStr = useTransform(indicatorY, (v) => `${v}%`);

  const counterOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 1],
    [0.35, 1, 1]
  );
  const counterText = useTransform(scrollYProgress, (p) =>
    String(
      Math.min(steps.length, Math.max(1, Math.ceil(p * steps.length)))
    ).padStart(2, "0")
  );
  const labelText = useTransform(scrollYProgress, (p) => {
    const idx = Math.min(
      steps.length - 1,
      Math.max(0, Math.floor(p * steps.length))
    );
    return steps[idx]?.label || steps[0].label;
  });

  return (
    <section
      id="process"
      className="relative scroll-mt-24 overflow-hidden px-5 py-24 md:px-8 md:py-36 lg:px-12"
    >
      <div
        aria-hidden
        className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-iris/15 blur-[120px]"
      />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 pb-14 md:flex-row md:items-end md:justify-between md:pb-20">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/50">
                / 03 — How we work
              </p>
            </Reveal>
            <h2 className="font-display text-balance text-5xl leading-[1.04] text-bone md:text-7xl">
              <WordsReveal text="A weekly cadence." />
              <br />
              <span className="italic text-iris">
                <WordsReveal text="No bottlenecks." delay={0.15} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-bone/70 md:text-lg">
              Five movements, repeating on a one-week loop. You always know
              where we are, what's next, and what's blocked.
            </p>
          </Reveal>
        </div>

        <div
          ref={ref}
          className="relative isolate grid grid-cols-[24px_1fr] gap-6 md:grid-cols-[180px_1fr] md:gap-12"
        >
          <div className="relative">
            <div className="sticky top-32 hidden md:block">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/40">
                Progress
              </p>
              <motion.p
                className="mt-3 font-display text-7xl text-bone"
                style={{ opacity: counterOpacity }}
              >
                <motion.span>{counterText}</motion.span>
                <span className="text-bone/30">
                  /{String(steps.length).padStart(2, "0")}
                </span>
              </motion.p>
              <div className="mt-6 h-px w-12 bg-bone/30" />
              <motion.p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70">
                <motion.span>{labelText}</motion.span>
              </motion.p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-0 hidden h-full w-px bg-bone/10 md:left-0 md:block" />
            <motion.div
              className="absolute left-3 top-0 hidden w-px bg-gradient-to-b from-ember via-iris to-lime md:left-0 md:block"
              style={{ height: smoothLine }}
            />
            <motion.div
              className="absolute -left-[3px] hidden h-2 w-2 rounded-full bg-ember shadow-[0_0_18px_#FF5A1F] md:block"
              style={{ top: indicatorYStr }}
            />

            <ul className="space-y-12 md:space-y-28">
              {steps.map((step, i) => (
                <li key={step.n} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative pl-10 md:pl-12"
                  >
                    <span className="absolute left-0 top-1.5 inline-flex items-center justify-center rounded-full border border-bone/15 bg-ink-800 px-2 py-0.5 font-mono text-[10px] text-bone/70 md:left-[-13px] md:top-2.5 md:h-6 md:w-6 md:px-0 md:py-0">
                      {step.n}
                    </span>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1px_1fr] md:gap-10">
                      <div>
                        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
                          {step.label}
                        </p>
                        <h3 className="font-display text-3xl leading-tight text-bone md:text-5xl">
                          {step.title}
                        </h3>
                      </div>
                      <div className="hidden bg-gradient-to-b from-transparent via-bone/15 to-transparent md:block" />
                      <div className="flex flex-col gap-4">
                        <p className="text-base text-bone/70 md:text-[17px]">
                          {step.body}
                        </p>
                        <ul className="mt-1 flex flex-wrap gap-2">
                          {step.pills.map((p) => (
                            <li
                              key={p}
                              className="rounded-full border border-bone/10 bg-bone/[0.03] px-3 py-1 text-[11px] text-bone/65"
                            >
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
