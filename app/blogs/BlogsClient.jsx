"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import PageHero from "@/components/PageHero";
import SectionDivider from "@/components/SectionDivider";
import SpotlightCard from "@/components/SpotlightCard";
import MediaImage, { picsumSrc } from "@/components/MediaImage";
import { Reveal } from "@/components/Reveal";
import { posts as allPosts, blogCategories as categories, formatDate } from "@/lib/posts";

const POSTS_PER_PAGE = 6;

export default function BlogsClient() {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const featured = allPosts.find((p) => p.featured);
  const rest = allPosts.filter((p) => !p.featured);

  const filtered = useMemo(() => {
    if (category === "All") return rest;
    return rest.filter((p) => p.category === category);
  }, [category, rest]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visible = filtered.slice(start, start + POSTS_PER_PAGE);

  const setCat = (c) => {
    setCategory(c);
    setPage(1);
  };

  return (
    <>
      <PageHero
        kicker="Field notes / Journal"
        title="Insights on design,"
        highlight="code"
        trailing="and the work between."
        description="Things we write down because we forgot them once. Studio notes, build retrospectives, and the occasional hot take."
      />

      <SectionDivider index={1} label="Featured · this week's read" tone="iris" />

      {/* Featured post */}
      {featured && (
        <section className="relative w-full px-5 pb-12 md:px-8 md:pb-16 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SpotlightCard
                accent="iris"
                radius={520}
                className="rounded-[32px]"
                innerClassName="grid grid-cols-1 md:grid-cols-2"
              >
                <Link
                  href={`/blogs/${featured.slug}`}
                  data-cursor="link"
                  aria-label={`Read: ${featured.title}`}
                  className="absolute inset-0 z-20"
                />
                <div className="relative aspect-[5/4] overflow-hidden md:aspect-auto">
                  <div className="absolute inset-0 transition-transform duration-[0.9s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
                    <MediaImage
                      src={picsumSrc(`featured-${featured.title}`, 1600, 1200)}
                      alt={`Featured post — ${featured.title}`}
                      palette={featured.palette}
                      accent="iris"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      fallbackLabel={featured.category}
                    />
                  </div>
                  <span className="absolute left-5 top-5 rounded-full bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/80 backdrop-blur">
                    Featured
                  </span>
                </div>
                <div className="flex flex-col gap-5 p-7 md:p-12">
                  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/45">
                    <span className="text-ember">{featured.category}</span>
                    <span className="text-bone/25">/</span>
                    <span>{formatDate(featured.date)}</span>
                    <span className="text-bone/25">/</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <h2 className="font-display text-3xl leading-[1.08] text-bone md:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="text-bone/65 md:text-[17px]">{featured.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.22em] text-bone/55 transition-colors group-hover:text-bone">
                    Read the piece
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
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
            </Reveal>
          </div>
        </section>
      )}

      {/* Category filter */}
      <section className="relative w-full px-5 py-6 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
              <LayoutGroup id="blog-filter-pill">
                {categories.map((c) => {
                  const isActive = category === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      data-cursor="link"
                      onClick={() => setCat(c)}
                      className={`relative inline-flex shrink-0 items-center rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                        isActive
                          ? "border-bone/0 text-bone"
                          : "border-bone/15 text-bone/65 hover:border-bone/30 hover:text-bone"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="blog-filter-bg"
                          className="absolute inset-0 -z-10 rounded-full bg-bone/10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      {c}
                    </button>
                  );
                })}
              </LayoutGroup>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Posts grid */}
      <section className="relative w-full px-5 pb-16 sm:pb-24 md:px-8 md:pb-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <LayoutGroup>
            <motion.div
              layout
              className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 hide-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:[scroll-snap-type:none] lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((p, i) => {
                  const accent = ["ember", "iris", "lime"][i % 3];
                  return (
                    <motion.div
                      layout
                      key={p.title}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10, scale: 0.97 }}
                      transition={{
                        duration: 0.55,
                        delay: i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-auto w-[85vw] shrink-0 snap-start md:h-full md:w-auto md:shrink"
                    >
                      <SpotlightCard
                        accent={accent}
                        className="h-full rounded-[24px]"
                        innerClassName="flex h-full flex-col"
                      >
                        <Link
                          href={`/blogs/${p.slug}`}
                          data-cursor="link"
                          aria-label={`Read: ${p.title}`}
                          className="absolute inset-0 z-20"
                        />
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <div className="absolute inset-0 transition-transform duration-[0.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
                            <MediaImage
                              src={picsumSrc(p.title, 1200, 750)}
                              alt={p.title}
                              palette={p.palette}
                              accent={accent}
                              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                              fallbackLabel={p.category}
                            />
                          </div>
                          <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/80 backdrop-blur">
                            {p.category}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col gap-3 p-6">
                          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
                            <span>{formatDate(p.date)}</span>
                            <span className="h-0.5 w-0.5 rounded-full bg-bone/30" />
                            <span>{p.readTime}</span>
                          </div>
                          <h3 className="font-display text-xl leading-[1.18] text-bone md:text-2xl">
                            {p.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-bone/60">
                            {p.excerpt}
                          </p>
                          <span className="mt-auto inline-flex items-center gap-2 pt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/50 transition-colors group-hover:text-bone">
                            Learn more
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
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-between gap-4 border-t border-bone/10 pt-8 md:mt-20">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                data-cursor="link"
                className="group inline-flex items-center gap-2 rounded-full border border-bone/15 px-5 py-2.5 text-[13px] font-medium text-bone/70 transition-colors hover:border-bone/40 hover:text-bone disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M19 12H5" />
                  <path d="m11 5-7 7 7 7" />
                </svg>
                Previous
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    data-cursor="link"
                    className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full font-mono text-[11px] transition-colors ${
                      currentPage === n
                        ? "bg-bone text-ink"
                        : "border border-bone/15 text-bone/60 hover:border-bone/40 hover:text-bone"
                    }`}
                  >
                    {String(n).padStart(2, "0")}
                  </button>
                ))}
              </div>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                data-cursor="link"
                className="group inline-flex items-center gap-2 rounded-full border border-bone/15 px-5 py-2.5 text-[13px] font-medium text-bone/70 transition-colors hover:border-bone/40 hover:text-bone disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
