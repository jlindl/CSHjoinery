"use client";

/* ---------------------------------------------------------------------------
   The four primitives every animated thing on the page is built from.

   Timing: premium motion is slower than it feels like it should be. 700–1100ms
   on the craft ease; micro-interactions stay at 500ms. Everything decelerates
   into place, nothing bounces.

   Every primitive returns the plain element under prefers-reduced-motion — not
   a shortened animation, no animation.
--------------------------------------------------------------------------- */

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------- MaskLines -------------------------------- */
/* Headline reveal. Each authored line sits in its own overflow-hidden box and
   rises out from behind it, staggered.

   Two things here are load-bearing:
   - The mask box is padded on both axes and pulled back with an equal negative
     margin. Display type at leading-[0.95] makes the clip box shorter than the
     glyphs, so without this the ascenders get sliced off the top.
   - `immediate` swaps whileInView for animate. The hero is already in view on
     load, so whileInView may never fire and the headline would sit invisible
     behind its own mask. */

/* The tags this is allowed to render as. Headings are the common case — the
   reveal wraps each line in a block-level span, which is valid inside any of
   these. */
type MaskLinesTag = "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4";

export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  immediate = false,
  as: Tag = "span",
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  immediate?: boolean;
  as?: MaskLinesTag;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${lineClassName}`}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const inner: Variants = {
    hidden: { y: "110%" },
    show: (i: number) => ({
      y: "0%",
      transition: { duration: 1.0, ease: EASE, delay: delay + i * 0.075 },
    }),
  };

  const animateProps = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.4 } };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block overflow-hidden py-[0.14em] my-[-0.14em]"
        >
          <motion.span
            className={`block ${lineClassName}`}
            custom={i}
            variants={inner}
            initial="hidden"
            {...animateProps}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* --------------------------------- Reveal ---------------------------------- */
/* The quiet supporting fade-and-rise for body copy, list rows and cards. */

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  const animateProps = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25, margin: "0px 0px -8% 0px" },
      };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...animateProps}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------ ParallaxImage ------------------------------ */
/* Wraps every photograph. A curtain lifts off the frame as it enters, and the
   image inside drifts against the scroll.

   The curtain is a sibling overlay that scales to zero on origin-bottom, not a
   clip-path on the container: transform-only, cheap to rasterise, and it cannot
   fail closed and hide the image if the viewport threshold never fires.

   The curtain colour is passed per instance — a default that is right on the
   oat ground flashes wrong on the espresso.

   The moving layer is inset by more than it travels, because a percentage y
   translate is relative to the element's own height; a full-height layer
   drifting 8% would drag its own top edge into frame. */

export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  curtain = "bg-bg",
  priority = false,
  sizes = "100vw",
  distance = 8,
  rebate = "dark",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  curtain?: string;
  priority?: boolean;
  sizes?: string;
  distance?: number;
  rebate?: "dark" | "light" | "none";
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${distance}%`, `${distance}%`],
  );

  const rebateClass =
    rebate === "dark" ? "rebate" : rebate === "light" ? "rebate-light" : "";

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${rebateClass} ${className}`}
    >
      <motion.div
        className="absolute -inset-y-[14%] inset-x-0 will-change-transform"
        style={reduced ? undefined : { y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${imgClassName}`}
        />
      </motion.div>

      {!reduced && (
        <motion.div
          aria-hidden
          className={`absolute inset-0 z-[1] origin-bottom ${curtain}`}
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      )}
    </div>
  );
}

/* -------------------------------- MeasureRule ------------------------------ */
/* The signature element, in its divider form: a tick-marked measuring rule
   drawn across the section seam on entry. Ticks are alternating heights the way
   a real rule reads, with the long tick every fifth.

   `tone` picks the ground it is sitting on. */

export function MeasureRule({
  className = "",
  tone = "light",
  count = 40,
  label,
}: {
  className?: string;
  tone?: "light" | "dark";
  count?: number;
  label?: string;
}) {
  const reduced = useReducedMotion();
  const line = tone === "dark" ? "bg-line-deep" : "bg-line";
  const tick = tone === "dark" ? "bg-dim/45" : "bg-muted/35";
  const major = tone === "dark" ? "bg-brass" : "bg-accent";
  const text = tone === "dark" ? "text-dim" : "text-muted";

  return (
    <div className={`relative w-full ${className}`} aria-hidden>
      <motion.div
        className="origin-left"
        initial={reduced ? undefined : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <div className={`h-px w-full ${line}`} />
        <div className="flex h-3 w-full items-start justify-between">
          {Array.from({ length: count }).map((_, i) => {
            const isMajor = i % 5 === 0;
            return (
              <span
                key={i}
                className={`w-px ${isMajor ? `h-3 ${major}` : `h-1.5 ${tick}`}`}
              />
            );
          })}
        </div>
      </motion.div>

      {label && (
        <motion.span
          className={`label absolute right-0 top-4 ${text}`}
          initial={reduced ? undefined : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}
