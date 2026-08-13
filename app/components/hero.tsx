"use client";

/* ---------------------------------------------------------------------------
   Full-viewport hero on the espresso ground, with three stacked motions:
     1. the image settles from scale 1.1 to 1 over 1.6s on load
     2. it drifts down against the scroll
     3. the content lifts away faster than the image, and fades
   All reveals here are mount-driven (`immediate`), never whileInView — the hero
   is already in view on load, so a viewport trigger may never fire.
--------------------------------------------------------------------------- */

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MaskLines, Reveal } from "./motion-primitives";
import { images, site } from "@/site.config";

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Image drifts down slowly; content lifts away faster and fades out.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-deep"
    >
      {/* PLACEHOLDER (Pexels) — replace with the client's own photo. */}
      <motion.div
        className="absolute -inset-y-[16%] inset-x-0 will-change-transform"
        style={reduced ? undefined : { y: imageY }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduced ? undefined : { scale: 1.1 }}
          animate={reduced ? undefined : { scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* Scrim: vertical on mobile so the type sits on the darkest part,
          angled on desktop so the photograph keeps its right-hand third. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-deep via-deep/85 to-deep/35 md:bg-gradient-to-r md:from-deep md:via-deep/80 md:to-deep/10"
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[86rem] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 md:pb-28"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <Reveal immediate delay={0.15} y={14}>
          <p className="label flex items-center gap-3 text-brass">
            <span className="h-px w-8 bg-brass/60" />
            {site.shortName} — {site.location.area}
          </p>
        </Reveal>

        <MaskLines
          as="div"
          delay={0.3}
          immediate
          className="mt-6 max-w-[15ch] font-display text-[13vw] leading-[0.95] tracking-[-0.025em] text-bone sm:text-[8.5vw] xl:text-[7.5rem]"
          lines={["Every part of the", "job, done by one", "Halifax joiner."]}
        />

        <Reveal immediate delay={0.85} y={18}>
          <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-dim sm:text-lg">
            uPVC window and door replacement, fitted joinery, staircases and
            general building work — measured, fitted and finished properly
            across Halifax and {site.serviceRadiusMiles} miles around it.
          </p>
        </Reveal>

        {/* The phone number is visible here without scrolling at 375px. */}
        <Reveal immediate delay={1.0} y={18}>
          <div
            id="hero-cta"
            className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 bg-brass px-7 py-4 text-deep transition-colors duration-500 hover:bg-bone"
            >
              <span className="label leading-none">Get a free quote</span>
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
            </a>

            <a
              href={site.phone.href}
              className="group inline-flex items-center justify-center gap-3 border border-dim/35 px-7 py-4 text-bone transition-colors duration-500 hover:border-brass hover:text-brass"
            >
              <span className="label leading-none text-dim transition-colors duration-500 group-hover:text-brass">
                Call
              </span>
              <span className="font-mono text-base tracking-tight tabular-nums">
                {site.phone.display}
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal immediate delay={1.15} y={14}>
          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            {[
              "Free, no-obligation quotes",
              "No callout charge to quote",
              `${site.serviceRadiusMiles} mile radius`,
            ].map((item) => (
              <li key={item} className="label flex items-center gap-2 text-dim">
                <span className="h-1 w-1 rotate-45 bg-brass" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </motion.div>

      {/* Scroll hint, doubling as the first appearance of the rule motif. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-6 right-5 z-10 hidden items-center gap-3 sm:right-8 md:flex"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
        style={reduced ? undefined : { opacity: contentOpacity }}
      >
        <span className="label text-dim">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-line-deep">
          <motion.span
            className="absolute inset-x-0 top-0 block h-4 bg-brass"
            animate={reduced ? undefined : { y: ["-100%", "250%"] }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  );
}
