// Everything brand-specific lives here and in src/data + src/content.
// The layout, components and pages are shared with the sibling site.
export const brand = {
  name: "Porsche Trails",
  marque: "Porsche",
  url: "https://porschetrails.com",
  tagline: "The world's best driving roads for your Porsche",
  description:
    "An independent guide to the world's best driving roads for Porsche owners, from the 911 and 718 to the Taycan, with targa rallies, model guides, owner communities and road trip advice.",
  heroTitle: "Great roads for sports cars",
  heroLead:
    "An owner's guide to the passes, coast roads and rally stages that suit your Porsche, with the events, clubs and model knowledge to go with them.",
  disclaimer:
    "Porsche Trails is an independent enthusiast site. It is not affiliated with or endorsed by Dr. Ing. h.c. F. Porsche AG or any Porsche club. Porsche, 911, Carrera, Targa, Boxster, Cayman and Taycan are trademarks of their respective owners.",
  themeColor: "#17191c",
  /** Design tokens, emitted as CSS custom properties by the layout. */
  colors: {
    light: { bg: "#f4f4f2", surface: "#ffffff", ink: "#17191c", muted: "#585d64", line: "#d9dad6", brand: "#17191c", "brand-2": "#2e3238", "on-brand": "#f4f4f2", accent: "#f73b30", "on-accent": "#160002", link: "#b3001a" },
    dark: { bg: "#0e0f11", surface: "#181a1d", ink: "#ececea", muted: "#a1a5ab", line: "#2b2e33", brand: "#17191c", "brand-2": "#2e3238", "on-brand": "#f4f4f2", accent: "#f73b30", "on-accent": "#160002", link: "#ff8a80" },
  },
  email: "contact@porschetrails.com",
  locale: "en",
  nav: [
    { label: "Trails", href: "/trails/" },
    { label: "Map", href: "/map/" },
    { label: "Tracks", href: "/tracks/" },
    { label: "Models", href: "/models/" },
    { label: "Events", href: "/events/" },
    { label: "Guides", href: "/guides/" },
    { label: "Garages", href: "/garages/" },
    { label: "Communities", href: "/communities/" },
    { label: "Blog", href: "/blog/" },
  ],
} as const;
