"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";

import PageHero from "@/components/PageHero";
import SectionDivider from "@/components/SectionDivider";
import SpotlightCard from "@/components/SpotlightCard";
import { Reveal } from "@/components/Reveal";
import { socialPosts, socialFormatCounts } from "@/lib/socialPosts";

const accentDot = {
  ember: "bg-ember shadow-[0_0_14px_currentColor] text-ember",
  iris: "bg-iris shadow-[0_0_14px_currentColor] text-iris",
  lime: "bg-lime shadow-[0_0_14px_currentColor] text-lime",
};

// Renders the actual post HTML at native size inside an iframe, then
// scales it down to fit a thumbnail container — no screenshots, no
// flattening: every preview is the live composition.
function PostThumb({ post, kind }) {
  const wrapRef = useRef(null);
  const iframeRef = useRef(null);
  const [scale, setScale] = useState(0.25);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const s = Math.min(w / post.width, h / post.height);
      setScale(s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [post.width, post.height]);

  // iframe.onLoad in React can miss the event when the HTML finishes loading
  // before the handler is attached. Poll readyState and fall back to a timeout
  // so the spinner reliably disappears.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    let cancelled = false;
    const markLoaded = () => {
      if (!cancelled) setLoaded(true);
    };
    const check = () => {
      try {
        if (iframe.contentDocument?.readyState === "complete") markLoaded();
      } catch {
        markLoaded();
      }
    };
    check();
    iframe.addEventListener("load", markLoaded);
    const interval = setInterval(check, 200);
    const fallback = setTimeout(markLoaded, 2500);
    return () => {
      cancelled = true;
      clearInterval(interval);
      clearTimeout(fallback);
      iframe.removeEventListener("load", markLoaded);
    };
  }, [post.src]);

  const isStory = kind === "story";

  return (
    <div
      ref={wrapRef}
      className={`relative w-full overflow-hidden bg-ink-900 ${
        isStory ? "aspect-[9/16]" : "aspect-square"
      }`}
    >
      <iframe
        ref={iframeRef}
        title={`${post.title} live preview`}
        src={post.src}
        loading="lazy"
        scrolling="no"
        style={{
          width: post.width,
          height: post.height,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
          position: "absolute",
          left: "50%",
          top: "50%",
          border: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      {!loaded && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/40 backdrop-blur-[2px]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-bone/30 border-t-bone" />
        </div>
      )}
    </div>
  );
}

function PostCard({ post, i }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{
        duration: 0.6,
        delay: i * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-auto w-[85vw] shrink-0 snap-start md:h-full md:w-auto md:shrink"
    >
      <SpotlightCard
        accent={post.accent}
        radius={460}
        className="h-full rounded-[24px]"
        innerClassName="flex h-full flex-col"
      >
        <Link
          href={`/social-media-posts/${post.slug}`}
          data-cursor="link"
          aria-label={`Open ${post.title}`}
          className="absolute inset-0 z-20"
        />

        <PostThumb post={post} kind={post.format} />

        <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
              <span
                className={`h-1.5 w-1.5 rounded-full ${accentDot[post.accent] ?? accentDot.ember}`}
              />
              {post.formatLabel}
            </span>
            <span className="font-mono text-[10px] text-bone/40">
              /{post.n}
            </span>
          </div>

          <h3 className="font-display text-2xl leading-[1.1] text-bone md:text-[26px]">
            {post.title}
          </h3>
          <p className="text-sm leading-relaxed text-bone/60">{post.concept}</p>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-bone/10 pt-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
              {post.width} × {post.height}
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/65 transition-colors group-hover:text-bone">
              View live
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
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export default function SocialMediaPostsClient() {
  const formats = useMemo(() => socialFormatCounts(), []);
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const byFormat =
      active === "all"
        ? socialPosts
        : socialPosts.filter((p) => p.format === active);
    const q = query.trim().toLowerCase();
    if (!q) return byFormat;
    return byFormat.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.concept.toLowerCase().includes(q) ||
        p.formatLabel.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
    );
  }, [active, query]);

  return (
    <>
      <PageHero
        kicker="Campaign / Vol. 01"
        title="Social media posts,"
        highlight="live"
        trailing="in the browser."
        description="Twenty original Instagram-feed and story compositions, designed end-to-end. Every card on this page is the real HTML, scaled down — no flattened screenshots, no mockups."
      />

      <SectionDivider
        index={1}
        label="Gallery · twenty live compositions"
        tone="ember"
      />

      <section className="relative w-full px-5 pb-16 sm:pb-24 md:px-8 md:pb-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
                <LayoutGroup id="social-filter-pill">
                  {formats.map((f) => {
                    const isActive = active === f.key;
                    return (
                      <button
                        key={f.key}
                        type="button"
                        data-cursor="link"
                        onClick={() => setActive(f.key)}
                        className={`relative inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                          isActive
                            ? "border-bone/0 text-bone"
                            : "border-bone/15 text-bone/65 hover:border-bone/30 hover:text-bone"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="social-filter-bg"
                            className="absolute inset-0 -z-10 rounded-full bg-bone/10"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                        {f.label}
                        <span className="font-mono text-[10px] text-bone/40">
                          {f.count}
                        </span>
                      </button>
                    );
                  })}
                </LayoutGroup>
              </div>

              <label className="group relative flex w-full max-w-sm items-center gap-3 rounded-full border border-bone/15 bg-ink-800/40 px-4 py-2 backdrop-blur transition-colors focus-within:border-bone/40 md:w-auto md:min-w-[300px]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-bone/45 transition-colors group-focus-within:text-bone/80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search compositions"
                  data-cursor="text"
                  className="w-full bg-transparent text-[13px] text-bone placeholder:text-bone/40 focus:outline-none"
                  aria-label="Search social media posts"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    data-cursor="link"
                    className="rounded-full border border-bone/15 px-2 py-0.5 text-[10px] text-bone/55 hover:text-bone"
                  >
                    Clear
                  </button>
                )}
              </label>
            </div>
          </Reveal>

          <LayoutGroup>
            <motion.div
              layout
              className="mt-8 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 hide-scrollbar md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:[scroll-snap-type:none] lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <PostCard key={p.slug} post={p} i={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-bone/60">
              No compositions match this filter.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
