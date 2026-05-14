"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { accentByCategory, categories } from "@/lib/projects";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
  WordsReveal,
} from "@/components/Reveal";
import SectionDivider from "@/components/SectionDivider";
import SpotlightCard from "@/components/SpotlightCard";
import MediaImage, { picsumSrc } from "@/components/MediaImage";

const accentText = {
  ember: "text-ember",
  iris: "text-iris",
  lime: "text-lime-500",
};
const accentBg = {
  ember: "bg-ember",
  iris: "bg-iris",
  lime: "bg-lime",
};
const accentSoft = {
  ember: "bg-ember/15 text-ember",
  iris: "bg-iris/15 text-iris",
  lime: "bg-lime/15 text-lime-500",
};

function Cover({ project, accent }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.0]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-6 aspect-[16/10] w-full max-w-7xl overflow-hidden rounded-[28px] border border-bone/10 sm:mt-10 md:aspect-[16/9] md:rounded-[36px]"
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full"
      >
        <MediaImage
          src={picsumSrc(`${project.slug}-cover`, 1800, 1100)}
          alt={`${project.name} — cover`}
          palette={project.palette}
          accent={accent}
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          fallbackLabel={project.name}
        />
      </motion.div>
      <span className={`absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-ink/65 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/85 backdrop-blur ${accentText[accent]}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${accentBg[accent]}`} />
        {categories.find((c) => c.key === project.category)?.label}
      </span>
    </motion.div>
  );
}

