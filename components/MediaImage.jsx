"use client";

import { useState } from "react";
import Image from "next/image";

const accentOverlay = {
  ember: "bg-ember/35",
  iris: "bg-iris/35",
  lime: "bg-lime/30",
  none: "bg-ink/30",
};

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function picsumSrc(seed, w = 1200, h = 900, opts = {}) {
  const flags = [];
  if (opts.grayscale ?? true) flags.push("grayscale");
  if (opts.blur) flags.push(`blur=${opts.blur}`);
  const qs = flags.length ? `?${flags.join("&")}` : "";
  return `https://picsum.photos/seed/${slugify(seed)}/${w}/${h}${qs}`;
}

export function pravatarSrc(seed, size = 480) {
  return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
}

export default function MediaImage({
  src,
  alt = "",
  palette = "from-iris/40 via-iris/15 to-ember/25",
  accent = "iris",
  overlay = true,
  grain = true,
  grayscale = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  className = "",
  imgClassName = "",
  fallbackLabel,
}) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* gradient backdrop — always present so the area is never blank */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-br ${palette}`}
      />

      {src && !failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={`object-cover transition-opacity duration-700 ${
            grayscale ? "[filter:grayscale(1)_contrast(1.05)]" : ""
          } ${imgClassName}`}
        />
      )}

      {overlay && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 mix-blend-multiply ${
            accentOverlay[accent] ?? accentOverlay.iris
          }`}
        />
      )}

      {grain && (
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
      )}

      {failed && fallbackLabel && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="font-display text-5xl italic text-bone/30 md:text-6xl">
            {fallbackLabel}
          </span>
        </div>
      )}
    </div>
  );
}
