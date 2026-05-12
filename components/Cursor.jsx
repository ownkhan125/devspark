"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoverKind, setHoverKind] = useState("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 600, damping: 40, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 600, damping: 40, mass: 0.3 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-on");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    const detectHover = (e) => {
      const el = e.target;
      if (!(el instanceof Element)) return;
      const interactive = el.closest(
        'a, button, [role="button"], [data-cursor]'
      );
      if (!interactive) {
        setHoverKind("default");
        return;
      }
      const kind = interactive.getAttribute("data-cursor") || "link";
      setHoverKind(kind);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", detectHover);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseenter", enter);

    return () => {
      document.body.classList.remove("custom-cursor-on");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", detectHover);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseenter", enter);
    };
  }, [x, y, visible]);

  if (!enabled) return null;

  const ringScale =
    hoverKind === "link"
      ? 1.7
      : hoverKind === "cta"
        ? 2.4
        : hoverKind === "drag"
          ? 1.9
          : 1;
  const ringColor =
    hoverKind === "cta"
      ? "rgba(255,90,31,0.65)"
      : hoverKind === "drag"
        ? "rgba(199,255,61,0.7)"
        : "rgba(244,239,230,0.65)";

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: ringScale,
            borderColor: ringColor,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="h-9 w-9 rounded-full border backdrop-blur-[2px]"
          style={{ borderColor: ringColor }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: hoverKind === "default" ? 1 : 0.3,
            backgroundColor:
              hoverKind === "cta" ? "#FF5A1F" : "#F4EFE6",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="h-1.5 w-1.5 rounded-full"
        />
      </motion.div>
    </>
  );
}
