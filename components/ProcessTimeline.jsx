"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/Reveal";

const accentText = {
  ember: "text-ember",
  iris: "text-iris",
  lime: "text-lime-500",
};
const accentBg = {
  ember: "bg-ember",
  iris: "bg-iris",
  lime: "bg-lime",
};
const accentRing = {
  ember: "shadow-[0_0_18px_rgba(255,90,31,0.55)]",
  iris: "shadow-[0_0_18px_rgba(124,92,255,0.55)]",
  lime: "shadow-[0_0_18px_rgba(199,255,61,0.45)]",
};

export default function ProcessTimeline({
  kicker = "/ How we work",
  heading = "A predictable rhythm — never a black box.",
  description,
  steps = [],
  accent = "ember",
  id,
}) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = stepRefs.current.filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const indices = visible.map((v) => Number(v.target.dataset.idx));
        const max = Math.max(...indices);
        setActive((prev) => (prev === max ? prev : max));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [steps.length]);

  const progress = steps.length
    ? ((active + 1) / steps.length) * 100
    : 0;

  return (
    <section
      id={id}
      className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Mobile-only top progress bar */}
        <div className="mb-10 md:hidden">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-bone/45">
            <span>
              Step{" "}
              <span className={accentText[accent]}>
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="text-bone/30"> / {String(steps.length).padStart(2, "0")}</span>
            </span>
            <span className="text-bone/45">{steps[active]?.title}</span>
          </div>
          <div className="mt-3 h-px w-full bg-bone/10">
            <motion.div
              className={`h-px ${accentBg[accent]}`}
              style={{ originX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Sticky left rail */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                  {kicker}
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-4xl leading-[1.05] text-bone md:text-5xl">
                  {heading}
                </h2>
              </Reveal>
              {description && (
                <Reveal delay={0.12}>
                  <p className="mt-6 text-base text-bone/65 md:text-lg">
                    {description}
                  </p>
                </Reveal>
              )}

              {/* Vertical step indicator — desktop only */}
              <div className="mt-10 hidden md:block">
                <ol className="relative pl-7">
                  {/* baseline track */}
                  <span
                    aria-hidden
                    className="absolute left-2 top-2 bottom-2 w-px bg-bone/15"
                  />
                  {/* progress fill */}
                  <motion.span
                    aria-hidden
                    className={`absolute left-2 top-2 w-px origin-top ${accentBg[accent]}`}
                    animate={{ height: `calc(${progress}% - 1rem)` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {steps.map((s, i) => {
                    const isActive = i === active;
                    const isPast = i < active;
                    return (
                      <li
                        key={s.title}
                        className="relative flex items-baseline gap-3 py-2.5"
                        aria-current={isActive ? "step" : undefined}
                      >
                        {/* dot */}
                        <span
                          aria-hidden
                          className="absolute left-[-1.45rem] top-[1.05rem] inline-flex h-2.5 w-2.5 items-center justify-center"
                        >
                          <motion.span
                            animate={{
                              scale: isActive ? 1 : 0.7,
                              opacity: isActive || isPast ? 1 : 0.4,
                            }}
                            transition={{
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`h-2 w-2 rounded-full ${
                              isActive
                                ? `${accentBg[accent]} ${accentRing[accent]}`
                                : isPast
                                  ? accentBg[accent]
                                  : "bg-bone/30"
                            }`}
                          />
                        </span>
                        <span
                          className={`font-mono text-[10px] transition-colors ${
                            isActive || isPast
                              ? accentText[accent]
                              : "text-bone/40"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <motion.span
                          animate={{
                            x: isActive ? 4 : 0,
                            opacity: isActive ? 1 : isPast ? 0.7 : 0.45,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="font-display text-[15px] text-bone"
                        >
                          {s.title}
                        </motion.span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>

          {/* Right-side scroll list */}
          <ol className="md:col-span-7">
            {steps.map((p, i) => {
              const isActive = i === active;
              return (
                <motion.li
                  key={p.title}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  data-idx={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative border-t border-bone/15 py-7 last:border-b sm:py-10 md:py-14"
                >
                  <motion.span
                    aria-hidden
                    animate={{
                      scaleX: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ originX: 0 }}
                    className={`absolute left-0 top-[-1px] h-px w-32 ${accentBg[accent]}`}
                  />

                  <div className="flex items-baseline justify-between gap-5">
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-mono text-[11px] transition-colors duration-500 ${
                          isActive ? accentText[accent] : "text-bone/40"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-2xl leading-tight text-bone md:text-3xl lg:text-[34px]">
                        {p.title}
                      </h3>
                    </div>
                    <motion.span
                      aria-hidden
                      animate={{
                        scale: isActive ? 1 : 0.6,
                        opacity: isActive ? 1 : 0.25,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`hidden h-1.5 w-1.5 rounded-full md:inline-block ${accentBg[accent]}`}
                    />
                  </div>
                  <p className="mt-4 text-bone/70 md:ml-9 md:text-[17px]">
                    {p.body}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
