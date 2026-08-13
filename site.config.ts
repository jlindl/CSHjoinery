/* ---------------------------------------------------------------------------
   Every business fact on the site lives here. Components read from this file
   and hardcode nothing, so re-skinning for another client is a config swap plus
   a tokens.css swap.

   Facts the client has not supplied are `null` with a TODO(client) note. The
   sections that need them are conditionally rendered, so they appear the moment
   real data lands. Nothing here is invented.

   Sources for the facts that ARE present:
     - nextdoor.co.uk/pages/csh-joinery-solutions-halifax-england
     - hamuch.com/535353/csh-joinery-halifax
--------------------------------------------------------------------------- */

export const site = {
  name: "CSH Joinery Solutions",
  shortName: "CSH Joinery",
  legalName: "CSH Joinery Solutions",

  // Their own words, from the Nextdoor business page. Quoted verbatim on the
  // page rather than paraphrased — the client's phrasing outperforms ours.
  ownWords:
    "We cover all aspects of joinery and building, and specialise in uPVC window and door replacement.",

  tagline: "Joinery and building across Halifax and West Yorkshire",

  // Positioning: full-service joiner, not a single-specialism fitter.
  positioning:
    "A Halifax joiner covering the whole job — windows and doors, fitted joinery, staircases, second fix and general building work.",

  phone: {
    display: "07847 898181",
    href: "tel:+447847898181",
    e164: "+447847898181",
  },

  // TODO(client): confirm a public email address. The contact section falls
  // back to phone-only until this is filled in.
  email: null as string | null,

  // TODO(client): confirm opening hours. The hours block and the JSON-LD
  // openingHoursSpecification are both omitted while this is null.
  hours: null as { day: string; opens: string; closes: string }[] | null,

  // TODO(client): confirm the year the business started trading. The "years
  // trading" trust item is omitted while this is null.
  yearEstablished: null as number | null,

  location: {
    // The registered address on Nextdoor is a home address, so only the town
    // and outcode are published.
    // TODO(client): confirm whether a full trading address should be shown.
    area: "Boothtown, Halifax",
    outcode: "HX3",
    town: "Halifax",
    region: "West Yorkshire",
    country: "GB",
    // Approximate town centroid, used only for the LocalBusiness geo hint.
    lat: 53.7267,
    lng: -1.8574,
  },

  // Real service radius, from the HaMuch listing.
  serviceRadiusMiles: 20,

  // Towns inside a ~20 mile radius of Halifax. Named explicitly rather than
  // "and surrounding areas" — specific places are what people search for.
  serviceAreas: [
    "Halifax",
    "Boothtown",
    "Sowerby Bridge",
    "Elland",
    "Brighouse",
    "Hebden Bridge",
    "Todmorden",
    "Huddersfield",
    "Bradford",
    "Queensbury",
    "Ripponden",
    "Mytholmroyd",
  ],

  nextdoorUrl:
    "https://nextdoor.co.uk/pages/csh-joinery-solutions-halifax-england/",

  // TODO(client): confirm the live domain before launch. Used for canonical
  // URLs, sitemap and Open Graph.
  url: "https://cshjoinerysolutions.co.uk",
} as const;

/* --------------------------------- trust --------------------------------- */
/* Only claims that are supported by the client's own listings. No invented
   stats, no fabricated guarantees. */

export const trust = [
  {
    value: "20",
    unit: "mile radius",
    label: "Halifax and across West Yorkshire",
  },
  {
    value: "All",
    unit: "aspects",
    label: "Joinery and building, start to finish",
  },
  {
    value: "uPVC",
    unit: "specialists",
    label: "Window and door replacement",
  },
  {
    value: "Free",
    unit: "quotes",
    label: "No obligation, no callout charge to quote",
  },
] as const;

/* -------------------------------- services -------------------------------- */
/* Grouped the way the client's own trading description groups them: the uPVC
   specialism first, then the wider joinery and building work. Individual items
   are taken from their HaMuch service list. */

export type ServiceGroup = {
  id: string;
  index: string;
  title: string;
  lede: string;
  items: readonly string[];
  image: string;
  // Honest alt text describing what the placeholder actually shows.
  alt: string;
};

