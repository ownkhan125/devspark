"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import PageHero from "@/components/PageHero";
import SectionDivider from "@/components/SectionDivider";
import SpotlightCard from "@/components/SpotlightCard";
import MediaImage, { pravatarSrc } from "@/components/MediaImage";
import Counter from "@/components/Counter";
import { Reveal, StaggerGroup, StaggerItem, WordsReveal } from "@/components/Reveal";

const reasons = [
  {
    n: "01",
    accent: "ember",
    title: "Dedicated designers + engineers",
    body: "A single pod owns your project end-to-end. No revolving cast, no relay-race handoffs — the same humans who scope it are the ones who ship it.",
  },
  {
    n: "02",
    accent: "iris",
    title: "Real-time project collaboration",
    body: "Shared Linear, shared Figma, shared Slack channel from day one. You see the work as it happens — not three weeks later in a status deck.",
  },
  {
    n: "03",
    accent: "lime",
    title: "Accelerated weekly sprints",
    body: "We ship something visible every Friday. It keeps momentum honest, reveals problems early, and lets you steer the project mid-flight.",
  },
  {
    n: "04",
    accent: "ember",
    title: "Rigorous quality assurance",
    body: "Every release runs through accessibility, performance, and cross-device checks. We treat polish as a feature, not a nice-to-have.",
  },
  {
    n: "05",
    accent: "iris",
    title: "Revisions until it's right",
    body: "Scopes are clear, but craft is open-ended. We keep iterating on the details until you'd happily put your name on it — because we will.",
  },
];

const stats = [
  { to: 1800, suffix: "", label: "Projects shipped" },
  { to: 1600, suffix: "", label: "Teams trusted us" },
  { to: 7, suffix: "d", pad: 2, label: "Avg. sprint cycle" },
  { to: 12, suffix: "yr", label: "Combined craft" },
];

const values = [
  {
    k: "Craft",
    body: "Pixel-pushing isn't a phase; it's the whole job. We sweat motion, hierarchy, copy, and code at the same fidelity.",
  },
  {
    k: "Clarity",
    body: "We say what we mean in plans, scopes, and code. Vague language breeds vague work — we'd rather argue the thing through up front.",
  },
  {
    k: "Calm",
    body: "Great work compounds when nobody is on fire. We protect focus time, push back on fake urgency, and ship faster because of it.",
  },
  {
    k: "Candor",
    body: "If your roadmap is broken or the scope is wrong, we'll tell you in week one. You're paying us for an opinion, not a yes.",
  },
];

const team = [
  {
    name: "Aria Nakamura",
    role: "Founder · Principal Designer",
    bio: "Brand systems, motion, and the unreasonable amount of time we spend on type.",
  },
  {
    name: "Idris Hale",
    role: "Engineering Lead",
    bio: "Next.js, edge runtimes, and the architecture that lets the design actually breathe.",
  },
  {
    name: "Sana Qureshi",
    role: "Product Designer",
    bio: "Onboarding flows, dashboards, and turning unhappy paths into the best part of the product.",
  },
  {
    name: "Marco Vialli",
    role: "Brand & Identity",
    bio: "Logos, voice, and identity systems built to survive a decade — and three rebrands.",
  },
  {
    name: "Priya Mehta",
    role: "Frontend Engineer",
    bio: "Interactions, performance budgets, and the thousand small details that add up to feel.",
  },
  {
    name: "Theo Gallagher",
    role: "Project Director",
    bio: "Sprint rhythm, scope, and the person on the other end of your Friday demo.",
  },
];

const accentBg = {
  ember: "bg-ember/10 text-ember",
  iris: "bg-iris/10 text-iris",
  lime: "bg-lime/10 text-lime-500",
};

function Stat({ s, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex flex-col gap-2 border-t border-bone/15 pt-5"
    >
      <span className="font-mono text-[10px] text-bone/40">/0{i + 1}</span>
      <span className="font-display text-5xl text-bone tabular-nums md:text-6xl">
        <Counter
          to={s.to}
          pad={s.pad ?? 0}
          suffix={s.suffix}
          duration={2 + i * 0.15}
          delay={0.2}
          amount={0.5}
        />
        <span className="text-ember">+</span>
      </span>
      <span className="text-sm text-bone/60">{s.label}</span>
    </motion.div>
  );
}

