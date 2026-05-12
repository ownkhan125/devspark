"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { Reveal, StaggerGroup, StaggerItem, WordsReveal } from "@/components/Reveal";

function GlowCard({ children, className = "", accent = "ember" }) {
  const ref = useRef(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 180, damping: 22 });
  const sy = useSpring(my, { stiffness: 180, damping: 22 });

  const accentColor =
    accent === "ember"
      ? "rgba(255,90,31,0.45)"
      : accent === "iris"
        ? "rgba(124,92,255,0.45)"
        : "rgba(199,255,61,0.4)";

  const bigBg = useMotionTemplate`radial-gradient(420px circle at ${sx}% ${sy}%, ${accentColor}, transparent 60%)`;
  const smallBg = useMotionTemplate`radial-gradient(180px circle at ${sx}% ${sy}%, rgba(244,239,230,0.10), transparent 70%)`;

  const handleMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };
  const handleLeave = () => {
    mx.set(50);
    my.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative overflow-hidden rounded-[28px] border border-bone/10 bg-ink-800/60 backdrop-blur-sm transition-colors duration-500 hover:border-bone/25 ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: bigBg }}
      />
      <motion.div
        aria-hidden
        style={{ background: smallBg }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function WebGlyph() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <rect x="14" y="14" width="172" height="92" rx="10" />
      <line x1="14" y1="34" x2="186" y2="34" />
      <circle cx="26" cy="24" r="2" />
      <circle cx="36" cy="24" r="2" />
      <circle cx="46" cy="24" r="2" />
      <rect x="28" y="48" width="60" height="44" rx="4" />
      <rect x="100" y="48" width="74" height="10" rx="2" />
      <rect x="100" y="64" width="74" height="6" rx="2" />
      <rect x="100" y="76" width="40" height="6" rx="2" />
      <rect x="100" y="88" width="30" height="6" rx="2" />
    </svg>
  );
}

function UxGlyph() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <rect x="20" y="14" width="60" height="92" rx="10" />
      <rect x="90" y="14" width="40" height="44" rx="6" />
      <rect x="90" y="62" width="40" height="44" rx="6" />
      <rect x="140" y="14" width="40" height="92" rx="10" />
      <circle cx="50" cy="60" r="14" />
      <line x1="32" y1="92" x2="68" y2="92" />
      <line x1="148" y1="32" x2="172" y2="32" />
      <line x1="148" y1="44" x2="164" y2="44" />
    </svg>
  );
}

function BrandGlyph() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <circle cx="60" cy="60" r="36" />
      <rect x="106" y="24" width="72" height="20" rx="10" />
      <rect x="106" y="52" width="56" height="14" rx="7" />
      <rect x="106" y="74" width="72" height="22" rx="11" />
      <path d="M60 36 v48 M36 60 h48" />
    </svg>
  );
}

const services = [
  {
    n: "01",
    tag: "Build",
    title: "Web & Product Engineering",
    description:
      "Bespoke, performant websites and product surfaces — Next.js, modern toolchains, animation, and accessibility built in from the first commit.",
    bullets: [
      "Marketing & editorial sites",
      "SaaS dashboards",
      "Headless commerce",
      "Migrations & rebuilds",
    ],
    accent: "ember",
    Glyph: WebGlyph,
    span: "md:col-span-3 md:row-span-2",
  },
  {
    n: "02",
    tag: "Design",
    title: "UI / UX Design Systems",
    description:
      "From early concept to interactive prototype — research-led interaction design and scalable design systems.",
    bullets: ["Design audits", "Prototyping", "Design systems"],
    accent: "iris",
    Glyph: UxGlyph,
    span: "md:col-span-3",
  },
  {
    n: "03",
    tag: "Identity",
    title: "Brand & Graphic Design",
    description:
      "Identities, campaign assets, and brand systems that hold together across every touchpoint.",
    bullets: ["Visual identity", "Campaigns", "Pitch decks"],
    accent: "lime",
    Glyph: BrandGlyph,
    span: "md:col-span-3",
  },
  {
    n: "04",
    tag: "Care",
    title: "Continuous Partnership",
    description:
      "Weekly sprints, real-time collaboration in Notion · Linear · ClickUp · Asana, and unlimited revisions until it's right.",
    bullets: ["Embedded teams", "Weekly sprints", "QA & a11y"],
    accent: "ember",
    Glyph: null,
    span: "md:col-span-3",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 px-5 py-24 md:px-8 md:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/50">
                / 02 — What we make
              </p>
            </Reveal>
            <h2 className="font-display text-balance text-5xl leading-[1.04] text-bone md:text-7xl">
              <WordsReveal text="Three crafts." />
              <br />
              <span className="italic text-ember">
                <WordsReveal text="One studio." delay={0.15} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-bone/70 md:text-lg">
              We work at the intersection of code, interface, and identity —
              built on a one-week sprint cadence, with the same hands from
              kickoff to launch.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {services.map((s) => (
            <StaggerItem
              key={s.n}
              className={`${s.span ?? "md:col-span-3"} h-full`}
            >
              <GlowCard accent={s.accent} className="h-full">
                <div className="flex h-full flex-col gap-6 p-7 md:p-9">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-bone/40">
                      {s.n} / {s.tag}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        s.accent === "ember"
                          ? "bg-ember"
                          : s.accent === "iris"
                            ? "bg-iris"
                            : "bg-lime"
                      } shadow-[0_0_18px_currentColor]`}
                    />
                  </div>

                  {s.Glyph && (
                    <div
                      className={`relative h-28 overflow-hidden rounded-2xl border border-bone/10 bg-ink-700/50 p-5 transition-colors duration-500 group-hover:border-bone/25 md:h-36 ${
                        s.accent === "ember"
                          ? "text-ember/80"
                          : s.accent === "iris"
                            ? "text-iris/80"
                            : "text-lime/80"
                      }`}
                    >
                      <s.Glyph />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                    </div>
                  )}

                  <h3 className="font-display text-3xl leading-tight text-bone md:text-4xl">
                    {s.title}
                  </h3>
                  <p className="text-sm text-bone/65 md:text-[15px]">
                    {s.description}
                  </p>

                  <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="rounded-full border border-bone/10 px-3 py-1 text-[11px] text-bone/70"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
