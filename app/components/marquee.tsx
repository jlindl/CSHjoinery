"use client";

/* ---------------------------------------------------------------------------
   Slow ticker of the real service list, sitting on the seam below the hero.
   The row is duplicated and translated -50% for a seamless loop; the animation
   is a single compositor-driven transform, not a scroll listener.
--------------------------------------------------------------------------- */

import { motion, useReducedMotion } from "motion/react";
import { marqueeItems } from "@/site.config";

export function Marquee() {
  const reduced = useReducedMotion();
  const row = [...marqueeItems];

  return (
    <div className="relative overflow-hidden border-y border-line-deep bg-deep-2 py-4">
      {/* Fade the ends into the ground so items do not pop at the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-deep-2 to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-deep-2 to-transparent sm:w-28"
      />

      <motion.div
        className="flex w-max will-change-transform"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 46, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {row.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="label flex items-center whitespace-nowrap px-6 text-dim sm:px-9"
              >
                <span className="mr-6 h-1 w-1 rotate-45 bg-brass/70 sm:mr-9" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
