import { serviceGroups, site } from "@/site.config";

/* ---------------------------------------------------------------------------
   JSON-LD for local SEO. Only facts that are actually supplied are emitted —
   hours and email are omitted entirely while they are null in the config,
   rather than shipping empty or invented values that would poison the listing.
--------------------------------------------------------------------------- */

export function StructuredData() {
  const business = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: site.shortName,
    description: site.positioning,
    url: site.url,
    telephone: site.phone.e164,
    ...(site.email ? { email: site.email } : {}),
    image: `${site.url}/images/hero-workshop.jpg`,
    priceRange: "££",
    currenciesAccepted: "GBP",
    address: {
      "@type": "PostalAddress",
      // Only the town and outcode — the registered address is a home address.
      addressLocality: site.location.town,
      postalCode: site.location.outcode,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.lat,
      longitude: site.location.lng,
    },
    areaServed: [
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: site.location.lat,
          longitude: site.location.lng,
        },
        geoRadius: site.serviceRadiusMiles * 1609,
      },
      ...site.serviceAreas.map((area) => ({ "@type": "City", name: area })),
    ],
    knowsAbout: serviceGroups.flatMap((g) => [...g.items]),
    sameAs: [site.nextdoorUrl],
    ...(site.yearEstablished ? { foundingDate: String(site.yearEstablished) } : {}),
    ...(site.hours
      ? {
          openingHoursSpecification: site.hours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.day,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Joinery and building services",
      itemListElement: serviceGroups.map((group) => ({
        "@type": "OfferCatalog",
        name: group.title,
        itemListElement: group.items.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item,
            areaServed: site.location.town,
            provider: { "@id": `${site.url}/#business` },
          },
        })),
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#business` },
    inLanguage: "en-GB",
  };

  // Answers the questions people actually type into search before ringing a
  // trade. Every answer is supported by the client's own listings.
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What areas does CSH Joinery Solutions cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Based in ${site.location.area}, covering Halifax and roughly ${site.serviceRadiusMiles} miles around it, including ${site.serviceAreas.slice(1, 8).join(", ")}.`,
        },
      },
      {
        "@type": "Question",
        name: "Do you charge for a quote?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Quotes are free and come with no obligation, and there is no callout charge to come and measure.",
        },
      },
      {
        "@type": "Question",
        name: "Do you only fit uPVC windows and doors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "uPVC window and door replacement is the specialism, but we cover all aspects of joinery and building — fitted wardrobes, kitchens, staircases, partition walls, skirting, loft boarding, shop fitting and general building work.",
        },
      },
    ],
  };

  return (
    <>
      {[business, website, faq].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Content is static and authored here, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
