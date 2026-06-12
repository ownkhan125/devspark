"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { Reveal } from "@/components/Reveal";

const accentText = {
  ember: "text-ember",
  iris: "text-iris",
  lime: "text-lime",
};
const accentRing = {
  ember:
    "shadow-[0_30px_120px_-30px_rgba(255,90,31,0.45),0_60px_180px_-60px_rgba(255,90,31,0.35)]",
  iris: "shadow-[0_30px_120px_-30px_rgba(124,92,255,0.45),0_60px_180px_-60px_rgba(124,92,255,0.35)]",
  lime: "shadow-[0_30px_120px_-30px_rgba(199,255,61,0.35),0_60px_180px_-60px_rgba(199,255,61,0.25)]",
};

// Renders the post HTML at native size inside an iframe, scaled to fit the
// stage container. The iframe always loads the post at 1080×{1080|1920};
// the surrounding wrapper drives visual size on each viewport.
function LiveStage({ post }) {
  const stageRef = useRef(null);
  const iframeRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
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
    window.addEventListener("orientationchange", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", update);
    };
  }, [post.width, post.height]);

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
    const fallback = setTimeout(markLoaded, 3000);
    return () => {
      cancelled = true;
      clearInterval(interval);
      clearTimeout(fallback);
      iframe.removeEventListener("load", markLoaded);
    };
  }, [post.src]);

  const isStory = post.format === "story";

  return (
    <div
      ref={stageRef}
      className={`relative mx-auto w-full overflow-hidden rounded-[24px] border border-bone/10 bg-ink-900 ${accentRing[post.accent] ?? accentRing.ember} ${
        isStory ? "aspect-[9/16] max-w-[420px]" : "aspect-square max-w-[640px]"
      }`}
    >
      <iframe
        ref={iframeRef}
        title={`${post.title} — live preview`}
        src={post.src}
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
        }}
      />
      {!loaded && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/30 backdrop-blur-[2px]">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-bone/30 border-t-bone" />
        </div>
      )}
    </div>
  );
}

function Crumb({ post }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/45"
    >
      <Link href="/" className="hover:text-bone" data-cursor="link">
        Home
      </Link>
      <span className="text-bone/25">/</span>
      <Link
        href="/social-media-posts"
        className="hover:text-bone"
        data-cursor="link"
      >
        Social Media Posts
      </Link>
      <span className="text-bone/25">/</span>
      <span className="text-bone/75">{post.title}</span>
    </nav>
  );
}

export default function SocialMediaPostDetailClient({ post, prev, next }) {
  return (
    <>
      <section className="relative isolate w-full overflow-hidden pb-12 pt-28 sm:pt-32 md:pt-40 lg:pt-44">
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-iris/30 blur-[140px] md:h-[560px] md:w-[560px]"
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="pointer-events-none absolute -left-24 top-1/3 h-[340px] w-[340px] rounded-full bg-ember/25 blur-[140px] md:h-[460px] md:w-[460px]"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 md:px-8 lg:px-12">
          <Reveal>
            <Crumb post={post} />
          </Reveal>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
            {/* Live preview */}
            <Reveal className="md:col-span-7" delay={0.05}>
              <div className="relative isolate pt-4">
                <span className="absolute left-2 top-0 z-20 inline-flex items-center gap-2 rounded-full border border-bone/15 bg-ink-800/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.6)] backdrop-blur md:left-4">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-lime/70" />
                    <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-lime" />
                  </span>
                  Live preview
                </span>
                <LiveStage post={post} />
                <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-bone/45">
                  {post.width} × {post.height} px · scaled to fit
                </p>
              </div>
            </Reveal>

            {/* Meta */}
            <div className="md:col-span-5">
              <Reveal delay={0.1}>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/55">
                  <span className={accentText[post.accent] ?? "text-ember"}>
                    /{post.n}
                  </span>{" "}
                  · {post.formatLabel}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <h1 className="mt-4 font-display text-balance text-4xl leading-[1.04] text-bone md:text-5xl lg:text-6xl">
                  {post.title}
                </h1>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-6 text-pretty text-base text-bone/70 md:text-lg">
                  {post.concept}
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-bone/15 pt-8">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
                      Format
                    </dt>
                    <dd className="mt-1.5 text-[15px] text-bone">
                      {post.formatLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
                      Dimensions
                    </dt>
                    <dd className="mt-1.5 text-[15px] text-bone tabular-nums">
                      {post.width} × {post.height}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
                      Aspect
                    </dt>
                    <dd className="mt-1.5 text-[15px] text-bone">
                      {post.format === "feed" ? "1 : 1" : "9 : 16"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
                      Index
                    </dt>
                    <dd className="mt-1.5 text-[15px] text-bone">
                      {post.index} of 20
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={0.34}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href={post.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="cta"
                    className="group inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-[13px] font-medium text-bone transition-transform hover:scale-[1.02]"
                  >
                    Open standalone
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </a>
                  <Link
                    href="/social-media-posts"
                    data-cursor="link"
                    className="inline-flex items-center gap-2 rounded-full border border-bone/20 px-5 py-3 text-[13px] font-medium text-bone/80 transition-colors hover:border-bone/40 hover:text-bone"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M19 12H5" />
                      <path d="m11 5-7 7 7 7" />
                    </svg>
                    All posts
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      {(prev || next) && (
        <section className="relative w-full px-5 pb-20 md:px-8 md:pb-32 lg:px-12">
          <div className="mx-auto max-w-7xl border-t border-bone/10 pt-10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {prev ? (
                <Link
                  href={`/social-media-posts/${prev.slug}`}
                  data-cursor="link"
                  className="group flex items-center justify-between gap-6 rounded-2xl border border-bone/10 bg-ink-800/40 px-6 py-5 transition-colors hover:border-bone/30"
                >
                  <span className="flex items-center gap-4">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-bone/60 transition-transform group-hover:-translate-x-0.5 group-hover:text-bone"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M19 12H5" />
                      <path d="m11 5-7 7 7 7" />
                    </svg>
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
                        Previous · /{prev.n}
                      </span>
                      <span className="mt-0.5 block font-display text-lg italic text-bone">
                        {prev.title}
                      </span>
                    </span>
                  </span>
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45 md:inline">
                    {prev.formatLabel}
                  </span>
                </Link>
              ) : (
                <span aria-hidden />
              )}
              {next ? (
                <Link
                  href={`/social-media-posts/${next.slug}`}
                  data-cursor="link"
                  className="group flex items-center justify-between gap-6 rounded-2xl border border-bone/10 bg-ink-800/40 px-6 py-5 transition-colors hover:border-bone/30 md:text-right"
                >
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45 md:inline">
                    {next.formatLabel}
                  </span>
                  <span className="flex items-center gap-4 md:flex-row-reverse">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-bone/60 transition-transform group-hover:translate-x-0.5 group-hover:text-bone"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
                        Next · /{next.n}
                      </span>
                      <span className="mt-0.5 block font-display text-lg italic text-bone">
                        {next.title}
                      </span>
                    </span>
                  </span>
                </Link>
              ) : (
                <span aria-hidden />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
