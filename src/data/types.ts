export type Region = "Europe" | "North America" | "Asia & Middle East" | "Oceania" | "Africa" | "South America";

export interface Link {
  label: string;
  url: string;
}

export interface Trail {
  slug: string;
  name: string;
  /** Local name or road number shown under the title. */
  aka: string;
  country: string;
  region: Region;
  lat: number;
  lng: number;
  lengthKm: number;
  /** Highest point in metres, where it matters. */
  summitM?: number;
  season: string;
  toll: string;
  driveTime: string;
  tags: string[];
  /** Meta description, ~150 characters. */
  summary: string;
  intro: string;
  drive: string[];
  /** Why and how it works in this marque's cars. */
  marque: string;
  watch: string[];
  links: Link[];
  imageAlt: string;
}

export interface Model {
  slug: string;
  name: string;
  years: string;
  type: string;
  engine: string;
  power: string;
  weight: string;
  summary: string;
  body: string[];
  variants: { name: string; years: string; note: string }[];
  roadTrip: string;
  watch: string[];
  imageAlt: string;
}

export interface EventItem {
  slug: string;
  name: string;
  kind: "Tarmac rally" | "Race series" | "Gathering" | "Hill climb & festival" | "Track days";
  where: string;
  when: string;
  summary: string;
  marque: string;
  url: string;
  /** Link text when `url` is not the organiser's own site. Defaults to "Official site". */
  urlLabel?: string;
  image?: string;
  imageAlt?: string;
  relatedTrail?: string;
  /** Where the event is based, for the map. Omit for series that move around. */
  lat?: number;
  lng?: number;
}

export interface Community {
  name: string;
  where: string;
  kind: "Forum" | "Club" | "Track club" | "Reference" | "Specialist";
  note: string;
  url: string;
}

export interface Track {
  slug: string;
  name: string;
  city: string;
  country: string;
  region: Region;
  lat: number;
  lng: number;
  lengthKm: number;
  url: string;
  /** What the circuit is like to drive and how the public gets on it. */
  note: string;
}

export interface TrackDayProvider {
  name: string;
  /** Countries or regions covered. */
  where: string;
  region: Region;
  url: string;
  note: string;
  /** True when days are restricted to this marque. */
  marqueOnly?: boolean;
}

export interface Garage {
  name: string;
  kind: "Official dealer" | "Independent specialist";
  city: string;
  country: string;
  region: Region;
  lat: number;
  lng: number;
  url: string;
  note: string;
}