export const serviceGroups: readonly ServiceGroup[] = [
  {
    id: "windows-doors",
    index: "01",
    title: "uPVC windows & doors",
    lede: "The specialism. Full replacement of tired or failed uPVC units — measured, fitted and made good, with the old frames taken away.",
    items: [
      "uPVC window replacement",
      "uPVC door replacement",
      "Door fitting & hanging",
      "Door frames",
      "Window sill replacement",
      "Conservatories",
    ],
    image: "/images/svc-windows-doors.jpg",
    alt: "A joiner running a hand plane along a timber window frame, shavings curling off the blade.",
  },
  {
    id: "fitted-joinery",
    index: "02",
    title: "Fitted joinery",
    lede: "Built into the room rather than bought off a shelf — scribed to your walls, so it sits flush in a house where nothing is square.",
    items: [
      "Fitted wardrobes",
      "Alcove storage",
      "Under-stairs storage",
      "Fitted bookcases",
      "Radiator covers",
      "Pipe boxing",
      "Kitchen fitting",
    ],
    image: "/images/svc-fitted-storage.jpg",
    alt: "The oak carcass of a fitted wardrobe installed into an alcove, shelves and hanging rails in place.",
  },
  {
    id: "structural-second-fix",
    index: "03",
    title: "Structural & second fix",
    lede: "The work that changes how a house is laid out, and the finishing joinery that makes it look like it was always that way.",
    items: [
      "Staircases",
      "Partition walls",
      "Floorboards",
      "Skirting boards",
      "Loft boarding",
      "Cat flap fitting",
    ],
    image: "/images/svc-stairs-second-fix.jpg",
    alt: "A staircase with a shaped hardwood handrail sweeping over dark metal spindles.",
  },
  {
    id: "building-commercial",
    index: "04",
    title: "Building & commercial",
    lede: "Larger building work, and shop and bar fit-outs where the deadline matters as much as the finish.",
    items: [
      "General building work",
      "Shop fitting",
      "Restaurant & bar fit-outs",
      "Blinds",
    ],
    image: "/images/svc-kitchens.jpg",
    alt: "A newly fitted kitchen with oak-fronted units, integrated appliances and a stone worktop.",
  },
] as const;

/* --------------------------------- process -------------------------------- */
/* A genuine sequence — each step only happens after the one before it. */

export const process = [
  {
    step: "01",
    title: "Call or message",
    body: "Tell us what you need doing. If it is a window or door replacement, the make, rough sizes and how many is usually enough to talk sensibly.",
  },
  {
    step: "02",
    title: "We come and measure",
    body: "We come out to you, take proper measurements and look at what is actually there. Old houses hide things — better to find them now than mid-job.",
  },
  {
    step: "03",
    title: "A written quote",
    body: "A clear price for the work, free and with no obligation. You will know what is included and what is not before anything is ordered.",
  },
  {
    step: "04",
    title: "The work",
    body: "We turn up when we said we would, work clean, and keep you posted. Dust sheets down, old units taken away, no surprise extras.",
  },
  {
    step: "05",
    title: "Walk it through",
    body: "We go round the finished job with you before we leave. Anything not right gets put right — that is the whole point of doing it properly.",
  },
] as const;

/* ------------------------------ reasons to call ---------------------------- */

export const reasons = [
  {
    title: "One trade, the whole job",
    body: "Windows, doors, fitted joinery, stairs, partitions, building work. You are not chasing three different people to finish one room.",
  },
  {
    title: "Priced to the budget",
    body: "We quote honestly and work to it. If something changes on site you hear about it before it costs you, not after.",
  },
  {
    title: "Local to Halifax",
    body: "Based in Boothtown and working within about twenty miles. Close enough to come back if you ever need us to.",
  },
  {
    title: "Free, no-obligation quotes",
    body: "No charge to come and look, and no pressure afterwards. Get the price, take your time with it.",
  },
] as const;

/* ------------------------------- testimonials ------------------------------ */
/* TODO(client): supply real customer quotes with a first name and a town, and
   they will render here. Deliberately empty — the section does not render at
   all while this is, and nothing is invented to fill it. An aggregate rating
   scraped from a directory is not a testimonial either. */

export const testimonials: readonly {
  quote: string;
  name: string;
  place: string;
}[] = [];

/* --------------------------------- gallery --------------------------------- */
/* TODO(client): supply real photographs of completed jobs. Stock photography is
   used elsewhere on the page as atmosphere, but never here — a gallery implies
   the photos show this client's own work, so it stays empty until real ones
   land. */

export const gallery: readonly { src: string; alt: string }[] = [];

/* ---------------------------------- images --------------------------------- */
/* PLACEHOLDER (Pexels, free licence) — replace each with the client's own photo.
   Files are stored in /public/images, not hotlinked, so they survive offline. */

export const images = {
  hero: {
    src: "/images/hero-workshop.jpg",
    alt: "A joiner's hands steadying a curved length of oak on a workbench under low warm light.",
  },
  about: {
    src: "/images/about-bench.jpg",
    alt: "A joiner sanding a shaped oak panel against a bench-mounted belt sander.",
  },
  detail: {
    src: "/images/detail-hand-plane.jpg",
    alt: "Close view of a wooden hand plane being pushed along the edge of a warm timber board.",
  },
  area: {
    src: "/images/exterior-brick-house.jpg",
    alt: "A West Yorkshire brick house with tall sash windows and stone chimney stacks in late afternoon light.",
  },
} as const;

/* ------------------------------ marquee ticker ----------------------------- */

export const marqueeItems = [
  "uPVC windows",
  "uPVC doors",
  "Fitted wardrobes",
  "Kitchen fitting",
  "Staircases",
  "Alcove storage",
  "Partition walls",
  "Skirting & architrave",
  "Loft boarding",
  "Shop fitting",
  "Conservatories",
  "Floorboards",
] as const;
