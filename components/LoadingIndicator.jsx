"use client"

import PropTypes from "prop-types"
import { motion } from "motion/react"

const LoadingIndicator = ({ label }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-5 text-bone"
    >
      <motion.span
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        className="relative inline-flex h-12 w-12 items-center justify-center"
      >
        <span className="absolute inset-0 rounded-full border border-bone/15" />
        <span className="absolute inset-0 rounded-full border-t border-ember" />
      </motion.span>
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
        {label}
        <span aria-hidden className="ml-1 inline-block animate-pulse">
          ·
        </span>
      </span>
    </div>
  )
}

LoadingIndicator.propTypes = {
  label: PropTypes.string,
}

LoadingIndicator.defaultProps = {
  label: "Loading",
}

export default LoadingIndicator
