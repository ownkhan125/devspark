"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";

const accentColors = {
  ember: "rgba(255,90,31,0.42)",
  iris: "rgba(124,92,255,0.42)",
  lime: "rgba(199,255,61,0.38)",
};

export default function SpotlightCard({
  children,
  as: Tag = "div",
  accent = "ember",
  radius = 420,
  className = "",
  innerClassName = "",
  ...rest
}) {
  const ref = useRef(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 180, damping: 22 });
  const sy = useSpring(my, { stiffness: 180, damping: 22 });

  const accentColor = accentColors[accent] ?? accentColors.ember;

  const bigBg = useMotionTemplate`radial-gradient(${radius}px circle at ${sx}% ${sy}%, ${accentColor}, transparent 60%)`;
  const smallBg = useMotionTemplate`radial-gradient(180px circle at ${sx}% ${sy}%, rgba(244,239,230,0.10), transparent 70%)`;

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };
  const onLeave = () => {
    mx.set(50);
    my.set(50);
  };

  const MotionTag = motion.create(Tag);

  const wrap = innerClassName ? (
    <div className={`relative ${innerClassName}`}>{children}</div>
  ) : (
    children
  );

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative overflow-hidden rounded-[28px] border border-bone/10 bg-ink-800/40 transition-colors duration-500 hover:border-bone/25 ${className}`}
      {...rest}
    >
      <motion.span
        aria-hidden
        style={{ background: bigBg }}
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <motion.span
        aria-hidden
        style={{ background: smallBg }}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative z-10 h-full">{wrap}</div>
    </MotionTag>
  );
}
