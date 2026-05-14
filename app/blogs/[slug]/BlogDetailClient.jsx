"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";

import { formatDate } from "@/lib/posts";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
  WordsReveal,
} from "@/components/Reveal";
import SectionDivider from "@/components/SectionDivider";
import SpotlightCard from "@/components/SpotlightCard";
import MediaImage, { picsumSrc } from "@/components/MediaImage";

function Cover({ post }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-6 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-[28px] border border-bone/10 sm:mt-10 md:rounded-[36px]"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <MediaImage
          src={picsumSrc(`post-${post.slug}-cover`, 1800, 1000)}
          alt={`${post.title} — cover`}
          palette={post.palette}
          accent="iris"
          priority
          sizes="(max-width: 1024px) 100vw, 960px"
          fallbackLabel={post.category}
        />
      </motion.div>
      <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-ink/65 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/85 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-ember" />
        {post.category}
      </span>
    </motion.div>
  );
}

function Body({ post }) {
  return (
    <article className="prose-quiet relative mx-auto max-w-3xl">
      {post.body?.map((block, i) => {
        if (block.type === "h2") {
          return (
            <Reveal key={i} delay={0.02}>
              <h2 className="mt-12 font-display text-2xl leading-[1.18] text-bone md:mt-16 md:text-3xl">
                {block.text}
              </h2>
            </Reveal>
          );
        }
        if (block.type === "h3") {
          return (
            <Reveal key={i}>
              <h3 className="mt-10 font-display text-xl leading-[1.2] text-bone md:text-2xl">
                {block.text}
              </h3>
            </Reveal>
          );
        }
        if (block.type === "quote") {
          return (
            <Reveal key={i}>
              <blockquote className="my-10 border-l-2 border-ember pl-6 font-display text-xl italic text-bone md:text-2xl">
                {block.text}
              </blockquote>
            </Reveal>
          );
        }
        return (
          <Reveal key={i}>
            <p className="mt-5 text-[16px] leading-[1.65] text-bone/75 md:text-[17px]">
              {block.text}
            </p>
          </Reveal>
        );
      })}
    </article>
  );
}

export default function BlogDetailClient({ post, related }) {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef });

  return (
    <div ref={pageRef}>
      {/* Top-of-page reading-progress line */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 right-0 top-[72px] z-30 h-px origin-left bg-ember"
        style={{ scaleX: scrollYProgress, opacity: 0.85 }}
      />

      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden pb-10 pt-28 sm:pt-32 md:pt-44">
        <motion.div
          aria-hidden
          animate={{ x: [0, 30, -22, 0], y: [0, -22, 18, 0], scale: [1, 1.06, 0.97, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-iris/30 blur-[140px] md:h-[560px] md:w-[560px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(244,239,230,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,239,230,0.04)_1px,transparent_1px)] bg-[size:60px_60px] mask-fade-y"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 sm:gap-8 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/55"
          >
            <Link
              href="/blogs"
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
              Field notes
            </Link>
            <span className="text-bone/25">/</span>
            <span className="text-ember">{post.category}</span>
            <span className="text-bone/25">/</span>
            <span>{formatDate(post.date)}</span>
            <span className="text-bone/25">/</span>
            <span>{post.readTime}</span>
          </motion.div>

          <h1 className="font-display text-balance text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.06] text-bone">
            <WordsReveal text={post.title} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-pretty text-base text-bone/70 md:text-lg"
          >
            {post.excerpt}
          </motion.p>

          {post.author && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 pt-2"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-iris/40 via-ember/30 to-lime/20 font-display text-sm italic text-bone">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div className="flex flex-col">
                <span className="text-sm text-bone">{post.author.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45">
                  {post.author.role}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
          <Cover post={post} />
        </div>
      </section>

      <SectionDivider index={1} label="Reading time · settle in" tone="iris" />

      {/* Body */}
      <section className="relative w-full px-5 py-10 md:px-8 md:py-16 lg:px-12">
        <Body post={post} />
      </section>

      {/* Sign-off */}
      <section className="relative w-full px-5 pb-12 md:px-8 md:pb-20 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="border-t border-bone/10 pt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
                Filed under
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Link
                  href="/blogs"
                  className="rounded-full border border-bone/15 px-3 py-1.5 text-[11px] text-bone/70 transition-colors hover:border-bone/40 hover:text-bone"
                >
                  {post.category}
                </Link>
                <Link
                  href="/contact-us"
                  className="rounded-full bg-ember px-3 py-1.5 text-[11px] font-medium text-bone transition-transform hover:scale-[1.03]"
                >
                  Got a project? →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related?.length > 0 && (
        <>
          <SectionDivider index={2} label="More from the journal" tone="ember" />
          <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-28 lg:px-12">
            <div className="mx-auto max-w-7xl">
              <Reveal>
                <h2 className="font-display text-3xl leading-[1.05] text-bone md:text-5xl">
                  Keep reading.
                </h2>
              </Reveal>
              <StaggerGroup className="mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 hide-scrollbar md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:[scroll-snap-type:none] lg:grid-cols-3">
                {related.map((r, i) => {
                  const accent = ["ember", "iris", "lime"][i % 3];
                  return (
                    <StaggerItem
                      key={r.slug}
                      className="w-[85vw] shrink-0 snap-start md:w-auto md:shrink"
                    >
                      <SpotlightCard
                        accent={accent}
                        className="h-full rounded-[24px]"
                        innerClassName="flex h-full flex-col"
                      >
                        <Link
                          href={`/blogs/${r.slug}`}
                          data-cursor="link"
                          aria-label={`Read: ${r.title}`}
                          className="absolute inset-0 z-20"
                        />
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <MediaImage
                            src={picsumSrc(r.title, 1200, 750)}
                            alt={r.title}
                            palette={r.palette}
                            accent={accent}
                            sizes="(max-width: 768px) 90vw, 33vw"
                            fallbackLabel={r.category}
                          />
                          <span className="absolute left-4 top-4 rounded-full bg-ink/65 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/85 backdrop-blur">
                            {r.category}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col gap-3 p-6">
                          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
                            <span>{formatDate(r.date)}</span>
                            <span className="h-0.5 w-0.5 rounded-full bg-bone/30" />
                            <span>{r.readTime}</span>
                          </div>
                          <h3 className="font-display text-xl leading-[1.18] text-bone md:text-2xl">
                            {r.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-bone/60">
                            {r.excerpt}
                          </p>
                          <span className="mt-auto inline-flex items-center gap-2 pt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/50 transition-colors group-hover:text-bone">
                            Read on
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
