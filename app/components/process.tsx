"use client";

/* ---------------------------------------------------------------------------
   The process band, on the espresso ground.

   The measuring-rule motif does its third job here: a vertical spine beside the
   steps that fills with brass as you scroll through them, so the rule is
   reporting how far through the sequence you are rather than just dividing it.

   The fill is a scaleY on a motion value — no state, no per-frame render.
--------------------------------------------------------------------------- */

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { MaskLines, ParallaxImage, Reveal } from "./motion-primitives";
import { images, process, site } from "@/site.config";

export function Process() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="process" className="bg-deep pb-20 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky column: heading and CTA hold while the steps scroll past. */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="label flex items-center gap-3 text-brass">
                  <span className="h-px w-8 bg-brass/50" />
                  How it goes
                </p>
              </Reveal>

              <MaskLines
                as="h2"
                className="mt-6 font-display text-[2.75rem] leading-[0.98] tracking-[-0.025em] text-bone sm:text-5xl lg:text-[3.5rem]"
                lines={["Five steps, and", "no surprises", "in any of them."]}
              />

              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-dim">
                  You will know the price before anything is ordered, and know
                  what is happening before it happens.
                </p>
              </Reveal>

              {/* PLACEHOLDER (Pexels) — replace with the client's own photo. */}
              <div className="mt-10 hidden lg:block">
                <ParallaxImage
                  src={images.detail.src}
                  alt={images.detail.alt}
                  curtain="bg-deep"
                  rebate="dark"
                  distance={5}
                  sizes="40vw"
                  className="aspect-[3/2] w-full"
                />
              </div>

              <Reveal delay={0.18}>
                <a
                  href={site.phone.href}
                  className="group mt-10 inline-flex items-center gap-3 border border-brass/40 px-6 py-3.5 text-bone transition-colors duration-500 hover:border-brass hover:bg-brass hover:text-deep"
                >
                  <span className="label leading-none">Start at step one</span>
                  <span className="font-mono text-sm tabular-nums">
                    {site.phone.display}
                  </span>
                </a>
              </Reveal>
            </div>
          </div>

          {/* Steps, with the filling spine. */}
          <div ref={ref} className="relative lg:col-span-7">
            {/* the spine: unlit track… */}
            <div
              aria-hidden
              className="absolute left-[0.6875rem] top-2 h-[calc(100%-1rem)] w-px bg-line-deep sm:left-[0.9375rem]"
            />
            {/* …and the brass fill riding scroll progress through the sequence */}
            <motion.div
              aria-hidden
              className="absolute left-[0.6875rem] top-2 h-[calc(100%-1rem)] w-px origin-top bg-brass will-change-transform sm:left-[0.9375rem]"
              style={reduced ? { scaleY: 1 } : { scaleY: fill }}
            />

            <ol>
              {process.map((item, i) => (
                <li key={item.step} className="relative pl-10 sm:pl-14">
                  <Reveal delay={0.05}>
                    <div className="border-b border-line-deep py-7 sm:py-9">
                      {/* the tick on the spine for this step */}
                      <span
                        aria-hidden
                        className="absolute left-0 top-9 flex h-6 w-6 items-center justify-center sm:left-1 sm:top-11"
                      >
                        <span className="h-1.5 w-1.5 rotate-45 bg-brass" />
                      </span>

                      <p className="font-mono text-sm tabular-nums text-brass">
                        {item.step}
                      </p>
                      <h3 className="mt-2 font-display text-2xl leading-tight tracking-[-0.015em] text-bone sm:text-[1.75rem]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-dim">
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                  {i === process.length - 1 && null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
