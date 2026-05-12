"use client";

import { motion } from "motion/react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-bone/10 px-5 py-12 md:px-8 md:py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-10 md:grid-cols-4"
        >
          <div className="col-span-2 flex flex-col gap-3">
            <span className="font-display text-3xl italic text-bone">
              Devspark<span className="text-ember">.</span>
            </span>
            <p className="max-w-xs text-sm text-bone/55">
              An independent design + engineering studio building expressive
              digital objects.
            </p>
          </div>

          <nav aria-label="Sections">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
              Sections
            </p>
            <ul className="space-y-2 text-sm text-bone/75">
              {[
                ["Work", "#work"],
                ["Services", "#services"],
                ["Process", "#process"],
                ["Voices", "#testimonials"],
                ["Contact", "#contact"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a
                    href={h}
                    data-cursor="link"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-ember"
                  >
                    <span className="h-px w-0 bg-ember transition-all duration-300 group-hover:w-3" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
              Studio
            </p>
            <ul className="space-y-2 text-sm text-bone/75">
              <li>
                <a
                  href="#"
                  data-cursor="link"
                  className="transition-colors hover:text-ember"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  data-cursor="link"
                  className="transition-colors hover:text-ember"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  data-cursor="link"
                  className="transition-colors hover:text-ember"
                >
                  Accessibility
                </a>
              </li>
            </ul>
          </nav>
        </motion.div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-bone/10 pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[11px] text-bone/45">
            © {year} Devspark Studio — Made with care.
          </p>
          <div className="flex items-center gap-2">
            {["Facebook", "Instagram", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                data-cursor="link"
                className="rounded-full border border-bone/15 px-3 py-1.5 text-[11px] text-bone/70 transition-colors hover:border-bone/40 hover:text-bone"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none mt-12 select-none overflow-hidden"
        >
          <p className="font-display text-[24vw] leading-none text-bone/[0.04] md:text-[16vw]">
            Devspark.
          </p>
        </div>
      </div>
    </footer>
  );
}
