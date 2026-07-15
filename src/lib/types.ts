/**
 * Shapes of the YAML content files. Keep in sync with src/data/*.yaml and with
 * the content-model table in CLAUDE.md.
 *
 * Nullable fields are deliberate: a field we do not know yet is `null`, never a
 * guessed value. Templates render nulls as nothing (or as a visible placeholder),
 * so an unknown date can't turn into a fake one.
 */

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  email: string | null;
  address: string | null;
  parentOrganization: string | null;
  logo: string | null;
  ogImage: string | null;
  /** The 7 main sections (old site's "Explore COBRA" order). */
  nav: NavItem[];
  /** Pages outside the main sections; rendered in the footer. */
  secondaryNav: NavItem[];
  social: {
    linkedin: string | null;
    x: string | null;
    bluesky: string | null;
    googleScholar: string | null;
    youtube: string | null;
  };
  /** GoatCounter site code; null keeps analytics off entirely. */
  goatcounter: string | null;
}

export interface NavItem {
  label: string;
  path: string;
  /** Tile text on the homepage "Explore" grid (verbatim from the old site). */
  blurb?: string | null;
  /** Tile image on the homepage "Explore" grid. */
  image?: string | null;
}

export interface About {
  intro: string | null;
  mission: string | null;
  sections: { title: string; body: string | null; items?: string[] }[];
}

export interface Person {
  name: string;
  role: string | null;
  affiliation: string | null;
  photo: string | null;
  url: string | null;
  email: string | null;
  bio: string | null;
}

export interface PeopleGroup {
  title: string;
  /** Group photo from the old site (there are no individual portraits). */
  image?: string | null;
  intro?: string | null;
  members: Person[];
}

export interface People {
  intro: string | null;
  groups: PeopleGroup[];
}

/** The center's own research-insight write-up (verbatim from the old site). */
export interface PaperInsight {
  quote: string | null;
  question: string | null;
  analysis: string | null;
  impact: string | null;
  /** e.g. "Published in The Journal of Finance (04/2026)" — verbatim. */
  publishedNote: string | null;
  /** Self-hosted one-pager PDF, if the old site offered one. */
  pdf: string | null;
}

export interface Paper {
  title: string;
  authors: string[];
  /** Journal for publications; outlet/series for working papers. */
  outlet: string | null;
  year: number | null;
  /** Abstract must be VERBATIM from the publisher/SSRN, or null. Never paraphrased. */
  abstract: string | null;
  link: string | null;
  doi: string | null;
  /** true -> featured on the homepage. */
  selected?: boolean;
  insight?: PaperInsight | null;
}

export interface NewsItem {
  /** YYYY-MM or YYYY-MM-DD. */
  date: string | null;
  title: string;
  body: string | null;
  link: string | null;
  /** Photo gallery (paths under public/). */
  images?: string[];
  /** Photographer credit, shown under the gallery. */
  credit?: string | null;
}

export interface EventItem {
  /** YYYY-MM-DD. Drives the upcoming/past split; null is treated as past. */
  date: string | null;
  endDate: string | null;
  /** Display-only date when the exact date is unknown, e.g. "July 2026". */
  dateText?: string | null;
  /** Forces the entry into "Upcoming" when its exact date is not yet known. */
  upcoming?: boolean;
  title: string;
  kind: string | null;
  location: string | null;
  /** Short status flag shown next to the title, e.g. "fully booked". */
  note?: string | null;
  description: string | null;
  image?: string | null;
  link: string | null;
  /** Self-hosted downloads (slides, materials). */
  materials?: { label: string; file: string }[];
  /** External video links (never embedded — no third-party requests). */
  recordings?: { label: string; url: string }[];
}

export interface DataToolItem {
  title: string;
  tagline: string | null;
  /** Paragraphs separated by blank lines. */
  description: string;
  access: string | null;
  link: string | null;
}

export interface DataTools {
  intro: string | null;
  note: string | null;
  items: DataToolItem[];
}

export interface PolicyContent {
  title: string;
  intro: string;
  areasIntro: string | null;
  areas: { title: string; description: string }[];
  insights: { title: string; paragraphs: string[] };
  discuss: { title: string; body: string };
}

export interface BusinessContent {
  title: string;
  intro: string;
  insights: { title: string; paragraphs: string[]; listLabel: string; items: string[] };
  collaborate: { title: string; paragraphs: string[]; listLabel: string; items: string[] };
}

export interface MediaContent {
  title: string;
  intro: string;
  inTheNews: {
    title: string;
    intro: string | null;
    items: { text: string; link: string | null; date: string | null }[];
  };
  forJournalists: { title: string; intro: string | null; listLabel: string; items: string[] };
}

export interface ResearchContent {
  title: string;
  intro: string[];
  insightsBlurb: string | null;
  support: { title: string; intro: string | null; items: { title: string; description: string }[] };
  predoc: {
    title: string;
    intro: string | null;
    programTitle: string;
    programBody: string;
    opportunitiesLabel: string;
    opportunities: string[];
    placementsIntro: string | null;
    placements: string[];
    internshipsTitle: string;
    internshipsBody: string[];
    internshipOpportunities: string[];
  };
  seminars: { title: string; paragraphs: string[] };
  publicationsBlurb: { title: string; paragraphs: string[] };
}

export interface PartnerItem {
  name: string;
  url: string | null;
  logo: string | null;
  note: string | null;
}

export interface Partners {
  intro: string | null;
  partners: PartnerItem[];
  funders: PartnerItem[];
}

export interface Legal {
  /** Everything here is bracketed placeholder until someone supplies the real details. */
  operator: string | null;
  represented_by: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  vat_id: string | null;
  supervisory_authority: string | null;
  responsible_for_content: string | null;
  data_protection_officer: string | null;
  hosting_note: string | null;
}
