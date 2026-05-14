"use client";

export function IconLinkedIn(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function IconInstagram(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-7H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.88h-2.33v7A10 10 0 0 0 22 12" />
    </svg>
  );
}

export function IconX(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function IconYouTube(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23 12s0-3.6-.46-5.31a2.78 2.78 0 0 0-1.96-1.97C18.88 4.27 12 4.27 12 4.27s-6.88 0-8.58.45A2.78 2.78 0 0 0 1.46 6.69C1 8.4 1 12 1 12s0 3.6.46 5.31a2.78 2.78 0 0 0 1.96 1.97c1.7.45 8.58.45 8.58.45s6.88 0 8.58-.45a2.78 2.78 0 0 0 1.96-1.97C23 15.6 23 12 23 12M9.74 15.34v-6.7L15.47 12z" />
    </svg>
  );
}

const map = {
  linkedin: { Icon: IconLinkedIn, label: "LinkedIn" },
  instagram: { Icon: IconInstagram, label: "Instagram" },
  facebook: { Icon: IconFacebook, label: "Facebook" },
  x: { Icon: IconX, label: "X" },
  twitter: { Icon: IconX, label: "X (Twitter)" },
  youtube: { Icon: IconYouTube, label: "YouTube" },
};

export function SocialIcon({
  type,
  href,
  size = "md",
  className = "",
  ...rest
}) {
  const entry = map[type];
  if (!entry) return null;
  const { Icon, label } = entry;

  const sizes = {
    sm: { box: "h-9 w-9", icon: "h-3.5 w-3.5" },
    md: { box: "h-10 w-10", icon: "h-4 w-4" },
    lg: { box: "h-12 w-12", icon: "h-5 w-5" },
  };
  const s = sizes[size] ?? sizes.md;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-cursor="link"
      aria-label={label}
      className={`group relative inline-flex ${s.box} items-center justify-center rounded-full border border-bone/15 text-bone/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-bone/40 hover:text-bone ${className}`}
      {...rest}
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-ember/0 via-iris/0 to-lime/0 opacity-0 blur-md transition-opacity duration-500 group-hover:from-ember/30 group-hover:via-iris/25 group-hover:to-lime/20 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-bone/0 transition-colors duration-300 group-hover:bg-bone/[0.06]"
      />
      <Icon className={`relative ${s.icon} transition-transform duration-300 group-hover:scale-110`} />
    </a>
  );
}
