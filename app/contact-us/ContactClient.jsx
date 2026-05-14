"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import PageHero from "@/components/PageHero";
import SectionDivider from "@/components/SectionDivider";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SocialIcon } from "@/components/SocialIcons";
import SpotlightCard from "@/components/SpotlightCard";

const channels = [
  {
    kicker: "Email",
    value: "hello@devspark.studio",
    href: "mailto:hello@devspark.studio",
    sub: "Replies within one business day.",
  },
  {
    kicker: "Phone",
    value: "+1 646 349 9973",
    href: "tel:+16463499973",
    sub: "Mon – Fri · 10:00 – 20:00 (PKT)",
  },
  {
    kicker: "Studio",
    value: "Office 401, Plaza 06",
    href: "https://maps.google.com",
    sub: "Eiffel Tower Commercial, Bahria Town Phase 8, Rawalpindi.",
  },
];

const socials = [
  { type: "linkedin", href: "https://www.linkedin.com/" },
  { type: "instagram", href: "https://www.instagram.com/" },
  { type: "x", href: "https://x.com/" },
  { type: "facebook", href: "https://www.facebook.com/" },
  { type: "youtube", href: "https://www.youtube.com/" },
];

const partners = [
  "Anthropic",
  "Stripe",
  "Vercel",
  "Linear",
  "Framer",
  "Notion",
  "Figma",
  "Webflow",
];

export default function ContactClient() {
  return (
    <>
      <PageHero
        kicker="Contact / Hello"
        title="Tell us about the"
        highlight="project"
        trailing="."
        description="A few sentences is plenty. We'll come back within one business day with a small plan, a price band, and a calendar invite — even if the answer is 'this isn't a fit.'"
      />

      <SectionDivider index={1} label="Send a note · we reply within one business day" tone="ember" />

      <section className="relative w-full px-5 pb-16 sm:pb-24 md:px-8 md:pb-32 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal delay={0.1} className="flex flex-col gap-4">
              <div className="rounded-[28px] border border-bone/10 bg-ink-800/40 p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                  / Open for projects
                </p>
                <p className="mt-4 inline-flex items-center gap-2 text-bone">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-lime/70" />
                    <span className="relative inline-block h-2 w-2 rounded-full bg-lime" />
                  </span>
                  Taking on three new engagements this quarter.
                </p>
                <p className="mt-3 text-sm text-bone/55">
                  Most kickoffs happen in week two. Urgent? Mention it in the
                  message — we'll see if we can clear a slot.
                </p>
              </div>

              {channels.map((c, i) => (
                <SpotlightCard
                  key={c.kicker}
                  as="a"
                  href={c.href}
                  data-cursor="link"
                  target={c.kicker === "Studio" ? "_blank" : undefined}
                  rel={c.kicker === "Studio" ? "noreferrer" : undefined}
                  accent={i === 0 ? "ember" : i === 1 ? "iris" : "lime"}
                  innerClassName="p-7"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                    {c.kicker}
                  </span>
                  <span className="mt-3 flex items-baseline justify-between gap-3">
                    <span className="font-display text-2xl text-bone md:text-3xl">
                      {c.value}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone/15 text-bone/60 transition-all duration-300 group-hover:-rotate-45 group-hover:border-bone/40 group-hover:text-bone">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </span>
                  <span className="mt-2 block text-sm text-bone/55">{c.sub}</span>
                </SpotlightCard>
              ))}

              <div className="rounded-[28px] border border-bone/10 bg-ink-800/40 p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                  / Follow along
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {socials.map((s) => (
                    <SocialIcon key={s.type} type={s.type} href={s.href} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Partners marquee */}
      <section className="relative w-full overflow-hidden border-y border-bone/10 py-8">
        <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
          Trusted by teams shipping at
        </p>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={48}
          slidesPerView="auto"
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={6500}
          loop
          allowTouchMove={false}
          className="!overflow-visible"
        >
          {[...partners, ...partners].map((p, i) => (
            <SwiperSlide key={`${p}-${i}`} className="!w-auto">
              <span className="whitespace-nowrap font-display text-2xl italic text-bone/40 md:text-3xl">
                {p}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
