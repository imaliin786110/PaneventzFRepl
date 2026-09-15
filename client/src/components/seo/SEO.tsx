import { useEffect } from "react";

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: "website" | "article" | "business.business";
  ogImage?: string;
  noindex?: boolean;
  schema?: Record<string, any> | Record<string, any>[];
}

const DEFAULT_TITLE = "Pan Eventz | India's Premier Event Management & Production";
const DEFAULT_DESCRIPTION =
  "Pan Eventz is India's leading event management and production agency, specializing in corporate conferences, royal destination weddings, arena entertainment, and brand launches with 30+ years of industry leadership.";
const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972657/11_imp_cover_page_umrvw4.jpg";
const BASE_URL = "https://paneventz.com";

// Base EventPlanner / LocalBusiness Structured Data
export const PAN_EVENTZ_ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["EventPlanner", "LocalBusiness", "Organization"],
  "@id": `${BASE_URL}/#organization`,
  name: "Pan Eventz",
  alternateName: "Pan Events India",
  url: BASE_URL,
  logo: DEFAULT_IMAGE,
  image: DEFAULT_IMAGE,
  description: DEFAULT_DESCRIPTION,
  founder: {
    "@type": "Person",
    name: "Imran Mirza",
    jobTitle: "Founder & Managing Director",
    description: "Veteran event producer with over 30 years of experience in Indian entertainment, corporate events, and live concert production."
  },
  foundingDate: "2017",
  telephone: "+91-9821337523",
  email: "info@paneventz.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "101, First Floor, Skyline Building",
    addressLocality: "Kurla (W)",
    addressRegion: "Mumbai, Maharashtra",
    postalCode: "400070",
    addressCountry: "IN"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "19.0726",
    longitude: "72.8845"
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:30",
    closes: "19:30"
  },
  priceRange: "$$$$",
  currenciesAccepted: "INR, USD, AED, EUR",
  paymentAccepted: "Bank Wire Transfer, Corporate Cheque, UPI",
  areaServed: [
    { "@type": "City", name: "Mumbai" },
    { "@type": "City", name: "Delhi NCR" },
    { "@type": "City", name: "Udaipur" },
    { "@type": "City", name: "Goa" },
    { "@type": "City", name: "Bengaluru" },
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United Arab Emirates" }
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Event Management & Production Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Corporate Event Management & Summits",
          description: "Full-scale corporate summits, enterprise launches, and shareholder conferences."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Royal Destination Weddings & Celebrations",
          description: "End-to-end royal wedding planning, palatial décor, and guest concierge."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Live Entertainment & Arena Production",
          description: "Stadium-scale concerts, sound, intelligent lighting, and artist management."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Awards Galas & Brand Launches",
          description: "Red-carpet awards, press conclaves, and theatrical product reveals."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Private Experiences & Sovereign Soirées",
          description: "Ultra-confidential milestone celebrations, yacht parties, and private dinners."
        }
      }
    ]
  }
};

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  noindex = false,
  schema
}: SEOProps) {
  useEffect(() => {
    // 1. Page Title
    const fullTitle = title
      ? title.includes("Pan Eventz")
        ? title
        : `${title} | Pan Eventz`
      : DEFAULT_TITLE;
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Meta description
    setMetaTag("name", "description", description);

    // 3. Robots
    setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

    // 4. Canonical Link
    const fullCanonical = canonical
      ? canonical.startsWith("http")
        ? canonical
        : `${BASE_URL}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
      : typeof window !== "undefined"
      ? `${BASE_URL}${window.location.pathname}`
      : BASE_URL;

    let canonicalLink = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", fullCanonical);

    // 5. Open Graph Meta Tags
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", fullCanonical);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:site_name", "Pan Eventz");
    setMetaTag("property", "og:locale", "en_IN");

    // 6. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);

    // 7. Structured Data (JSON-LD)
    const scriptId = "pan-eventz-page-jsonld";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = scriptId;
      scriptElement.type = "application/ld+json";
      document.head.appendChild(scriptElement);
    }

    const payload = schema
      ? Array.isArray(schema)
        ? [PAN_EVENTZ_ORGANIZATION_SCHEMA, ...schema]
        : [PAN_EVENTZ_ORGANIZATION_SCHEMA, schema]
      : PAN_EVENTZ_ORGANIZATION_SCHEMA;

    scriptElement.textContent = JSON.stringify(payload, null, 2);

    return () => {
      // Clean up dynamic script tag on unmount if needed
    };
  }, [title, description, canonical, ogType, ogImage, noindex, schema]);

  return null;
}