export default function AboutClient() {
  return (
    <>
      <PageHero
        kicker="About / Studio"
        title="A small studio,"
        highlight="huge"
        trailing="on the details."
        description="Devspark is an independent design and engineering studio. We help founders and product teams turn ambitious ideas into web, product, and brand experiences worth slowing down for."
        primaryCta={{ label: "Start a project", href: "/contact-us" }}
        secondaryCta={{ label: "See our work", href: "/projects" }}
      />

      <SectionDivider index={1} label="Mission · what drives the work" />

      {/* Mission */}
      <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                / Our mission
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl leading-[1.1] text-bone md:text-4xl">
                Empower ambitious teams with work that compounds.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.1}>
              <p className="text-pretty text-lg leading-[1.55] text-bone/75 md:text-2xl">
                We believe the best brands feel made — never assembled. So we
                build them the way a small workshop builds furniture: by hand,
                in small batches, with the same three people from the first
                sketch to the launch tweet.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-base text-bone/60 md:text-lg">
                Whether we're shipping a new product surface, a brand identity,
                or a marketing site that pays for itself in a quarter — the
                ambition is the same. Make the kind of work people screenshot.
                Then make it boringly easy to maintain.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                  / Why teams choose us
                </p>
              </Reveal>
              <h2 className="mt-4 font-display text-balance text-4xl leading-[1.05] text-bone md:text-6xl">
                <span className="block">
                  <WordsReveal text="Build a product users will" />
                </span>
                <span className="block">
                  <WordsReveal text="love — on" delay={0.18} />{" "}
                  <span className="italic text-ember">
                    <WordsReveal text="time" delay={0.34} />
                  </span>
                  <WordsReveal text=", on budget." delay={0.46} />
                </span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={0.15}>
                <p className="text-base text-bone/65 md:text-lg">
                  Five operating principles that decide how we scope, ship, and
                  hand off — pulled from the projects that worked and the ones
                  that taught us harder lessons.
                </p>
              </Reveal>
            </div>
          </div>

          <StaggerGroup className="mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 hide-scrollbar md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:[scroll-snap-type:none] lg:grid-cols-3">
            {reasons.map((r) => (
              <StaggerItem key={r.n} className="w-[85vw] shrink-0 snap-start md:w-auto md:shrink">
                <SpotlightCard accent={r.accent} className="h-full p-7">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full font-mono text-[11px] ${accentBg[r.accent]}`}
                  >
                    {r.n}
                  </span>
                  <h3 className="mt-6 font-display text-2xl leading-tight text-bone">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-bone/65">
                    {r.body}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <SectionDivider index={3} label="By the numbers · a decade of shipping" tone="ember" />

      {/* Stats */}
      <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
              / By the numbers
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-bone md:text-5xl">
              A decade of shipping — quietly, but a lot.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <Stat key={s.label} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                  / What we believe
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-4xl leading-[1.05] text-bone md:text-5xl">
                  Four words we keep coming back to.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 text-bone/60 md:text-lg">
                  Pinned above every project doc. Used as the tie-breaker when
                  we can't agree on a direction.
                </p>
              </Reveal>
            </div>
            <ul className="md:col-span-7">
              {values.map((v, i) => (
                <motion.li
                  key={v.k}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex flex-col gap-2 border-t border-bone/15 py-7 last:border-b md:flex-row md:items-baseline md:gap-10"
                >
                  <span className="flex w-32 shrink-0 items-baseline gap-3 font-display text-3xl italic text-bone md:text-4xl">
                    <span className="font-mono text-[10px] not-italic text-bone/40">
                      0{i + 1}
                    </span>
                    {v.k}
                  </span>
                  <p className="text-bone/70 md:text-lg">{v.body}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team Swiper */}
      <section className="relative w-full px-5 py-14 sm:py-20 md:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
                  / The studio
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-4xl leading-[1.05] text-bone md:text-5xl">
                  The humans behind the work.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <p className="max-w-md text-bone/65">
                A small, deliberately senior team. The people you meet in the
                kickoff are the same people who ship the launch.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-12">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1.1}
              breakpoints={{
                640: { slidesPerView: 2.2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              autoplay={{ delay: 4200, disableOnInteraction: false }}
              loop
              pagination={{ clickable: true, el: ".team-pagination" }}
              className="!overflow-visible"
            >
              {team.map((m, i) => {
                const accent = ["ember", "iris", "lime"][i % 3];
                const initials = m.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");
                return (
                  <SwiperSlide key={m.name}>
                    <SpotlightCard accent={accent} className="h-full p-6">
                      <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-2xl">
                        <MediaImage
                          src={pravatarSrc(m.name, 600)}
                          alt={`${m.name} — ${m.role}`}
                          palette="from-iris/30 via-ember/20 to-lime/10"
                          accent={accent}
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                          fallbackLabel={initials}
                        />
                        <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/80 backdrop-blur">
                          /0{i + 1}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl leading-tight text-bone">
                        {m.name}
                      </h3>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ember/80">
                        {m.role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-bone/60">
                        {m.bio}
                      </p>
                    </SpotlightCard>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="team-pagination mt-8 flex items-center justify-center gap-2 [&>.swiper-pagination-bullet]:h-1.5 [&>.swiper-pagination-bullet]:w-6 [&>.swiper-pagination-bullet]:rounded-full [&>.swiper-pagination-bullet]:bg-bone/20 [&>.swiper-pagination-bullet-active]:w-10 [&>.swiper-pagination-bullet-active]:bg-ember" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
