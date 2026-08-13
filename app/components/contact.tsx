"use client";

/* ---------------------------------------------------------------------------
   Contact. The form is UI-only for now: there is no submission endpoint, the
   page says so plainly, and submitting shows that message rather than a fake
   success state. The phone number is the live route and stays the loudest thing
   in the section.
--------------------------------------------------------------------------- */

import { useState, type FormEvent } from "react";
import { MaskLines, MeasureRule, Reveal } from "./motion-primitives";
import { serviceGroups, site } from "@/site.config";

export function Contact() {
  const [attempted, setAttempted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire to a form provider (Formspree / Resend / a route handler) and
    // only then replace this with a real success state.
    console.log(
      "Contact form submitted — no endpoint wired yet.",
      Object.fromEntries(new FormData(event.currentTarget)),
    );
    setAttempted(true);
  }

  return (
    <section id="contact" className="bg-bg py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <MeasureRule className="mb-16" tone="light" label="Get in touch" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label flex items-center gap-3 text-accent-2">
                <span className="h-px w-8 bg-accent-2/50" />
                Free, no-obligation quote
              </p>
            </Reveal>

            <MaskLines
              as="h2"
              className="mt-6 font-display text-[2.75rem] leading-[0.98] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.5rem]"
              lines={["Tell us what", "needs doing."]}
            />

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-muted">
                The quickest way to get a price is to ring. Rough sizes and how
                many is usually enough to talk sensibly on the phone.
              </p>
            </Reveal>

            {/* The phone number as the primary, unmissable route. */}
            <Reveal delay={0.18}>
              <a
                href={site.phone.href}
                className="group mt-9 block border border-line bg-surface p-6 transition-colors duration-500 hover:border-accent sm:p-8"
              >
                <span className="label text-muted">Call {site.shortName}</span>
                <span className="mt-3 block font-display text-[2.25rem] leading-none tracking-[-0.02em] text-ink transition-colors duration-500 group-hover:text-accent sm:text-[2.75rem]">
                  {site.phone.display}
                </span>
                <span className="label mt-4 flex items-center gap-2 text-accent">
                  Tap to call
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
                <div className="bg-surface p-5">
                  <dt className="label text-muted">Based in</dt>
                  <dd className="mt-2 text-[0.9375rem] text-ink">
                    {site.location.area}, {site.location.outcode}
                  </dd>
                </div>
                <div className="bg-surface p-5">
                  <dt className="label text-muted">Covering</dt>
                  <dd className="mt-2 text-[0.9375rem] text-ink">
                    {site.serviceRadiusMiles} miles around Halifax
                  </dd>
                </div>

                {/* Rendered only when the client supplies the fact. */}
                {site.email && (
                  <div className="bg-surface p-5">
                    <dt className="label text-muted">Email</dt>
                    <dd className="mt-2 text-[0.9375rem] text-ink">
                      <a href={`mailto:${site.email}`} className="hover:text-accent">
                        {site.email}
                      </a>
                    </dd>
                  </div>
                )}

                {site.hours ? (
                  <div className="bg-surface p-5">
                    <dt className="label text-muted">Hours</dt>
                    <dd className="mt-2 space-y-1 text-[0.9375rem] text-ink">
                      {site.hours.map((h) => (
                        <p key={h.day}>
                          {h.day} {h.opens}–{h.closes}
                        </p>
                      ))}
                    </dd>
                  </div>
                ) : (
                  <div className="bg-surface p-5">
                    <dt className="label text-muted">Hours</dt>
                    {/* TODO(client): supply opening hours and this becomes real. */}
                    <dd className="mt-2 text-[0.9375rem] text-muted">
                      Ring any reasonable hour — if we cannot pick up we will
                      ring you back.
                    </dd>
                  </div>
                )}
              </dl>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form
                onSubmit={handleSubmit}
                className="border border-line bg-surface p-6 sm:p-9"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name" name="name" autoComplete="name" required />
                  <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Email (optional)"
                      name="email"
                      type="email"
                      autoComplete="email"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="job"
                      className="label block text-muted"
                    >
                      What is the job?
                    </label>
                    <select
                      id="job"
                      name="job"
                      defaultValue=""
                      className="mt-2.5 w-full appearance-none border border-line bg-bg px-4 py-3.5 text-[0.9375rem] text-ink outline-none transition-colors duration-300 focus:border-accent"
                    >
                      <option value="" disabled>
                        Choose one…
                      </option>
                      {serviceGroups.map((g) => (
                        <option key={g.id} value={g.title}>
                          {g.title}
                        </option>
                      ))}
                      <option value="Something else">Something else</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="details"
                      className="label block text-muted"
                    >
                      Anything else worth knowing
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      rows={5}
                      placeholder="Rough sizes, how many, which rooms, when you are hoping to get it done…"
                      className="mt-2.5 w-full resize-y border border-line bg-bg px-4 py-3.5 text-[0.9375rem] text-ink outline-none transition-colors duration-300 placeholder:text-muted/55 focus:border-accent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group mt-7 flex w-full items-center justify-center gap-3 bg-accent px-7 py-4 text-bg transition-colors duration-500 hover:bg-ink sm:w-auto"
                >
                  <span className="label leading-none">Request a free quote</span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>

                {/* No endpoint yet, so no success state is shown — the message
                    says what actually happened and points at the phone. */}
                <p
                  role={attempted ? "alert" : undefined}
                  className={`mt-5 border-l-2 pl-4 text-sm leading-relaxed ${
                    attempted
                      ? "border-accent text-ink"
                      : "border-line text-muted"
                  }`}
                >
                  {attempted ? (
                    <>
                      This form is not connected yet, so nothing has been sent.
                      Please ring{" "}
                      <a
                        href={site.phone.href}
                        className="font-mono tabular-nums text-accent underline underline-offset-4"
                      >
                        {site.phone.display}
                      </a>{" "}
                      and we will get straight back to you.
                    </>
                  ) : (
                    <>
                      Heads up — this form is not wired to an inbox yet. Ringing{" "}
                      <a
                        href={site.phone.href}
                        className="font-mono tabular-nums text-accent underline underline-offset-4"
                      >
                        {site.phone.display}
                      </a>{" "}
                      is the way to reach us today.
                    </>
                  )}
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label block text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2.5 w-full border border-line bg-bg px-4 py-3.5 text-[0.9375rem] text-ink outline-none transition-colors duration-300 focus:border-accent"
      />
    </div>
  );
}
