"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Social", href: "/social-media-posts" },
  { label: "About", href: "/about-us" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6"
      >
        <motion.nav
          animate={{
            width: scrolled ? "min(96%, 980px)" : "min(100%, 1280px)",
            backgroundColor: scrolled
              ? "rgba(19,18,27,0.7)"
              : "rgba(19,18,27,0)",
            borderColor: scrolled
              ? "rgba(244,239,230,0.12)"
              : "rgba(244,239,230,0)",
            paddingTop: scrolled ? 10 : 14,
            paddingBottom: scrolled ? 10 : 14,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex w-full items-center justify-between gap-6 rounded-full border px-4 pl-5 backdrop-blur-xl md:px-6 md:pl-7"
          style={{ willChange: "width, padding" }}
        >
          <Link
            href="/"
            data-cursor="link"
            className="group flex items-center gap-2 text-bone"
            aria-label="Devspark, back to home"
          >
            <span className="relative inline-flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-ember via-iris to-lime opacity-90 blur-[2px]" />
              <span className="absolute inset-[2px] rounded-full bg-ink" />
              <span className="relative font-display text-base italic text-bone">
                ds
              </span>
            </span>
            <span className="hidden text-[15px] font-medium tracking-tight md:inline">
              Devspark<span className="text-ember">.</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-0.5 md:flex">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href} className="relative">
                  <Link
                    href={l.href}
                    data-cursor="link"
                    className="group relative inline-flex items-center whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium text-bone/70 transition-colors hover:text-bone lg:px-3.5"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-bone/10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <Link
              href="/contact-us"
              data-cursor="cta"
              className="group relative inline-flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-bone px-5 py-2 text-[13px] font-medium text-ink transition-transform"
            >
              <span className="relative z-10 whitespace-nowrap">Start a project</span>
              <svg
                viewBox="0 0 24 24"
                className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg>
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-ember/40 opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            data-cursor="link"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/15 text-bone md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            <span className="relative block h-3 w-5">
              <motion.span
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-0 h-px w-full bg-bone"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 h-px w-full bg-bone"
              />
            </span>
          </button>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1] }}
              className="absolute inset-0 origin-top bg-ink/95 backdrop-blur-xl"
            >
              <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-iris/30 blur-[120px]" />
              <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-ember/20 blur-[120px]" />

              <div className="relative flex h-full flex-col px-6 pb-10 pt-28">
                <ul className="flex flex-col gap-2">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.15 + i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="border-b border-bone/10 py-3"
                    >
                      <Link
                        href={l.href}
                        className="flex items-baseline justify-between"
                      >
                        <span className="font-display text-4xl italic leading-none text-bone">
                          {l.label}
                        </span>
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 text-bone/35"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M5 12h14" />
                          <path d="M13 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-auto"
                >
                  <Link
                    href="/contact-us"
                    className="group flex items-center justify-between rounded-2xl bg-bone px-5 py-4 text-ink"
                  >
                    <span className="font-medium">Start a project</span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ember text-bone">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </span>
                  </Link>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/40">
                    Available worldwide · Studio in Rawalpindi
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
