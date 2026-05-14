"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/Reveal";

export default function FAQ({
  kicker = "FAQ / 06",
  heading = "Questions, answered.",
  description,
  items = [],
}) {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-32 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
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
            <Reveal delay={0.1}>
              <p className="mt-5 text-base text-bone/65 md:text-[17px]">
                {description}
              </p>
            </Reveal>
          )}
        </div>

        <div className="md:col-span-8">
          <ul className="divide-y divide-bone/10 border-y border-bone/10">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      type="button"
                      data-cursor="link"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                    >
                      <span className="flex items-baseline gap-4 md:gap-5">
                        <span className="font-mono text-[10px] text-bone/40">
                          0{i + 1}
                        </span>
                        <span className="font-display text-[20px] leading-tight text-bone md:text-[26px]">
                          {item.q}
                        </span>
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bone/20 text-bone/80 group-hover:border-bone/40 group-hover:text-bone"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M12 5v14" />
                          <path d="M5 12h14" />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pb-7 pl-10 pr-12 text-bone/70 md:pl-[3.4rem] md:text-[17px]">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
