"use client"

import { useEffect } from "react"
import Link from "next/link"
import AnimatedGrid from "@/components/AnimatedGrid"

const ErrorBoundary = ({ error, reset }) => {
  useEffect(() => {
    console.error("[AppError]:", error)
  }, [error])

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink text-bone">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-ember/30 blur-[140px] md:h-[560px] md:w-[560px]"
      />
      <AnimatedGrid />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-start gap-6 px-5 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/40">
          / Error · something broke
        </p>
        <h1 className="font-display text-4xl leading-[1.05] text-bone md:text-6xl">
          That didn&apos;t go as planned.
        </h1>
        <p className="max-w-xl text-bone/65 md:text-lg">
          An unexpected error occurred while rendering this page. The team has
          been notified. You can try again or head back to safer ground.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-[13px] font-medium text-bone transition-transform hover:scale-[1.02]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-bone/20 px-5 py-3 text-[13px] font-medium text-bone/80 transition-colors hover:border-bone/40 hover:text-bone"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default ErrorBoundary
