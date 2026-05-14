"use client";

import { motion } from "motion/react";
import PageHero from "@/components/PageHero";
import SectionDivider from "@/components/SectionDivider";
import { Reveal } from "@/components/Reveal";

export default function LegalShell({
  kicker,
  title,
  highlight,
  trailing,
  description,
  updated,
  sections = [],
}) {
  return (
    <>
      <PageHero
        kicker={kicker}
        title={title}
        highlight={highlight}
        trailing={trailing}
        description={description}
      />

      <SectionDivider index={1} label={`Last updated · ${updated}`} />

      <section className="relative w-full px-5 pb-16 sm:pb-24 md:px-8 md:pb-32 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Reveal>
              <div className="sticky top-28 rounded-[24px] border border-bone/10 bg-ink-800/40 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
                  Last updated
                </p>
                <p className="mt-2 font-display text-xl text-bone">{updated}</p>
                <p className="mb-5 mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
                  Contents
                </p>
                <ol className="space-y-2 text-sm">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        data-cursor="link"
                        className="flex items-baseline gap-3 text-bone/65 transition-colors hover:text-bone"
                      >
                        <span className="font-mono text-[10px] text-bone/35">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </aside>

          <div className="lg:col-span-8">
            <div className="flex flex-col gap-14">
              {sections.map((s, i) => (
                <motion.section
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="scroll-mt-32"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-bone md:text-4xl">
                    {s.heading}
                  </h2>
                  <div className="prose-quiet mt-5 space-y-4 text-[15px] leading-relaxed text-bone/70 md:text-[17px]">
                    {s.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                    {s.list && (
                      <ul className="space-y-2 pl-1">
                        {s.list.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <span className="mt-2.5 inline-block h-1 w-1 shrink-0 rounded-full bg-ember" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
