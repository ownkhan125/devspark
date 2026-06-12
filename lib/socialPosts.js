// Registry of social media post deliverables.
// HTML files live under `public/social-posts/<format>/<file>.html`
// and are served as static assets so they can be embedded in iframes.

export const socialFormats = [
  { key: "all", label: "All" },
  { key: "feed", label: "Instagram Feed" },
  { key: "story", label: "Instagram Story" },
];

export const accentRotation = ["ember", "iris", "lime"];

const feed = [
  {
    n: "01",
    file: "01-editorial-manifesto.html",
    title: "Editorial Manifesto",
    concept: "Layered display type with grain, glow orbs, and a frame index.",
    palette: "from-iris/40 via-ember/25 to-transparent",
    accent: "iris",
  },
  {
    n: "02",
    file: "02-3d-prism.html",
    title: "3D Prism",
    concept: "Iridescent prism object floating in a volumetric halo.",
    palette: "from-iris/50 via-ember/20 to-transparent",
    accent: "iris",
  },
  {
    n: "03",
    file: "03-stats-editorial.html",
    title: "Stats Editorial",
    concept: "Cream editorial spread with tabular stats and italic accent.",
    palette: "from-ember/35 via-bone/10 to-transparent",
    accent: "ember",
  },
  {
    n: "04",
    file: "04-three-crafts-triptych.html",
    title: "Three Crafts Triptych",
    concept: "Triple split — ember, iris, lime — for build, design, identity.",
    palette: "from-ember/30 via-iris/25 to-lime/20",
    accent: "lime",
  },
  {
    n: "05",
    file: "05-browser-mockup.html",
    title: "Browser Mockup",
    concept: "3D-tilted browser surface with iris floor glow and stats.",
    palette: "from-iris/40 via-ember/20 to-transparent",
    accent: "ember",
  },
  {
    n: "06",
    file: "06-iris-color-poster.html",
    title: "Iris Color Poster",
    concept: "Flooded iris field with floating glass card and 3D spheres.",
    palette: "from-iris/55 via-iris/25 to-transparent",
    accent: "iris",
  },
  {
    n: "07",
    file: "07-magazine-cover.html",
    title: "Magazine Cover",
    concept: "Quarterly field-notes masthead with sphere hero and barcode.",
    palette: "from-ember/40 via-bone/15 to-transparent",
    accent: "ember",
  },
  {
    n: "08",
    file: "08-pull-quote.html",
    title: "Pull Quote",
    concept: "Oversized open quote with portrait silhouette and attribution.",
    palette: "from-ember/35 via-iris/20 to-transparent",
    accent: "ember",
  },
  {
    n: "09",
    file: "09-spark-particle-burst.html",
    title: "Spark Burst",
    concept: "Ignition word inside concentric rings and particle field.",
    palette: "from-ember/45 via-iris/20 to-transparent",
    accent: "ember",
  },
  {
    n: "10",
    file: "10-process-orbit.html",
    title: "Process Orbit",
    concept: "Four-phase circular timeline orbiting a DS monogram core.",
    palette: "from-iris/45 via-ember/20 to-transparent",
    accent: "iris",
  },
];

const story = [
  {
    n: "01",
    file: "01-vertical-manifesto.html",
    title: "Vertical Manifesto",
    concept: "Stacked display rows with floating geometric form and CTA.",
    palette: "from-iris/40 via-ember/25 to-transparent",
    accent: "iris",
  },
  {
    n: "02",
    file: "02-stat-tower.html",
    title: "Stat Tower",
    concept: "Cream editorial vertical anchored by a luminous ember sphere.",
    palette: "from-ember/45 via-bone/20 to-transparent",
    accent: "ember",
  },
  {
    n: "03",
    file: "03-phone-mockup.html",
    title: "Phone Mockup",
    concept: "Tilted phone surface with layered service cards and floor glow.",
    palette: "from-iris/45 via-ember/20 to-transparent",
    accent: "iris",
  },
  {
    n: "04",
    file: "04-ember-poster.html",
    title: "Ember Poster",
    concept: "Saturated ember field with floating 3D spheres and cube.",
    palette: "from-ember/55 via-iris/15 to-transparent",
    accent: "ember",
  },
  {
    n: "05",
    file: "05-project-strip.html",
    title: "Project Strip",
    concept: "Vertical case-study strip — ember, iris, lime project tiles.",
    palette: "from-ember/30 via-iris/25 to-lime/20",
    accent: "lime",
  },
  {
    n: "06",
    file: "06-quote-editorial.html",
    title: "Quote Editorial",
    concept: "Oversized vertical pull quote with avatar attribution.",
    palette: "from-iris/45 via-ember/20 to-transparent",
    accent: "iris",
  },
  {
    n: "07",
    file: "07-vertical-process.html",
    title: "Vertical Process",
    concept: "Numbered four-phase rail aligned to a left axis.",
    palette: "from-ember/30 via-iris/30 to-lime/20",
    accent: "ember",
  },
  {
    n: "08",
    file: "08-service-spotlight.html",
    title: "Service Spotlight",
    concept: "Single design service magnified into a glass card hero.",
    palette: "from-iris/55 via-iris/20 to-transparent",
    accent: "iris",
  },
  {
    n: "09",
    file: "09-available-cta.html",
    title: "Available CTA",
    concept: "Pulsing availability badge over an ember-underlined hero.",
    palette: "from-ember/40 via-lime/15 to-transparent",
    accent: "lime",
  },
  {
    n: "10",
    file: "10-signoff-monogram.html",
    title: "Sign-off Monogram",
    concept: "Closing DS monogram, contact grid, and swatch row.",
    palette: "from-iris/45 via-ember/25 to-transparent",
    accent: "iris",
  },
];

function build(format, items, dims) {
  return items.map((p, i) => ({
    slug: `${format}-${p.n}`,
    format,
    formatLabel: format === "feed" ? "Instagram Feed" : "Instagram Story",
    index: i + 1,
    n: p.n,
    title: p.title,
    concept: p.concept,
    palette: p.palette,
    accent: p.accent,
    width: dims.width,
    height: dims.height,
    aspect: dims.width / dims.height,
    src: `/social-posts/${format}/${p.file}`,
  }));
}

export const socialPosts = [
  ...build("feed", feed, { width: 1080, height: 1080 }),
  ...build("story", story, { width: 1080, height: 1920 }),
];

export function getSocialPost(slug) {
  return socialPosts.find((p) => p.slug === slug);
}

export function adjacentSocialPosts(slug) {
  const i = socialPosts.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? socialPosts[i - 1] : null,
    next: i < socialPosts.length - 1 ? socialPosts[i + 1] : null,
  };
}

export function socialFormatCounts() {
  return socialFormats.map((f) => ({
    ...f,
    count:
      f.key === "all"
        ? socialPosts.length
        : socialPosts.filter((p) => p.format === f.key).length,
  }));
}
