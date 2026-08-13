"use client";

/* ---------------------------------------------------------------------------
   Page chrome: the scroll-linked signature element, the progress hairline, the
   header and the mobile call bar.

   Scroll rule observed throughout: never setState on a scroll callback. For
   booleans the last value is held in a ref and setState only fires when it
   flips; for the live numeric readout the DOM text is written directly through
   a ref and never touches React at all.
--------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { site } from "@/site.config";

/* ------------------------------ ScrollProgress ----------------------------- */
/* Brass hairline across the top of the viewport. */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-brass will-change-transform"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/* -------------------------------- DatumRail -------------------------------- */
/* The signature element doing its second job: a fixed vertical measuring rule
   down the left margin that reports scroll position, with a brass cursor and a
   live 0000–1000 readout. Desktop only — there is no spare margin below xl, and
   a fixed overlay on mobile would eat thumb space.

   The readout is written straight to node.textContent. Routing it through state
   would queue a React render on every scroll frame and make the whole page feel
   gritty. */

export function DatumRail() {
  const { scrollYProgress } = useScroll();
  const readoutRef = useRef<HTMLSpanElement>(null);
  const cursorTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const node = readoutRef.current;
    if (!node) return;
    node.textContent = String(Math.round(v * 1000)).padStart(4, "0");
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-6 top-0 z-40 hidden h-svh w-10 flex-col items-center justify-center xl:flex"
    >
      <span className="label mb-4 text-dim/70 [writing-mode:vertical-rl]">
        Datum
      </span>

      <div className="relative h-[42vh] w-full">
        {/* the rule */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line-deep mix-blend-normal" />

        {/* ticks — long every fifth, the way a rule reads */}
        <div className="absolute left-1/2 top-0 flex h-full -translate-x-1/2 flex-col items-center justify-between">
          {Array.from({ length: 21 }).map((_, i) => (
            <span
              key={i}
              className={`block h-px ${
                i % 5 === 0 ? "w-4 bg-brass/60" : "w-2 bg-dim/30"
              }`}
            />
          ))}
        </div>

        {/* the cursor */}
        <motion.div
          className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 will-change-transform"
          style={{ top: cursorTop }}
        >
          <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-brass" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-brass" />
        </motion.div>
      </div>

      <span
        ref={readoutRef}
        className="label mt-4 tabular-nums text-brass"
        suppressHydrationWarning
      >
        0000
      </span>
    </div>
  );
}

/* ---------------------------------- Header --------------------------------- */
/* Goes from transparent over the espresso hero to a solid oat bar once past it.
   The boolean is held in a ref and only lifted into state when it actually
   flips, so scrolling does not queue a render per frame. */

export function Header() {
  const [solid, setSolid] = useState(false);
  const lastRef = useRef(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 80;
    if (next !== lastRef.current) {
      lastRef.current = next;
      setSolid(next);
    }
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        solid
          ? "border-b border-line bg-bg/95 backdrop-blur-sm"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[86rem] items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#top"
          className={`font-display text-lg leading-none tracking-[-0.01em] transition-colors duration-500 sm:text-xl ${
            solid ? "text-ink" : "text-bone"
          }`}
        >
          CSH <span className={solid ? "text-accent" : "text-brass"}>Joinery</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Services", "#services"],
            ["How we work", "#process"],
            ["Areas", "#areas"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`label transition-colors duration-500 ${
                solid
                  ? "text-muted hover:text-accent"
                  : "text-dim hover:text-brass"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href={site.phone.href}
          className={`group flex items-center gap-2.5 border px-3.5 py-2 transition-all duration-500 sm:px-5 ${
            solid
              ? "border-accent bg-accent text-bg hover:bg-ink hover:border-ink"
              : "border-brass/50 text-bone hover:border-brass hover:bg-brass hover:text-deep"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
          <span className="label leading-none">
            <span className="hidden sm:inline">{site.phone.display}</span>
            <span className="sm:hidden">Call</span>
          </span>
        </a>
      </div>
    </header>
  );
}

/* ------------------------------- StickyCallBar ----------------------------- */
/* Thumb-reachable call bar on mobile, held back until the hero's own CTA has
   scrolled away so the two never double up, and lifted clear of the home
   indicator with the safe-area inset. */

export function StickyCallBar() {
  const [show, setShow] = useState(false);
  const lastRef = useRef(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const next = !entry.isIntersecting;
        if (next !== lastRef.current) {
          lastRef.current = next;
          setShow(next);
        }
      },
      { rootMargin: "-8px 0px 0px 0px" },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      initial={false}
      animate={{ y: show ? 0 : 120 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-stretch gap-px border-t border-line-deep bg-deep">
        <a
          href={site.phone.href}
          className="flex flex-1 items-center justify-center gap-2.5 bg-accent px-4 py-4 text-bg"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
          <span className="label leading-none">{site.phone.display}</span>
        </a>
        <a
          href="#contact"
          className="flex items-center justify-center px-6 py-4 text-bone"
        >
          <span className="label leading-none">Free quote</span>
        </a>
      </div>
    </motion.div>
  );
}
