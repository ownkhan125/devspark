export const categories = [
  { key: "all", label: "All" },
  { key: "ui-ux", label: "UI / UX Design" },
  { key: "web", label: "Web Development" },
  { key: "brand", label: "Graphic Design" },
];

export const accentByCategory = {
  "ui-ux": "iris",
  web: "ember",
  brand: "lime",
};

export const projects = [
  {
    slug: "hm-properties",
    name: "HM Properties",
    category: "ui-ux",
    tags: ["Accessibility", "Information Architecture", "Trust"],
    timeline: "2 weeks",
    palette: "from-iris/50 via-iris/15 to-ember/25",
    summary:
      "A real-estate platform redesign focused on trust signals, search clarity, and a frictionless inquiry flow.",
    client: "HM Properties",
    industry: "Real estate",
    role: ["Product Design", "UI Engineering"],
    year: "2025",
    services: ["UI / UX Design", "Web Development"],
    liveUrl: null,
    challenge:
      "The existing site buried listings behind heavy filters and offered no signal of agent reliability. Inquiry conversion was sitting at 0.9% on a market that should easily run 3%+.",
    approach:
      "We rebuilt the search around a single faceted query bar, layered in agent profiles with verified-response times, and stripped the inquiry form down to three required fields tied to a property context the client already had.",
    process: [
      { title: "Audit", body: "Surveyed 70 buyer journeys, found six dead-ends." },
      { title: "Restructure", body: "Re-keyed the IA around buyer intent, not agent ego." },
      { title: "Design", body: "Pixel-perfect listing cards + a one-page inquiry flow." },
      { title: "Ship", body: "Phased rollout against a holdout group on the legacy site." },
    ],
    results: [
      { value: "3.4×", label: "Inquiry conversion" },
      { value: "−42%", label: "Bounce on listings" },
      { value: "0.9s", label: "LCP, mobile p75" },
      { value: "92", label: "Lighthouse a11y" },
    ],
    quote: {
      body: "We shipped more clarity in a fortnight than two years of internal iteration.",
      author: "Head of Product, HM Properties",
    },
  },
  {
    slug: "cold-brew",
    name: "Cold Brew",
    category: "ui-ux",
    tags: ["Visual Design", "Design Thinking", "User Research"],
    timeline: "1 week",
    palette: "from-ember/45 via-ember/15 to-iris/25",
    summary:
      "A DTC coffee subscription brand built around a single brutalist visual language and a frictionless checkout.",
    client: "Cold Brew Co.",
    industry: "Direct-to-consumer · Beverage",
    role: ["Identity", "Web Design", "Engineering"],
    year: "2025",
    services: ["Graphic Design", "UI / UX Design", "Web Development"],
    liveUrl: null,
    challenge:
      "Launch sprint with a four-week window: a brand, a marketing site, and a subscription checkout that doesn't require a customer-support team on day one.",
    approach:
      "We anchored the brand on a single weight of typography and a brutalist grid, then designed the checkout around two questions — strength, and frequency — with sensible defaults that 80% of buyers never change.",
    process: [
      { title: "Discovery", body: "Compiled the taste DNA from three founder calls." },
      { title: "Identity", body: "Locked palette, type, and tone in week one." },
      { title: "Site + checkout", body: "Astro frontend, Stripe subscriptions, no CMS yet." },
      { title: "Launch", body: "Shipped to founders' list with a soft-paid promo." },
    ],
    results: [
      { value: "412", label: "Subscribers, first 10 days" },
      { value: "1.6%", label: "Site → subscribe rate" },
      { value: "$48", label: "AOV, first month" },
      { value: "1.0s", label: "LCP, mobile" },
    ],
  },
  {
    slug: "ovara",
    name: "Ovara",
    category: "ui-ux",
    tags: ["High-Fidelity Prototypes", "UX Strategy", "Testing"],
    timeline: "3 weeks",
    palette: "from-lime/40 via-lime/5 to-iris/20",
    summary:
      "A women's-health platform with a clinical voice, calm motion, and a privacy-first content model.",
    client: "Ovara Health",
    industry: "Health · Femtech",
    role: ["Product Design", "Content Strategy"],
    year: "2025",
    services: ["UI / UX Design"],
    liveUrl: null,
    challenge:
      "Femtech content sits between health and marketing, and most platforms blur the line in ways users instinctively distrust. We needed to design clinical confidence without sanitising the voice.",
    approach:
      "A two-layer content model — editorial above the fold, clinically-reviewed sources below — paired with calm motion and an aggressively private analytics setup.",
    process: [
      { title: "Voice", body: "Drafted ten tone samples, killed eight, kept two." },
      { title: "IA", body: "Two-tier content surfaces with citation as a first-class field." },
      { title: "Prototype", body: "Mid-fi journeys tested with eight users in two rounds." },
      { title: "Handoff", body: "Tokens + Storybook in tow." },
    ],
    results: [
      { value: "4.7/5", label: "Post-test trust score" },
      { value: "−61%", label: "Bounce on health pages" },
      { value: "100%", label: "Citations linked" },
    ],
  },
  {
    slug: "abba-landscaping",
    name: "Abba Landscaping",
    category: "web",
    tags: ["Next.js", "CMS", "Performance"],
    timeline: "4 weeks",
    palette: "from-iris/30 via-lime/10 to-ember/20",
    summary:
      "A marketing site that loads in under a second, ranks for ten new keywords, and books leads while owners sleep.",
    client: "Abba Landscaping",
    industry: "Local services",
    role: ["Web Design", "Engineering", "SEO"],
    year: "2024",
    services: ["UI / UX Design", "Web Development"],
    liveUrl: null,
    challenge:
      "A local landscaping team with a Squarespace site that took 7s to load on phones and ranked for nothing past their own brand name.",
    approach:
      "Next.js, headless Sanity, and a static-image-first build. We scoped to ten content-rich service pages targeting local intent, wired structured data, and gated the inquiry behind a calendar slot.",
    process: [
      { title: "Audit", body: "Mapped twelve search queries no one was answering well." },
      { title: "Content", body: "Wrote ten service pages from the founder's voice notes." },
      { title: "Build", body: "Next.js + Sanity + Vercel; image budgets in CI." },
      { title: "Track", body: "Plausible + form-fill webhook to their CRM." },
    ],
    results: [
      { value: "10", label: "New keywords ranking" },
      { value: "0.8s", label: "LCP, mobile p75" },
      { value: "+38%", label: "Booked leads, Q1" },
    ],
  },
  {
    slug: "house-pickleball",
    name: "House Pickleball",
    category: "web",
    tags: ["E-commerce", "Headless CMS", "Next.js"],
    timeline: "2 months",
    palette: "from-ember/40 via-iris/20 to-lime/10",
    summary:
      "A premium pickleball brand — headless commerce, custom motion, and a launch campaign that sold the first run in 9 days.",
    client: "House Pickleball",
    industry: "Sports · E-commerce",
    role: ["Identity refresh", "Web Design", "Engineering", "Launch"],
    year: "2025",
    services: ["Graphic Design", "UI / UX Design", "Web Development"],
    liveUrl: "https://housepickleball.com",
    challenge:
      "First production run, no audience, and a category dominated by big-box sporting goods brands. The site had to do the entire job: brand, education, conversion.",
    approach:
      "A premium DTC identity, a single-product landing built around story and material proofs, and a Shopify Hydrogen storefront that loads instantly. Launch via paid + founder list with a tight one-week window.",
    process: [
      { title: "Brand", body: "Sharpened the identity around 'made, not mass-produced.'" },
      { title: "Site", body: "Hydrogen + custom motion + edge-rendered product pages." },
      { title: "Story", body: "Three product films, two photo sessions, one print drop." },
      { title: "Launch", body: "9-day campaign window, single CTA across every surface." },
    ],
    results: [
      { value: "100%", label: "First-run sell-through · 9 days" },
      { value: "3.7%", label: "Site conversion rate" },
      { value: "1.1s", label: "LCP, p75 mobile" },
      { value: "21k", label: "Pre-launch list, captured" },
    ],
    quote: {
      body: "We were two founders with one product. They handed us a brand that competes with category leaders on day one.",
      author: "Co-founder, House Pickleball",
    },
  },
  {
    slug: "zaka",
    name: "ZAKA",
    category: "ui-ux",
    tags: ["Dashboard UI", "Visual Identity", "Website"],
    timeline: "3 months",
    palette: "from-iris/40 via-ember/10 to-lime/20",
    summary:
      "A fintech dashboard for the operations team — keyboard-first, data-dense, and built to handle a 10× user base.",
    client: "ZAKA Financial",
    industry: "Fintech · B2B",
    role: ["Product Design", "Design System"],
    year: "2025",
    services: ["UI / UX Design"],
    liveUrl: null,
    challenge:
      "Operations was running on spreadsheets and a back-office tool from 2017. A 10× user-base year was incoming and nothing in the existing UI would scale.",
    approach:
      "We rebuilt the entire surface around keyboard-first interactions, density modes, and a table component that paginates server-side without ever feeling like it does.",
    process: [
      { title: "Shadowing", body: "Sat with three ops users for a day each." },
      { title: "System", body: "Tokens, density modes, and a table primitive." },
      { title: "Ship", body: "Module-by-module rollout against the legacy app." },
    ],
    results: [
      { value: "62%", label: "Faster task completion" },
      { value: "10×", label: "Row capacity handled" },
      { value: "AA", label: "WCAG conformance" },
    ],
  },
  {
    slug: "bioflex-aesthetics",
    name: "Bioflex Aesthetics",
    category: "brand",
    tags: ["Packaging", "Identity", "Website"],
    timeline: "2 months",
    palette: "from-lime/40 via-ember/10 to-iris/30",
    summary:
      "Cosmetics packaging and brand identity for an aesthetics clinic — premium, clinical, and quietly distinct.",
    client: "Bioflex Aesthetics",
    industry: "Beauty · Aesthetics",
    role: ["Identity", "Packaging", "Web"],
    year: "2025",
    services: ["Graphic Design", "Web Development"],
    liveUrl: null,
    challenge:
      "The category is loud, glossy, and indistinguishable. We needed to look unmistakably premium without sliding into the same gold-foil aesthetic everyone else was using.",
    approach:
      "Restrained type, a near-monochrome palette with one functional accent, and packaging structured around the product, not decoration.",
    process: [
      { title: "Brand", body: "Two directions, one chosen on day five." },
      { title: "Packaging", body: "Six SKUs, one structural system." },
      { title: "Web", body: "A small commerce front for direct + clinic partners." },
    ],
    results: [
      { value: "6 SKUs", label: "Shipped on launch" },
      { value: "+54%", label: "DTC traffic, m1" },
    ],
  },
  {
    slug: "cloudcat",
    name: "CloudCat",
    category: "brand",
    tags: ["Branding", "Brand Strategy", "Rebrand"],
    timeline: "8 months",
    palette: "from-iris/30 via-iris/10 to-ember/30",
    summary:
      "A complete brand evolution for a B2B SaaS — new voice, new identity, new motion principles, same engineering team.",
    client: "CloudCat",
    industry: "B2B SaaS",
    role: ["Strategy", "Identity", "Motion"],
    year: "2024",
    services: ["Graphic Design", "UI / UX Design"],
    liveUrl: null,
    challenge:
      "Three pivots in five years left CloudCat with a brand that read as five different companies. Sales were closing in spite of the marketing, not because of it.",
    approach:
      "A voice audit before a visual one. We rewrote the manifesto first, then designed an identity that finally agreed with what the founders actually said in customer calls.",
    process: [
      { title: "Voice", body: "Manifesto, naming, and the language map." },
      { title: "Identity", body: "Wordmark system, palette, motion principles." },
      { title: "System", body: "Guidelines + asset library + Loom walkthrough." },
    ],
    results: [
      { value: "+27%", label: "Inbound demo requests" },
      { value: "−18%", label: "Sales cycle length" },
    ],
  },
  {
    slug: "lighting-bot",
    name: "Lighting Bot",
    category: "ui-ux",
    tags: ["Interaction", "Component System", "Branding"],
    timeline: "1 week",
    palette: "from-ember/30 via-lime/10 to-iris/20",
    summary:
      "A bespoke lighting configurator with real-time previews, designed to convert specifiers in a single session.",
    client: "Lighting Bot",
    industry: "Architectural lighting",
    role: ["Product Design", "Engineering"],
    year: "2024",
    services: ["UI / UX Design", "Web Development"],
    liveUrl: null,
    challenge:
      "Specifiers were emailing PDFs back and forth for two weeks per project. The asks were repetitive; the friction was costing real orders.",
    approach:
      "A live configurator with a single canvas and a panel of options — outputs a spec sheet that's ready to send.",
    process: [
      { title: "Flow", body: "Mapped the specifier's email thread." },
      { title: "Configurator", body: "Live canvas, six parameters, PDF export." },
    ],
    results: [
      { value: "−85%", label: "Spec-cycle time" },
      { value: "+12", label: "Orders, first month" },
    ],
  },
  {
    slug: "prismolix",
    name: "Prismolix",
    category: "ui-ux",
    tags: ["Research", "Visual Design", "Responsive"],
    timeline: "2 weeks",
    palette: "from-lime/40 via-iris/15 to-ember/20",
    summary:
      "A B2B analytics product surface — chart-dense, theme-aware, and obsessive about empty states.",
    client: "Prismolix",
    industry: "B2B SaaS · Analytics",
    role: ["Product Design"],
    year: "2025",
    services: ["UI / UX Design"],
    liveUrl: null,
    challenge:
      "Analytics products live or die in the empty state. New customers were churning before they ever saw a useful chart.",
    approach:
      "Designed the first-five-minute experience as a product surface in its own right — onboarding, sample data, and visualisations primed before a single connector is wired.",
    process: [
      { title: "Audit", body: "Twelve empty states, none useful." },
      { title: "Design", body: "Two-week sprint, four surfaces shipped." },
    ],
    results: [
      { value: "+72%", label: "Activation rate" },
      { value: "−40%", label: "Week-one churn" },
    ],
  },
  {
    slug: "salt-and-light",
    name: "Salt & Light",
    category: "brand",
    tags: ["Identity", "Print", "Web"],
    timeline: "3 weeks",
    palette: "from-iris/30 via-ember/20 to-lime/20",
    summary:
      "A non-profit identity rebuild — restrained typography, hand-drawn marks, and a print system that scales to billboard.",
    client: "Salt & Light Foundation",
    industry: "Non-profit",
    role: ["Identity", "Print Design"],
    year: "2024",
    services: ["Graphic Design"],
    liveUrl: null,
    challenge:
      "A 30-year-old non-profit with a beloved-but-tired identity. The rebrand had to honour the legacy without sliding into nostalgia.",
    approach:
      "Hand-drawn symbol set tied to the founder's notes, paired with disciplined contemporary typography. The system scales from postcards to billboards without breaking voice.",
    process: [
      { title: "Listen", body: "Four founder calls, three volunteer sessions." },
      { title: "Mark", body: "Hand-drawn symbols, vectorised carefully." },
      { title: "System", body: "Print + digital guidelines doc." },
    ],
    results: [
      { value: "+34%", label: "Volunteer signups, m1" },
    ],
  },
  {
    slug: "aqua",
    name: "Aqua",
    category: "brand",
    tags: ["Identity", "Visual System", "Motion"],
    timeline: "2 weeks",
    palette: "from-lime/30 via-iris/15 to-ember/20",
    summary:
      "A wellness brand identity built around fluid type, calm motion, and a quiet, expensive palette.",
    client: "Aqua Wellness",
    industry: "Wellness",
    role: ["Identity", "Motion"],
    year: "2025",
    services: ["Graphic Design"],
    liveUrl: null,
    challenge:
      "Wellness branding has a tonal lane it's afraid to leave. The founders wanted to compete on calm — without disappearing into sameness.",
    approach:
      "A fluid display typeface, a near-monochrome palette with a single emerald accent, and motion principles built around water-dispersion physics.",
    process: [
      { title: "Type", body: "Custom display weight, designed for two contexts." },
      { title: "Motion", body: "Six principles, six Lottie tests." },
    ],
    results: [
      { value: "Day 1", label: "Trade-press feature" },
    ],
  },
  {
    slug: "archonomics",
    name: "Archonomics",
    category: "ui-ux",
    tags: ["Responsive UI", "Usability", "IA"],
    timeline: "3 weeks",
    palette: "from-ember/30 via-iris/15 to-lime/20",
    summary:
      "A research portal redesign — easier filtering, faster scanning, and an editor experience the writers actually like.",
    client: "Archonomics",
    industry: "Research · Publishing",
    role: ["Product Design", "Editor UX"],
    year: "2024",
    services: ["UI / UX Design"],
    liveUrl: null,
    challenge:
      "Researchers were authoring in Google Docs because the in-product editor was slower than copy-pasting. Engagement on the portal was halving year-over-year.",
    approach:
      "We redesigned the editor first, the reader second. Both surfaces share a token system; both load under a second.",
    process: [
      { title: "Audit", body: "Twelve editor sessions logged and reviewed." },
      { title: "Editor", body: "Slate-based, keyboard-first, instant autosave." },
    ],
    results: [
      { value: "+88%", label: "Editor session time" },
      { value: "+45%", label: "Reader sessions" },
    ],
  },
  {
    slug: "nust",
    name: "NUST",
    category: "ui-ux",
    tags: ["User Flows", "Figma", "Prototypes"],
    timeline: "1 week",
    palette: "from-iris/30 via-lime/10 to-ember/30",
    summary:
      "A university admissions flow — clearer steps, fewer abandonment points, and an applicant dashboard worth bragging about.",
    client: "NUST University",
    industry: "Education",
    role: ["Product Design"],
    year: "2024",
    services: ["UI / UX Design"],
    liveUrl: null,
    challenge:
      "Admissions abandonment was sitting at 38% — most of it on a single document-upload step. The dashboard told applicants nothing about progress.",
    approach:
      "Re-paced the application as a four-step flow with progress that means something, and a dashboard that anticipates the next question.",
    process: [
      { title: "Map", body: "Logged 40 application sessions end-to-end." },
      { title: "Redesign", body: "Four steps, three save-points, one source of truth." },
    ],
    results: [
      { value: "−24%", label: "Abandonment rate" },
      { value: "+19%", label: "Completed applications" },
    ],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function relatedProjects(slug, limit = 2) {
  const current = getProject(slug);
  if (!current) return projects.slice(0, limit);
  return projects
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit)
    .concat(
      projects
        .filter((p) => p.slug !== slug && p.category !== current.category)
        .slice(0, Math.max(0, limit - 2))
    )
    .slice(0, limit);
}

export const withCounts = categories.map((c) => ({
  ...c,
  count:
    c.key === "all"
      ? projects.length
      : projects.filter((p) => p.category === c.key).length,
}));
