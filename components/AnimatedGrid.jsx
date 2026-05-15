"use client";

import { useEffect, useRef } from "react";

export default function AnimatedGrid({
  spacing = 60,
  opacity = 0.05,
  nodeOpacity = 0.45,
  interactive = true,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarsePointer = window.matchMedia("(hover: none)").matches;
    const isNarrow = window.matchMedia("(max-width: 768px)").matches;

    const SPACING = isNarrow ? Math.round(spacing * 1.5) : spacing;
    const INFLUENCE = isNarrow ? 150 : 230;
    const PUSH = isNarrow ? 14 : 26;
    const SPRING = 0.055;
    const DAMPING = 0.86;
    const DRIFT_AMP = isNarrow ? 2.4 : 4.2;
    const DRIFT_SPEED = 0.0008;
    const LINE_COLOR = `rgba(244, 239, 230, ${opacity})`;
    const NODE_COLOR = "rgba(244, 239, 230, 1)";

    const dprCap = isNarrow ? 1.5 : 2;
    let dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let points = [];

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    const build = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / SPACING) + 3;
      rows = Math.ceil(height / SPACING) + 3;
      const offX = -SPACING;
      const offY = -SPACING;
      points = new Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = offX + c * SPACING;
          const oy = offY + r * SPACING;
          points[r * cols + c] = {
            ox,
            oy,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
          };
        }
      }
    };

    build();

    const ro = new ResizeObserver(build);
    ro.observe(parent);

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    const onTouch = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const rect = parent.getBoundingClientRect();
      pointer.tx = e.touches[0].clientX - rect.left;
      pointer.ty = e.touches[0].clientY - rect.top;
      pointer.active = true;
    };

    if (interactive) {
      parent.addEventListener("mousemove", onMove);
      parent.addEventListener("mouseleave", onLeave);
      if (!isCoarsePointer) {
        parent.addEventListener("touchmove", onTouch, { passive: true });
        parent.addEventListener("touchend", onLeave);
        parent.addEventListener("touchcancel", onLeave);
      }
    }

    let raf = 0;
    let running = false;
    let last = performance.now();
    let t0 = performance.now();

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = LINE_COLOR;
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        const rowOff = r * cols;
        for (let c = 0; c < cols - 1; c++) {
          const a = points[rowOff + c];
          const b = points[rowOff + c + 1];
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
      }
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const a = points[r * cols + c];
          const b = points[(r + 1) * cols + c];
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
      }
      ctx.stroke();
    };

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const elapsed = Math.min(48, now - last);
      last = now;
      const dt = elapsed / 16.6667;
      const time = (now - t0) * DRIFT_SPEED;

      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;

      const r2 = INFLUENCE * INFLUENCE;
      const len = points.length;
      for (let i = 0; i < len; i++) {
        const p = points[i];
        const tgtX =
          p.ox + Math.sin(time + p.ox * 0.011 + p.oy * 0.007) * DRIFT_AMP;
        const tgtY =
          p.oy + Math.cos(time * 0.85 + p.oy * 0.011 + p.ox * 0.007) * DRIFT_AMP;

        p.vx += (tgtX - p.x) * SPRING;
        p.vy += (tgtY - p.y) * SPRING;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const fall = 1 - d / INFLUENCE;
            const f = fall * fall;
            const inv = 1 / d;
            p.vx += dx * inv * f * PUSH * 0.07;
            p.vy += dy * inv * f * PUSH * 0.07;
          }
        }

        const damp = Math.pow(DAMPING, dt);
        p.vx *= damp;
        p.vy *= damp;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = LINE_COLOR;
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        const rowOff = r * cols;
        for (let c = 0; c < cols - 1; c++) {
          const a = points[rowOff + c];
          const b = points[rowOff + c + 1];
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
      }
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const a = points[r * cols + c];
          const b = points[(r + 1) * cols + c];
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
      }
      ctx.stroke();

      if (pointer.active) {
        for (let i = 0; i < len; i++) {
          const p = points[i];
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            const fall = 1 - Math.sqrt(d2) / INFLUENCE;
            ctx.globalAlpha = fall * fall * nodeOpacity;
            ctx.fillStyle = NODE_COLOR;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.35, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }
    };

    const start = () => {
      if (running || prefersReducedMotion) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) start();
            else stop();
          }
        },
        { threshold: 0 }
      );
      io.observe(parent);
    } else {
      start();
    }

    if (prefersReducedMotion) {
      drawStatic();
    }

    const onVis = () => {
      if (document.hidden) stop();
      else if (!prefersReducedMotion) start();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      if (io) io.disconnect();
      if (interactive) {
        parent.removeEventListener("mousemove", onMove);
        parent.removeEventListener("mouseleave", onLeave);
        parent.removeEventListener("touchmove", onTouch);
        parent.removeEventListener("touchend", onLeave);
        parent.removeEventListener("touchcancel", onLeave);
      }
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [spacing, opacity, nodeOpacity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full mask-fade-y ${className}`}
    />
  );
}
