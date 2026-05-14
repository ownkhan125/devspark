export const blogCategories = [
  "All",
  "Design",
  "Engineering",
  "Product",
  "Marketing",
  "Branding",
  "Studio",
];

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const draft = (rows) =>
  rows.map((r) => ({
    ...r,
    slug: r.slug || slugify(r.title),
  }));

export const posts = draft([
  {
    title: "Generative AI in design: revolutionising creativity, not replacing it",
    excerpt:
      "How we're actually using generative models in the studio — moodboards, illustration scaffolds, motion drafts — and where they still earn nothing.",
    date: "2026-05-12",
    category: "Design",
    readTime: "8 min",
    palette: "from-iris/40 to-ember/30",
    featured: true,
    author: {
      name: "Aria Nakamura",
      role: "Founder · Principal Designer",
    },
    body: [
      {
        type: "p",
        text: "Generative tools have stopped being a curiosity. Inside the studio they show up in moodboards, illustration scaffolds, and motion drafts — three places where iteration cost used to be the bottleneck on craft. They have not, however, replaced the part of the job that actually pays: the taste call about which direction to commit to.",
      },
      {
        type: "h2",
        text: "Where the tools earn their seat",
      },
      {
        type: "p",
        text: "Moodboards are the obvious win. We can produce twenty visually-coherent direction sketches in an afternoon, kill nineteen, and refine the last one. The work is no faster — but the conversation with the client is fundamentally different, because we walk in with eviedence.",
      },
      {
        type: "p",
        text: "Illustration scaffolds are the quiet win. Bespoke marks still get drawn by hand. But the placeholder set we used to commission a junior to draw — for layouts, for blog posts, for the parts of the site nobody ever looks at — is now generated in a brand-trained way and finished with two passes of polish.",
      },
      {
        type: "h2",
        text: "Where they earn nothing",
      },
      {
        type: "p",
        text: "The list is short and stable. Logo systems. Voice. Motion that has to carry product meaning. Anything that lives in the brand's spine for more than a launch cycle. Models are good at producing plausibility; the spine needs conviction.",
      },
      {
        type: "p",
        text: "Our working rule: if removing the AI step would force us to talk to a human about the decision, we're still using AI wrong. The tools collapse iteration cost; they don't replace the conversation that decides what to iterate on.",
      },
      {
        type: "quote",
        text: "The tools collapse iteration cost; they don't replace the conversation that decides what to iterate on.",
      },
    ],
  },
  {
    title: "Which social-media marketing services actually drive sales (not just followers)",
    excerpt:
      "A breakdown of paid channels worth running for early-stage brands, and the three vanity metrics quietly costing you a quarter.",
    date: "2026-04-29",
    category: "Marketing",
    readTime: "10 min",
    palette: "from-ember/40 to-iris/20",
    author: {
      name: "Theo Gallagher",
      role: "Project Director",
    },
    body: [
      {
        type: "p",
        text: "Most of the agencies pitching paid social are optimising for the metric that's easiest to draw on a slide — followers, engagement, reach. None of those metrics correlate with revenue at the volumes most early-stage brands operate at. Here's what we actually look at, and why.",
      },
      {
        type: "h2",
        text: "Channels worth running",
      },
      {
        type: "p",
        text: "Meta still does the work for DTC, with one caveat: the creative is now 80% of the lift. The targeting layer has compressed; the asset matters more than the spreadsheet. A single piece of editorial-quality video out-converts a campaign of generic carousels by a factor of three to five.",
      },
      {
        type: "p",
        text: "TikTok works for brands willing to learn the platform's editorial rhythm — not for brands who treat it as a billboard. We've stopped recommending it to clients who can't commit a content lead for a quarter.",
      },
      {
        type: "h2",
        text: "Vanity metrics quietly costing you",
      },
      {
        type: "p",
        text: "Three: cost per impression, follower growth rate, and engagement rate divorced from purchase intent. They're easy to celebrate; they don't compound. Our scorecard is short: cost per acquired customer, retention at 90 days, and contribution margin per channel.",
      },
    ],
  },
  {
    title: "NLP digital marketing: turning conversations into conversions",
    excerpt:
      "Where natural-language tooling helps marketing teams — and where it confidently leads everyone off a cliff.",
    date: "2026-04-18",
    category: "Marketing",
    readTime: "7 min",
    palette: "from-lime/30 to-iris/20",
    author: { name: "Idris Hale", role: "Engineering Lead" },
    body: [
      {
        type: "p",
        text: "The promise of NLP-driven marketing is that you can listen to customers at scale and act on what they're saying. The reality is messier — the noise floor on most social channels is high enough that aggregated sentiment is mostly noise, and the actionable signal lives in the long-tail of edge-case mentions.",
      },
      {
        type: "h2",
        text: "What actually works",
      },
      {
        type: "p",
        text: "Two patterns. First: routing — using NLP to triage incoming support and CX threads to the right human, with structured summaries attached. Saves real hours and trains the model on real cases. Second: theme extraction from customer interviews, where small samples of high-quality data outperform any volume of social listening.",
      },
      {
        type: "h2",
        text: "Where teams keep tripping",
      },
      {
        type: "p",
        text: "Trusting sentiment scores on tweets at face value. Sentiment models drift, sarcasm breaks them, and 'positive mentions are up 12%' rarely survives a careful audit. Use the score as a flag for human review, not a number to report.",
      },
    ],
  },
  {
    title: "How AI is reshaping UI / UX for business growth",
    excerpt:
      "Three places ML is genuinely useful inside product surfaces, and the four places founders keep getting sold a magic answer.",
    date: "2026-04-02",
    category: "Product",
    readTime: "9 min",
    palette: "from-iris/30 to-lime/20",
    author: { name: "Sana Qureshi", role: "Product Designer" },
    body: [
      {
        type: "p",
        text: "If you take out the hype, AI inside product surfaces does three useful things and a long list of things that look impressive in a demo and produce nothing measurable in production. Here's the short list we tell founders to focus on.",
      },
      {
        type: "h2",
        text: "Three places ML is genuinely useful",
      },
      {
        type: "p",
        text: "Search inside complex datasets — embeddings let you query in plain language across PDFs, tables, transcripts. Onboarding personalisation — using account-shape to pick which empty state to show. Internal CX summarisation — reducing 40-message support threads to a paragraph and three action items.",
      },
      {
        type: "h2",
        text: "Four places founders keep buying the wrong story",
      },
      {
        type: "p",
        text: "Auto-generated UI (it looks like UI, it converts like nothing). 'AI-powered' analytics dashboards (you wanted a chart, you got an essay). Sentiment-driven roadmaps (the loudest customer wins). Anything described as an 'autonomous agent' that produces deliverables you didn't carefully review.",
      },
    ],
  },
  {
    title: "Schema markup: the unsexy SEO move that still moves the needle",
    excerpt:
      "Structured data is back in the spotlight. Here's what to ship, what to skip, and how to instrument it without breaking your stack.",
    date: "2026-03-21",
    category: "Engineering",
    readTime: "6 min",
    palette: "from-ember/30 to-lime/20",
    author: { name: "Priya Mehta", role: "Frontend Engineer" },
    body: [
      {
        type: "p",
        text: "Schema markup keeps coming back because it's one of the few SEO levers that's both cheap to implement and consistently effective. Two hours of work, deployed once, paying off for years.",
      },
      {
        type: "h2",
        text: "What to ship first",
      },
      {
        type: "p",
        text: "For most sites, three schemas earn nearly all the value: Organization on the home page, BreadcrumbList sitewide, and Article or Product on individual pages. Anything past those three has rapidly diminishing returns unless you're a publisher or a marketplace.",
      },
      {
        type: "h2",
        text: "What to skip",
      },
      {
        type: "p",
        text: "Anything tagged 'experimental' in Google's rich results docs. The bar for showing rich results moves; the bar for shipping a CI failure does not. Validate every schema in CI with structured-data-testing-tool, and treat invalid markup as a blocking build error.",
      },
    ],
  },
  {
    title: "Social-media marketing that drives sales: the SMM playbook for 2026",
    excerpt:
      "An honest tour of the channels and formats earning their hosting bill this quarter — and the ones quietly draining yours.",
    date: "2026-03-12",
    category: "Marketing",
    readTime: "11 min",
    palette: "from-iris/30 to-ember/30",
    author: { name: "Theo Gallagher", role: "Project Director" },
    body: [
      {
        type: "p",
        text: "Every quarter we re-audit which paid and organic surfaces are earning their hosting bill for the brands we work with. This is the picture as of Q2 2026 — biased to direct-to-consumer brands at $1M–$15M ARR.",
      },
      {
        type: "h2",
        text: "What's working",
      },
      {
        type: "p",
        text: "Editorial-quality video that runs as both paid and organic. Founder-led commentary on LinkedIn for B2B brands. Newsletter ads in narrow-niche publications, where the audience is already pre-qualified and the rates haven't yet inflated.",
      },
      {
        type: "h2",
        text: "What's stopped working",
      },
      {
        type: "p",
        text: "Display retargeting at scale. Generic Instagram carousels. Anything that depends on third-party cookies surviving the next browser update. Build the strategy assuming they don't.",
      },
    ],
  },
  {
    title: "UI / UX secrets that quietly increase your conversion rate",
    excerpt:
      "Six structural moves we ship on most product surfaces — none of them are a redesign, and all of them compound.",
    date: "2026-03-02",
    category: "Design",
    readTime: "8 min",
    palette: "from-lime/40 to-ember/20",
    author: { name: "Sana Qureshi", role: "Product Designer" },
    body: [
      {
        type: "p",
        text: "None of what follows is a redesign. None of it requires more design time than one Tuesday morning. All of it compounds. We ship some combination of these on almost every product engagement.",
      },
      {
        type: "h2",
        text: "The list",
      },
      {
        type: "p",
        text: "One: kill the second CTA above the fold. Two: tighten the primary form to the minimum field set, and let the secondary fields fall to step two. Three: rewrite empty states as if they were marketing copy. Four: replace generic illustration with screenshots of the actual product surface. Five: add a real status indicator anywhere asynchronous work happens. Six: collapse the navigation to the three things the user actually came to do.",
      },
    ],
  },
  {
    title: "Website performance optimisation: speed, UX, and SEO compound",
    excerpt:
      "How we ship sub-1s LCPs without inventing a private framework — what to do, in order, and what's not worth the candle.",
    date: "2026-02-22",
    category: "Engineering",
    readTime: "12 min",
    palette: "from-ember/30 to-iris/30",
    author: { name: "Idris Hale", role: "Engineering Lead" },
    body: [
      {
        type: "p",
        text: "Performance work is unforgiving in two ways: shaving 200ms off LCP is a real lift, and most of the techniques people argue about online don't matter at the scales most brands operate at. Here's the order we work in, and the things we routinely skip.",
      },
      {
        type: "h2",
        text: "Order of operations",
      },
      {
        type: "p",
        text: "First: images. Always images. Right-sized, right-formatted, lazy where appropriate. Second: fonts. One weight, swap-styled, preloaded only the file that's used in the hero. Third: render-blocking JS. Fourth: the rest of the tail. Most sites need work on the first two and not the rest.",
      },
      {
        type: "h2",
        text: "What's not worth the candle",
      },
      {
        type: "p",
        text: "Switching frameworks. Adding a CDN you didn't have a reason to. Custom server rendering for static content. Pre-fetching everything. These are the moves people brag about; they rarely move LCP on a budget anyone has approved.",
      },
    ],
  },
  {
    title: "Boosting conversions with professional UI / UX design",
    excerpt:
      "A walkthrough of the conversion audit we run on every new client — and the small handful of fixes that pay for it in a week.",
    date: "2026-02-11",
    category: "Design",
    readTime: "9 min",
    palette: "from-iris/40 to-lime/30",
    author: { name: "Aria Nakamura", role: "Founder · Principal Designer" },
    body: [
      {
        type: "p",
        text: "Conversion audits are misunderstood. They aren't a rebrand. They are a focused two-week sprint that produces a punch list of structural fixes that compound — and a smaller list of design changes that earn their fee in the first quarter after shipping.",
      },
      {
        type: "h2",
        text: "What we look at",
      },
      {
        type: "p",
        text: "Page-level: time-to-first-meaningful-paint, the CTA hierarchy, the form's required-field surface area, and the social proof above and below the fold. Site-level: how the navigation reflects what users came to do, and what the empty states tell them.",
      },
    ],
  },
  {
    title: "Brand systems that survive a decade — and three rebrands",
    excerpt:
      "What we learned designing identities that age well, and how to write guidelines that future hires actually open.",
    date: "2026-01-28",
    category: "Branding",
    readTime: "7 min",
    palette: "from-lime/40 to-iris/30",
    author: { name: "Marco Vialli", role: "Brand & Identity" },
    body: [
      {
        type: "p",
        text: "Brand systems age in predictable ways. The ones that survive a decade share a small number of structural choices made early — and a deliberate set of things they refuse to over-specify.",
      },
      {
        type: "h2",
        text: "Choose few, choose well",
      },
      {
        type: "p",
        text: "Single typeface family. Two type weights, three at most. A small palette with a single semantic accent. A motion principle, not a motion library. Brands that pin down six fonts and twelve palette variations age into a costume.",
      },
      {
        type: "h2",
        text: "Write guidelines for the future hire",
      },
      {
        type: "p",
        text: "Most brand guidelines are written for the present designer. They should be written for the designer who joins three years from now and inherits the system. Show the why before the what. Keep the doc shorter than you think — the goal is people actually opening it.",
      },
    ],
  },
  {
    title: "The case for one-week sprints in a creative studio",
    excerpt:
      "Why we ship something visible every Friday — what it changes about scope, pricing, and the relationship with clients.",
    date: "2026-01-15",
    category: "Studio",
    readTime: "6 min",
    palette: "from-ember/40 to-iris/20",
    author: { name: "Theo Gallagher", role: "Project Director" },
    body: [
      {
        type: "p",
        text: "We ship something visible every Friday. The cadence isn't an aesthetic choice — it changed how we scope, how we price, and how we relate to clients. The short version: the moment a project leaves a one-week loop, momentum costs start compounding in ways nobody can audit.",
      },
      {
        type: "h2",
        text: "Why a week",
      },
      {
        type: "p",
        text: "A week is short enough that nobody loses context, and long enough that a real artefact can ship. Two-week sprints encourage scope creep; three-day sprints encourage half-baked thinking. A week is the sweet spot we keep coming back to.",
      },
    ],
  },
  {
    title: "Motion as content: when animation earns its bytes",
    excerpt:
      "Six interaction patterns where motion does real work — and three where it's quietly costing the team conversion.",
    date: "2025-12-30",
    category: "Design",
    readTime: "8 min",
    palette: "from-iris/40 to-ember/30",
    author: { name: "Sana Qureshi", role: "Product Designer" },
    body: [
      {
        type: "p",
        text: "Motion is the most aggressively over-applied design discipline in modern web work. Six patterns where it earns its bytes; three where it's quietly costing conversion.",
      },
      {
        type: "h2",
        text: "Worth the bytes",
      },
      {
        type: "p",
        text: "Page transitions that preserve context. Form-state transitions on validation. Loading skeletons that hint at what's coming. Microinteractions on the primary CTA. Reveal animations that pace dense text. Hover affordances on interactive cards.",
      },
      {
        type: "h2",
        text: "Quietly costing you",
      },
      {
        type: "p",
        text: "Decorative scroll-bound animation that doesn't serve a content goal. Auto-playing video without captions or controls. Anything that doesn't respect prefers-reduced-motion.",
      },
    ],
  },
]);

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export function relatedPosts(slug, limit = 3) {
  const current = getPost(slug);
  if (!current) return posts.slice(0, limit);
  return posts
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit)
    .concat(
      posts.filter(
        (p) => p.slug !== slug && p.category !== current.category
      )
    )
    .slice(0, limit);
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
