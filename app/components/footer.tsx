"use client";

import { MaskLines, Reveal } from "./motion-primitives";
import { serviceGroups, site } from "@/site.config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep">
      {/* Final CTA band */}
      <div className="mx-auto max-w-[86rem] border-b border-line-deep px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <MaskLines
              as="h2"
              className="font-display text-[2.5rem] leading-[0.98] tracking-[-0.025em] text-bone sm:text-5xl lg:text-[4rem]"
              lines={["Get it measured,", "priced and done."]}
            />
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-dim">
                Free quote, no obligation, no charge to come and look. One call
                covers the whole job.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.16}>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a
                  href={site.phone.href}
                  className="group inline-flex items-center justify-center gap-3 bg-brass px-7 py-4 text-deep transition-colors duration-500 hover:bg-bone"
                >
                  <span className="label leading-none">Call</span>
                  <span className="font-mono text-base tabular-nums">
                    {site.phone.display}
                  </span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center border border-dim/35 px-7 py-4 text-bone transition-colors duration-500 hover:border-brass hover:text-brass"
                >
                  <span className="label leading-none">Request a quote</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl leading-none tracking-[-0.01em] text-bone">
              CSH <span className="text-brass">Joinery</span>
            </p>
            <p className="mt-4 max-w-[28ch] text-sm leading-relaxed text-dim">
              {site.positioning}
            </p>
          </div>

          <div>
            <p className="label text-brass">Services</p>
            <ul className="mt-4 space-y-2">
              {serviceGroups.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="text-sm text-dim transition-colors duration-500 hover:text-bone"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label text-brass">Areas covered</p>
            <ul className="mt-4 space-y-2">
              {site.serviceAreas.slice(0, 6).map((area) => (
                <li key={area} className="text-sm text-dim">
                  {area}
                </li>
              ))}
              <li className="text-sm text-dim/70">
                + {site.serviceRadiusMiles} miles around Halifax
              </li>
            </ul>
          </div>

          <div>
            <p className="label text-brass">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={site.phone.href}
                  className="font-mono text-sm tabular-nums text-bone transition-colors duration-500 hover:text-brass"
                >
                  {site.phone.display}
                </a>
              </li>
              {site.email && (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-dim transition-colors duration-500 hover:text-bone"
                  >
                    {site.email}
                  </a>
                </li>
              )}
              <li className="text-sm text-dim">
                {site.location.area}, {site.location.outcode}
              </li>
              <li>
                <a
                  href={site.nextdoorUrl}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  className="text-sm text-dim underline underline-offset-4 transition-colors duration-500 hover:text-bone"
                >
                  Find us on Nextdoor
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line-deep pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-dim/70">
            © {year} {site.name}
          </p>
          <p className="label text-dim/50">
            {site.location.town}, {site.location.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
