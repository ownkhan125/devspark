import Link from "next/link"

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink text-bone">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-iris/30 blur-[140px] md:h-[560px] md:w-[560px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(244,239,230,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,239,230,0.04)_1px,transparent_1px)] bg-[size:60px_60px] mask-fade-y"
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-start gap-6 px-5 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
          / 404 · not found
        </p>
        <h1 className="font-display text-4xl leading-[1.05] text-bone md:text-6xl">
          We can&apos;t find that page.
        </h1>
        <p className="max-w-xl text-bone/65 md:text-lg">
          The link may have moved, or it never existed. Head back home or pick a
          surface from the navigation up top.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-[13px] font-medium text-bone transition-transform hover:scale-[1.02]"
          >
            Back to home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-bone/20 px-5 py-3 text-[13px] font-medium text-bone/80 transition-colors hover:border-bone/40 hover:text-bone"
          >
            See projects
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound
