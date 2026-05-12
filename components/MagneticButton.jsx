"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function MagneticButton({
  children,
  as: Tag = "a",
  href,
  onClick,
  className = "",
  variant = "primary",
  cursor = "cta",
  strength = 0.35,
  ...rest
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-colors duration-300 will-change-transform";

  const variants = {
    primary:
      "bg-bone text-ink px-6 py-3 text-sm md:text-base hover:bg-bone-50",
    accent:
      "bg-ember text-ink px-6 py-3 text-sm md:text-base hover:bg-ember-400",
    outline:
      "border border-bone/20 text-bone bg-transparent px-6 py-3 text-sm md:text-base hover:border-bone/50",
    ghost: "text-bone px-4 py-2 text-sm hover:text-ember",
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className="will-change-transform"
    >
      <Tag
        href={href}
        onClick={onClick}
        data-cursor={cursor}
        className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
        {...rest}
      >
        <span className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="absolute -inset-px rounded-full bg-gradient-to-r from-ember/40 via-iris/40 to-lime/30 blur-md" />
        </span>

        <span className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/2 -skew-x-12 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-shine" />

        <motion.span
          initial={false}
          whileHover={{ x: -2 }}
          className="relative z-10 inline-flex items-center gap-2"
        >
          {children}
        </motion.span>
      </Tag>
    </motion.span>
  );
}
