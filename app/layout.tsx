import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/site.config";
import { StructuredData } from "./structured-data";

/* Display: humanist/slab serif, used large only — never below ~28px, where the
   thin strokes fall apart. Body: a grotesk with some width to it. Mono: strictly
   measurements, tick labels and step numerals, tying the type back to the
   measuring-rule motif. */

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = `${site.name} | Joiner in Halifax, West Yorkshire`;
const description =
  "Halifax joiner covering all aspects of joinery and building, specialising in uPVC window and door replacement. Fitted wardrobes, kitchens, staircases and building work across Halifax and 20 miles around. Free, no-obligation quotes — call 07847 898181.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    "joiner Halifax",
    "joinery Halifax",
    "uPVC window replacement Halifax",
    "uPVC door replacement Halifax",
    "carpenter Halifax",
    "fitted wardrobes Halifax",
    "kitchen fitter Halifax",
    "staircases West Yorkshire",
    "shop fitting Halifax",
    "joiner West Yorkshire",
    "CSH Joinery Solutions",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  category: "Home & Construction",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title,
    description,
    images: [
      {
        url: "/images/hero-workshop.jpg",
        width: 1200,
        height: 630,
        alt: "A joiner's hands working a length of oak on a workbench.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-workshop.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "geo.region": "GB-CLD",
    "geo.placename": site.location.town,
    "geo.position": `${site.location.lat};${site.location.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e9" },
    { media: "(prefers-color-scheme: dark)", color: "#1a140f" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${archivo.variable} ${dmMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}
