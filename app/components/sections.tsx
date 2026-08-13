"use client";

/* ---------------------------------------------------------------------------
   The oat-ground and espresso-ground content sections. The page alternates
   between the two with a hard cut at every seam, and the measuring-rule divider
   marks the seams.
--------------------------------------------------------------------------- */

import { MaskLines, MeasureRule, ParallaxImage, Reveal } from "./motion-primitives";
import {
  images,
  reasons,
  serviceGroups,
  site,
  trust,
} from "@/site.config";

/* -------------------------------- Trust strip ------------------------------ */

export function TrustStrip() {
  return (
    <section className="bg-bg" aria-label="Why people call us">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="grid grid-cols-2 border-b border-line lg:grid-cols-4">
          {trust.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.08}
              className={`border-line px-1 py-8 sm:py-10 ${
                i % 2 === 0 ? "border-r" : ""
              } ${i < 2 ? "border-b lg:border-b-0" : ""} lg:border-r lg:last:border-r-0 ${
                i === 1 ? "lg:border-r" : ""
              }`}
            >
              <p className="flex items-baseline gap-1.5">
                <span className="font-display text-[2.5rem] leading-none tracking-[-0.03em] text-accent sm:text-5xl">
                  {item.value}
                </span>
                <span className="label text-muted">{item.unit}</span>
              </p>
              <p className="mt-3 max-w-[22ch] pr-4 text-sm leading-snug text-muted">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- About --------------------------------- */

export function About() {
  return (
    <section id="about" className="bg-bg py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky column: the heading and the quote hold while the copy and
              photograph scroll past. */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="label flex items-center gap-3 text-accent-2">
                  <span className="h-px w-8 bg-accent-2/50" />
                  Who you are calling
                </p>
              </Reveal>

              <MaskLines
                as="h2"
                className="mt-6 font-display text-[2.75rem] leading-[0.98] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.5rem]"
                lines={["A joiner who", "finishes the", "whole job."]}
              />

              {/* The client's own description, quoted verbatim and attributed
                  rather than paraphrased. */}
              <Reveal delay={0.15}>
                <figure className="mt-10 border-l-2 border-accent pl-6">
                  <blockquote className="font-display text-xl leading-snug text-ink sm:text-2xl">
                    “{site.ownWords}”
                  </blockquote>
                  <figcaption className="label mt-4 text-muted">
                    {site.name}, in their own words
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* PLACEHOLDER (Pexels) — replace with the client's own photo. */}
            <ParallaxImage
              src={images.about.src}
              alt={images.about.alt}
              curtain="bg-bg"
              rebate="light"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-[4/3] w-full"
            />

            <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10">
              <Reveal delay={0.1}>
                <h3 className="font-display text-2xl leading-tight tracking-[-0.015em] text-ink">
                  Windows and doors are the specialism
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                  Failed units, draughty frames, doors that have dropped and
                  never sat right since. uPVC window and door replacement is
                  what we do most of, and it is the work we are quickest and
                  cleanest at.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <h3 className="font-display text-2xl leading-tight tracking-[-0.015em] text-ink">
                  But not the only thing we do
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                  Fitted wardrobes, kitchens, staircases, partition walls,
                  skirtings, loft boarding, shop and bar fit-outs. If a room
                  needs three trades to finish it, that is usually one phone
                  call here.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.24}>
              <MeasureRule className="mt-12" tone="light" label="Halifax HX3" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Services ------------------------------- */

export function Services() {
  return (
    <section id="services" className="bg-bg pb-20 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="label flex items-center gap-3 text-accent-2">
              <span className="h-px w-8 bg-accent-2/50" />
              What we take on
            </p>
          </Reveal>
          <MaskLines
            as="h2"
            className="mt-6 font-display text-[2.75rem] leading-[0.98] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[4rem]"
            lines={["All aspects of joinery", "and building work."]}
          />
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg">
              Four kinds of work, one number to ring. Everything below is
              measured, fitted and made good by the same hands.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 sm:mt-20">
          {serviceGroups.map((group, i) => (
            <article
              key={group.id}
              id={group.id}
              className="border-t border-line py-12 first:border-t-0 first:pt-0 sm:py-16"
            >
              <div
                className={`grid gap-8 lg:grid-cols-12 lg:gap-14 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* PLACEHOLDER (Pexels) — replace with the client's own photo. */}
                <div className="lg:col-span-5">
                  <ParallaxImage
                    src={group.image}
                    alt={group.alt}
                    curtain="bg-bg"
                    rebate="light"
                    distance={6}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="aspect-[5/4] w-full"
                  />
                </div>

                <div className="lg:col-span-7">
                  <Reveal>
                    <p className="font-mono text-sm tabular-nums text-accent">
                      {group.index}
                    </p>
                  </Reveal>

                  <MaskLines
                    as="h3"
                    className="mt-3 font-display text-[2rem] leading-[1.02] tracking-[-0.02em] text-ink sm:text-[2.5rem]"
                    lines={[group.title]}
                  />

                  <Reveal delay={0.1}>
                    <p className="mt-5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                      {group.lede}
                    </p>
                  </Reveal>

                  <ul className="mt-8 border-t border-line">
                    {group.items.map((item, j) => (
                      <Reveal key={item} delay={0.06 + j * 0.04}>
                        <li className="group/row relative border-b border-line">
                          <div className="flex items-center justify-between py-3 transition-transform duration-500 md:group-hover/row:translate-x-2">
                            <span className="pr-4 text-[0.9375rem] text-ink">
                              {item}
                            </span>
                            <svg
                              viewBox="0 0 24 24"
                              className="h-3.5 w-3.5 shrink-0 -translate-x-2 text-accent opacity-0 transition-all duration-500 md:group-hover/row:translate-x-0 md:group-hover/row:opacity-100"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden
                            >
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          </div>
                          {/* hairline drawing across on hover */}
                          <span
                            aria-hidden
                            className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 md:group-hover/row:scale-x-100"
                          />
                        </li>
                      </Reveal>
                    ))}
                  </ul>

                  <Reveal delay={0.15}>
                    <a
                      href="#contact"
                      className="group/cta mt-8 inline-flex items-center gap-3 text-accent"
                    >
                      <span className="label leading-none">
                        Get a price for this
                      </span>
                      <span className="relative block h-px w-10 bg-accent/40">
                        <span className="absolute inset-y-0 left-0 block w-0 bg-accent transition-all duration-500 group-hover/cta:w-full" />
                      </span>
                    </a>
                  </Reveal>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Service areas ----------------------------- */

export function Areas() {
  return (
    <section id="areas" className="relative overflow-hidden bg-deep">
      <div className="mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="label flex items-center gap-3 text-brass">
                <span className="h-px w-8 bg-brass/50" />
                Where we work
              </p>
            </Reveal>

            <MaskLines
              as="h2"
              className="mt-6 font-display text-[2.75rem] leading-[0.98] tracking-[-0.025em] text-bone sm:text-5xl lg:text-[3.75rem]"
              lines={["Halifax, and about", "twenty miles", "around it."]}
            />

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-dim">
                Based in {site.location.area} ({site.location.outcode}). Near
                enough to come and measure without making a day of it, and near
                enough to come back if you ever need us to.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-10 flex flex-wrap gap-x-2 gap-y-2">
                {site.serviceAreas.map((area) => (
                  <li
                    key={area}
                    className="label border border-line-deep px-3 py-2 text-dim transition-colors duration-500 hover:border-brass/60 hover:text-brass"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-8 text-sm text-dim/80">
                Not on the list? If you are within about{" "}
                {site.serviceRadiusMiles} miles of Halifax, ring and ask.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            {/* PLACEHOLDER (Pexels) — replace with the client's own photo. */}
            <ParallaxImage
              src={images.area.src}
              alt={images.area.alt}
              curtain="bg-deep"
              rebate="dark"
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="aspect-[4/5] w-full lg:aspect-[3/4]"
            />
          </div>
        </div>

        <MeasureRule className="mt-16" tone="dark" label="20 mile radius" />
      </div>
    </section>
  );
}

/* ---------------------------------- Reasons -------------------------------- */

export function Reasons() {
  return (
    <section className="bg-bg py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="label flex items-center gap-3 text-accent-2">
              <span className="h-px w-8 bg-accent-2/50" />
              Why call us
            </p>
          </Reveal>
          <MaskLines
            as="h2"
            className="mt-6 font-display text-[2.75rem] leading-[0.98] tracking-[-0.025em] text-ink sm:text-5xl"
            lines={["Straightforward to", "deal with."]}
          />
        </div>

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.07}>
              <div className="group h-full bg-surface p-7 transition-colors duration-500 hover:bg-bg sm:p-9">
                <span className="font-mono text-sm tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl leading-tight tracking-[-0.015em] text-ink">
                  {reason.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {reason.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
