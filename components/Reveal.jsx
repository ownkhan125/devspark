"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  once = true,
  amount = 0.2,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", y = 28 }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function WordsReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  amount = 0.15,
  once = true,
  as: Tag = "span",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lastIndex = words.length - 1;

  return (
    <Tag ref={ref} className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`relative inline-block overflow-hidden pb-[0.12em] align-top ${
            i === lastIndex ? "" : "mr-[0.22em]"
          }`}
          style={{ lineHeight: "inherit" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={
              inView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }
            }
            transition={{
              duration: 0.85,
              delay: delay + i * stagger,
              ease,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
