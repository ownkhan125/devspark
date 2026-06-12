"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SocialIcon } from "@/components/SocialIcons";

const studioLinks = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Social Media Posts", "/social-media-posts"],
  ["About", "/about-us"],
  ["Blogs", "/blogs"],
  ["Contact", "/contact-us"],
];

const serviceLinks = [
  ["Web Development", "/services/web-development-service"],
  ["UI / UX Design", "/services/ui-ux-design-service"],
  ["Graphic Design", "/services/graphic-design-service"],
];

const legalLinks = [
  ["Terms of Service", "/terms-of-service"],
  ["Privacy Policy", "/privacy-policy"],
  ["Accessibility", "/accessibility"],
];

const socials = [
  { type: "linkedin", href: "https://www.linkedin.com/" },
  { type: "instagram", href: "https://www.instagram.com/" },
  { type: "x", href: "https://x.com/" },
  { type: "facebook", href: "https://www.facebook.com/" },
  { type: "youtube", href: "https://www.youtube.com/" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-bone/10 px-5 py-14 md:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-10 md:grid-cols-12"
        >
          <div className="col-span-2 flex flex-col gap-5 md:col-span-4">
            <Link
              href="/"
              data-cursor="link"
              className="inline-flex items-center gap-2 text-bone"
              aria-label="Devspark"
            >
              <span className="relative inline-flex h-9 w-9 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-ember via-iris to-lime opacity-90 blur-[2px]" />
                <span className="absolute inset-[2px] rounded-full bg-ink" />
                <span className="relative font-display text-base italic text-bone">
                  ds
                </span>
              </span>
              <span className="font-display text-2xl italic">
                Devspark<span className="text-ember">.</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm text-bone/55">
              Independent design + engineering studio. Web, product, and brand
              experiences for teams who refuse to ship the average.
            </p>
            <div className="flex flex-col gap-2 text-sm text-bone/70">
              <a
                href="mailto:hello@devspark.studio"
                data-cursor="link"
                className="inline-flex items-center gap-2 transition-colors hover:text-ember"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
                  Email
                </span>
                hello@devspark.studio
              </a>
              <a
                href="tel:+16463499973"
                data-cursor="link"
                className="inline-flex items-center gap-2 transition-colors hover:text-ember"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
                  Phone
                </span>
                +1 646 349 9973
              </a>
            </div>
          </div>

          <nav aria-label="Studio" className="col-span-1 md:col-span-2">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
              Studio
            </p>
            <ul className="space-y-2 text-sm text-bone/75">
              {studioLinks.map(([l, h]) => (
                <li key={l}>
                  <Link
                    href={h}
                    data-cursor="link"
                    className="transition-colors hover:text-ember"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="col-span-1 md:col-span-3">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
              Services
            </p>
            <ul className="space-y-2 text-sm text-bone/75">
              {serviceLinks.map(([l, h]) => (
                <li key={l}>
                  <Link
                    href={h}
                    data-cursor="link"
                    className="transition-colors hover:text-ember"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-3">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
              Visit
            </p>
            <p className="text-sm text-bone/75">
              Office 401, Plaza 06,<br />
              Eiffel Tower Commercial,<br />
              Bahria Town Phase 8,<br />
              Rawalpindi
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
              Hours
            </p>
            <p className="mt-1 text-sm text-bone/75">
              Mon – Fri · 10:00 – 20:00
            </p>
          </div>
        </motion.div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-bone/10 pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[11px] text-bone/45">
            © {year} Devspark Studio — Made with care.
          </p>
          <div className="flex w-full flex-col gap-5 md:w-auto md:flex-row md:items-center md:gap-5">
            <div className="flex flex-wrap items-center gap-2">
              {legalLinks.map(([l, h]) => (
                <Link
                  key={l}
                  href={h}
                  data-cursor="link"
                  className="rounded-full border border-bone/15 px-3 py-1.5 text-[11px] text-bone/70 transition-colors hover:border-bone/40 hover:text-bone"
                >
                  {l}
                </Link>
              ))}
            </div>
            <span className="hidden h-3 w-px bg-bone/15 md:block" />
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <SocialIcon key={s.type} type={s.type} href={s.href} />
              ))}
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none mt-12 select-none overflow-hidden"
        >
          <p className="font-display text-[24vw] leading-none text-bone/[0.04] md:text-[16vw]">
            Devspark.
          </p>
        </div>
      </div>
    </footer>
  );
}