function Stat({ value, label, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{
        duration: 0.8,
        delay: i * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col gap-2 border-t border-bone/15 pt-5"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
        /0{i + 1}
      </span>
      <span className="font-display text-4xl text-bone md:text-5xl">{value}</span>
      <span className="text-sm text-bone/55">{label}</span>
    </motion.div>
  );
}

export default function ProjectDetailClient({ project, related }) {
  const accent = accentByCategory[project.category] ?? "ember";
  const categoryLabel =
    categories.find((c) => c.key === project.category)?.label ?? "";

  // Lock scroll-progress accent line at top of viewport on detail page
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    // ensure layout settles for sticky info panel
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div ref={pageRef}>
      {/* Top-of-page progress accent line */}
      <motion.div
        aria-hidden
        className={`pointer-events-none fixed left-0 right-0 top-[72px] z-30 h-px ${accentBg[accent]} origin-left`}
        style={{ scaleX: scrollYProgress, opacity: 0.85 }}
      />

      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden pb-10 pt-28 sm:pt-32 md:pt-44">
        <motion.div
          aria-hidden
          animate={{ x: [0, 32, -22, 0], y: [0, -22, 18, 0], scale: [1, 1.06, 0.97, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className={`pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full blur-[140px] md:h-[560px] md:w-[560px] ${accent === "ember" ? "bg-ember/35" : accent === "iris" ? "bg-iris/35" : "bg-lime/30"}`}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(244,239,230,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,239,230,0.04)_1px,transparent_1px)] bg-[size:60px_60px] mask-fade-y"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:gap-8 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/55"
          >
            <Link
              href="/projects"
              data-cursor="link"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-bone"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M19 12H5" />
                <path d="m11 5-7 7 7 7" />
              </svg>
              Projects
            </Link>
            <span className="text-bone/25">/</span>
            <span className={accentText[accent]}>{categoryLabel}</span>
          </motion.div>

          <h1 className="font-display text-balance text-[clamp(2.4rem,8vw,5.8rem)] leading-[1.04] text-bone">
            <span className="block">
              <WordsReveal text={project.name} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-pretty text-base text-bone/70 md:text-lg"
          >
            {project.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="cta"
                className="group inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-[13px] font-medium text-bone transition-transform hover:scale-[1.02]"
              >
                View live site
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </a>
            )}
            <Link
              href="/contact-us"
              data-cursor="link"
              className="inline-flex items-center gap-2 rounded-full border border-bone/20 px-5 py-3 text-[13px] font-medium text-bone/80 transition-colors hover:border-bone/40 hover:text-bone"
            >
              Start a similar project
            </Link>
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
          <Cover project={project} accent={accent} />
        </div>
      </section>

      <SectionDivider
        index={1}
        label="At a glance · the project file"
        tone={accent}
      />

      {/* Info panel + overview */}
      <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SpotlightCard
                accent={accent}
                className="rounded-[24px] p-6 md:p-8"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
                  / Project info
                </p>
                <dl className="mt-5 divide-y divide-bone/10">
                  {[
                    ["Client", project.client],
                    ["Industry", project.industry],
                    ["Year", project.year],
                    ["Timeline", project.timeline],
                    [
                      "Services",
                      Array.isArray(project.services)
                        ? project.services.join(" · ")
                        : project.services,
                    ],
                    [
                      "Role",
                      Array.isArray(project.role)
                        ? project.role.join(" · ")
                        : project.role,
                    ],
                  ]
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div
                        key={k}
                        className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0"
                      >
                        <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
                          {k}
                        </dt>
                        <dd className="text-[15px] text-bone/85">{v}</dd>
                      </div>
                    ))}
                </dl>

                {Array.isArray(project.tags) && project.tags.length > 0 && (
                  <div className="mt-5 border-t border-bone/10 pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
                      Tags
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-bone/15 px-2.5 py-1 text-[11px] text-bone/65"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </SpotlightCard>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                / Overview
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-balance text-3xl leading-[1.1] text-bone md:text-5xl">
                A short brief on what {project.name} needed —{" "}
                <span className={`italic ${accentText[accent]}`}>and what we shipped.</span>
              </h2>
            </Reveal>

            {project.challenge && (
              <div className="mt-12">
                <Reveal>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                    / The challenge
                  </p>
                </Reveal>
                <Reveal delay={0.05}>
                  <p className="mt-4 text-pretty text-lg leading-[1.55] text-bone/80 md:text-2xl">
                    {project.challenge}
                  </p>
                </Reveal>
              </div>
            )}

            {project.approach && (
              <div className="mt-12">
                <Reveal>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                    / Our approach
                  </p>
                </Reveal>
                <Reveal delay={0.05}>
                  <p className="mt-4 text-pretty text-base text-bone/70 md:text-lg">
                    {project.approach}
                  </p>
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Process */}
      {project.process?.length > 0 && (
        <>
          <SectionDivider index={2} label="Process · how the sprint ran" tone={accent} />
          <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-28 lg:px-12">
            <div className="mx-auto max-w-7xl">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                  / Process
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-4xl leading-[1.05] text-bone md:text-5xl">
                  Four moves, in order.
                </h2>
              </Reveal>
              <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
                {project.process.map((p, i) => (
                  <StaggerItem key={p.title}>
                    <SpotlightCard
                      accent={accent}
                      className="h-full rounded-[24px] p-6"
                    >
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-full font-mono text-[10px] ${accentSoft[accent]}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-5 font-display text-xl leading-tight text-bone">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-bone/65">
                        {p.body}
                      </p>
                    </SpotlightCard>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </section>
        </>
      )}

      {/* Gallery */}
      <SectionDivider index={3} label="Gallery · selected frames" tone={accent} />
      <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <h2 className="font-display text-3xl leading-[1.05] text-bone md:text-5xl">
                Selected frames.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-bone/65">
                A small set of stills from the engagement — surfaces, mockups,
                and a couple of details we like.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-10">
            <Swiper
              modules={[Autoplay, Pagination, Keyboard]}
              spaceBetween={16}
              slidesPerView={1.1}
              breakpoints={{
                640: { slidesPerView: 1.6, spaceBetween: 18 },
                1024: { slidesPerView: 2.2, spaceBetween: 24 },
              }}
              keyboard
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              loop
              pagination={{
                clickable: true,
                el: `.${project.slug}-gallery-pagination`,
              }}
              className="!overflow-visible"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <SwiperSlide key={n}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-bone/10">
                    <MediaImage
                      src={picsumSrc(`${project.slug}-frame-${n}`, 1400, 1050)}
                      alt={`${project.name} — frame ${n}`}
                      palette={project.palette}
                      accent={accent}
                      sizes="(max-width: 768px) 90vw, 50vw"
                      fallbackLabel={`/0${n}`}
                    />
                    <span className="absolute bottom-4 left-4 rounded-full bg-ink/65 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/85 backdrop-blur">
                      /0{n}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              className={`${project.slug}-gallery-pagination mt-8 flex items-center justify-center gap-2 [&>.swiper-pagination-bullet]:h-1.5 [&>.swiper-pagination-bullet]:w-6 [&>.swiper-pagination-bullet]:rounded-full [&>.swiper-pagination-bullet]:bg-bone/20 [&>.swiper-pagination-bullet-active]:w-10 ${accent === "ember" ? "[&>.swiper-pagination-bullet-active]:bg-ember" : accent === "iris" ? "[&>.swiper-pagination-bullet-active]:bg-iris" : "[&>.swiper-pagination-bullet-active]:bg-lime"}`}
            />
          </Reveal>
        </div>
      </section>

      {/* Results */}
      {project.results?.length > 0 && (
        <>
          <SectionDivider index={4} label="Results · what the work moved" tone={accent} />
          <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-28 lg:px-12">
            <div className="mx-auto max-w-7xl">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                  / Results
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-bone md:text-5xl">
                  Numbers we'd put on a slide.
                </h2>
              </Reveal>
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-14 md:grid-cols-4">
                {project.results.map((r, i) => (
                  <Stat key={r.label} value={r.value} label={r.label} i={i} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Quote */}
      {project.quote && (
        <section className="relative w-full px-5 pb-14 sm:pb-20 md:px-8 md:pb-28 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SpotlightCard
                accent={accent}
                radius={560}
                className="rounded-[32px] p-8 md:p-14"
              >
                <span
                  aria-hidden
                  className={`font-display text-7xl leading-none ${accentText[accent]} md:text-9xl`}
                >
                  &ldquo;
                </span>
                <p className="mt-2 font-display text-balance text-2xl leading-[1.25] text-bone md:text-4xl">
                  {project.quote.body}
                </p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/55">
                  — {project.quote.author}
                </p>
              </SpotlightCard>
            </Reveal>
          </div>
        </section>
      )}

      {/* Related */}
      {related?.length > 0 && (
        <>
          <SectionDivider index={5} label="More from the studio · related work" />
          <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-28 lg:px-12">
            <div className="mx-auto max-w-7xl">
              <Reveal>
                <h2 className="font-display text-3xl leading-[1.05] text-bone md:text-5xl">
                  Pairs well with —
                </h2>
              </Reveal>
              <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2">
                {related.map((r) => {
                  const rAccent = accentByCategory[r.category] ?? "ember";
                  return (
                    <StaggerItem key={r.slug}>
                      <SpotlightCard
                        accent={rAccent}
                        className="rounded-[28px]"
                        innerClassName="flex flex-col md:flex-row md:items-stretch"
                      >
                        <Link
                          href={`/projects/${r.slug}`}
                          data-cursor="link"
                          aria-label={`View ${r.name}`}
                          className="absolute inset-0 z-20"
                        />
                        <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:w-2/5">
                          <MediaImage
                            src={picsumSrc(r.name, 800, 600)}
                            alt={`${r.name} — preview`}
                            palette={r.palette}
                            accent={rAccent}
                            sizes="(max-width: 768px) 100vw, 40vw"
                            fallbackLabel={r.name}
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
                          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
                            {categories.find((c) => c.key === r.category)?.label}
                          </span>
                          <h3 className="font-display text-2xl text-bone md:text-3xl">
                            {r.name}
                          </h3>
                          <p className="text-sm text-bone/60 md:text-[15px]">
                            {r.summary}
                          </p>
                          <span className="mt-auto inline-flex items-center gap-2 pt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/55 transition-colors group-hover:text-bone">
                            Read the case study
                            <svg
                              viewBox="0 0 24 24"
                              className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            >
                              <path d="M5 12h14" />
                              <path d="M13 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </SpotlightCard>
                    </StaggerItem>
                  );
                })}
              </StaggerGroup>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
