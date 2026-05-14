"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

export default function SectionDivider({
  label,
  index,
  title,
  align = "between",
  tone = "default",
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const lineColor =
    tone === "ember"
      ? "via-ember/70"
      : tone === "iris"
        ? "via-iris/70"
        : tone === "lime"
          ? "via-lime/70"
          : "via-bone/30";

  return (
    <div
      ref={ref}
      className={`relative w-full px-5 md:px-8 lg:px-12 ${className}`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 py-6 sm:gap-5 sm:py-10 md:gap-7 md:py-14">
        {/* Top tag row */}
        <div className="flex items-center justify-between gap-6">
          {index !== undefined && (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.6, delay: 0.05, ease }}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40"
            >
              /{String(index).padStart(2, "0")}
            </motion.span>
          )}
          {label && (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                align === "between" ? "ml-auto" : ""
              } text-bone/55`}
            >
              {label}
            </motion.span>
          )}
        </div>

        {/* Animated line */}
        <motion.div
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            inView
              ? { scaleX: 1, opacity: 1 }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 1.1, delay: 0.2, ease }}
          style={{ transformOrigin: "left" }}
          className={`h-px w-full bg-gradient-to-r from-transparent ${lineColor} to-transparent`}
        />

        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={
              inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="font-display text-balance text-3xl leading-[1.06] text-bone md:text-5xl"
          >
            {title}
          </motion.h2>
        )}
      </div>
    </div>
  );
}
