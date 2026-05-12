"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

function defaultFormat(value, { pad = 0, locale = "en-US" } = {}) {
  const rounded = Math.round(value);
  const base = rounded.toLocaleString(locale);
  if (pad > 0) {
    const sign = rounded < 0 ? "-" : "";
    const digits = Math.abs(rounded).toString().padStart(pad, "0");
    return sign + digits;
  }
  return base;
}

export default function Counter({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  pad = 0,
  prefix = "",
  suffix = "",
  format,
  className = "",
  amount = 0.35,
  rootMargin = "0px 0px -10% 0px",
}) {
  const ref = useRef(null);
  const nodeRef = useRef(null);
  const [inView, setInView] = useState(false);
  const value = useMotionValue(from);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
            return;
          }
        }
      },
      { threshold: amount, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [amount, rootMargin, inView]);

  useEffect(() => {
    if (!inView) return;

    const fmt = format
      ? (v) => format(v)
      : (v) => defaultFormat(v, { pad });

    if (prefersReduced) {
      value.set(to);
      if (nodeRef.current) nodeRef.current.textContent = fmt(to);
      return;
    }

    const controls = animate(value, to, {
      duration,
      delay,
      ease,
      onUpdate: (v) => {
        if (nodeRef.current) nodeRef.current.textContent = fmt(v);
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, delay, pad, format, prefersReduced, value]);

  const initialText = format
    ? format(from)
    : defaultFormat(from, { pad });

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span ref={nodeRef} aria-hidden="true">
        {initialText}
      </span>
      <span className="sr-only">
        {prefix}
        {format ? format(to) : defaultFormat(to, { pad })}
        {suffix}
      </span>
      {suffix}
    </span>
  );
}
