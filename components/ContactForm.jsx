"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const services = [
  "Web Development",
  "UI / UX Design",
  "Graphic Design",
  "Brand Identity",
  "Multiple Services",
  "Not sure yet",
];

const budgets = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000 – $150,000",
  "$150,000+",
  "Let's talk",
];

const timelines = [
  "ASAP",
  "1 – 3 months",
  "3 – 6 months",
  "6+ months",
  "Just exploring",
];

const initial = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
  consent: false,
};

function Field({ label, htmlFor, required, error, children, hint }) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
        <span>
          {label}
          {required && <span className="ml-1 text-ember">*</span>}
        </span>
        {hint && <span className="text-bone/35">{hint}</span>}
      </span>
      {children}
      {error && (
        <span className="font-mono text-[10px] text-ember/90">{error}</span>
      )}
    </label>
  );
}

const inputCls =
  "w-full rounded-2xl border border-bone/15 bg-ink-800/40 px-4 py-3.5 text-[15px] text-bone placeholder:text-bone/30 outline-none transition-colors focus:border-ember/60 focus:bg-ink-800/70";

export default function ContactForm({ compact = false }) {
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const update = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!data.firstName.trim()) next.firstName = "Required";
    if (!data.lastName.trim()) next.lastName = "Required";
    if (!data.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = "Enter a valid email";
    if (!data.service) next.service = "Pick one";
    if (!data.message.trim()) next.message = "Tell us a bit about the project";
    else if (data.message.trim().length < 20)
      next.message = "Add a few more details";
    if (!data.consent) next.consent = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`relative w-full ${compact ? "" : "rounded-[32px] border border-bone/10 bg-ink-800/30 p-6 backdrop-blur-sm md:p-10"}`}
    >
      <AnimatePresence>
        {status === "sent" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-[32px] bg-ink-800/95 px-6 text-center backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-lime/15 text-lime"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </motion.div>
            <h3 className="font-display text-3xl text-bone md:text-4xl">
              Message received.
            </h3>
            <p className="max-w-md text-sm text-bone/65">
              We'll come back to you within one business day with a small plan
              and a calendar invite. Until then — go finish that pour-over.
            </p>
            <button
              type="button"
              onClick={() => {
                setData(initial);
                setStatus("idle");
              }}
              className="mt-2 rounded-full border border-bone/20 px-4 py-2 text-[12px] font-medium text-bone/80 transition-colors hover:border-bone/40 hover:text-bone"
            >
              Send another
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          label="First name"
          htmlFor="firstName"
          required
          error={errors.firstName}
        >
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder="Jordan"
            className={inputCls}
          />
        </Field>
        <Field
          label="Last name"
          htmlFor="lastName"
          required
          error={errors.lastName}
        >
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder="Park"
            className={inputCls}
          />
        </Field>
        <Field
          label="Work email"
          htmlFor="email"
          required
          error={errors.email}
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@company.com"
            className={inputCls}
          />
        </Field>
        <Field
          label="Phone"
          htmlFor="phone"
          hint="optional"
          error={errors.phone}
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={inputCls}
          />
        </Field>
        <Field
          label="Company / Project"
          htmlFor="company"
          hint="optional"
          error={errors.company}
        >
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Acme Inc."
            className={inputCls}
          />
        </Field>
        <Field
          label="Service of interest"
          htmlFor="service"
          required
          error={errors.service}
        >
          <div className="relative">
            <select
              id="service"
              name="service"
              value={data.service}
              onChange={(e) => update("service", e.target.value)}
              className={`${inputCls} appearance-none pr-10`}
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-bone/40"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
        </Field>
        <Field
          label="Budget range"
          htmlFor="budget"
          hint="optional"
          error={errors.budget}
        >
          <div className="relative">
            <select
              id="budget"
              name="budget"
              value={data.budget}
              onChange={(e) => update("budget", e.target.value)}
              className={`${inputCls} appearance-none pr-10`}
            >
              <option value="">Select a range</option>
              {budgets.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-bone/40"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
        </Field>
        <Field
          label="Timeline"
          htmlFor="timeline"
          hint="optional"
          error={errors.timeline}
        >
          <div className="relative">
            <select
              id="timeline"
              name="timeline"
              value={data.timeline}
              onChange={(e) => update("timeline", e.target.value)}
              className={`${inputCls} appearance-none pr-10`}
            >
              <option value="">When you'd like to start</option>
              {timelines.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-bone/40"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
        </Field>

        <div className="md:col-span-2">
          <Field
            label="Tell us about the project"
            htmlFor="message"
            required
            error={errors.message}
          >
            <textarea
              id="message"
              name="message"
              rows={5}
              value={data.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="A few sentences on what you're building, who it's for, and what you've already tried."
              className={`${inputCls} min-h-[140px] resize-y`}
            />
          </Field>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-start gap-3 text-[13px] text-bone/65">
            <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="peer absolute inset-0 cursor-pointer appearance-none rounded-md border border-bone/25 bg-ink-800/40 transition-colors checked:border-ember/70 checked:bg-ember/20"
              />
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="pointer-events-none relative h-3 w-3 text-ember opacity-0 transition-opacity peer-checked:opacity-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span>
              I agree to be contacted about my inquiry and have read the{" "}
              <a
                href="/privacy-policy"
                className="underline decoration-bone/30 underline-offset-2 hover:text-bone"
              >
                privacy policy
              </a>
              .
              {errors.consent && (
                <span className="ml-2 font-mono text-[10px] text-ember/90">
                  Required
                </span>
              )}
            </span>
          </label>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
          We reply within one business day.
        </p>
        <button
          type="submit"
          data-cursor="cta"
          disabled={status === "sending"}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ember px-6 py-3.5 text-sm font-medium text-bone transition-transform hover:scale-[1.02] disabled:opacity-70"
        >
          <span className="relative z-10">
            {status === "sending" ? "Sending…" : "Send message"}
          </span>
          {status !== "sending" && (
            <svg
              viewBox="0 0 24 24"
              className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M13 5l7 7-7 7" />
            </svg>
          )}
          <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-bone/30 opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
        </button>
      </div>
    </form>
  );
}
