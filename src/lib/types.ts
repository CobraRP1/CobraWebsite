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
  nav: NavItem[];
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
}

export interface About {
  intro: string | null;
  mission: string | null;
  sections: { title: string; body: string }[];
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
  members: Person[];
}

export interface People {
  intro: string | null;
  groups: PeopleGroup[];
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
}

export interface NewsItem {
  /** YYYY-MM or YYYY-MM-DD. */
  date: string | null;
  title: string;
  body: string | null;
  link: string | null;
}

export interface EventItem {
  /** YYYY-MM-DD. Drives the upcoming/past split; null is treated as past. */
  date: string | null;
  endDate: string | null;
  title: string;
  kind: string | null;
  location: string | null;
  description: string | null;
  link: string | null;
}

export interface DataCodeItem {
  title: string;
  description: string | null;
  link: string | null;
  kind: string | null;
}

export interface DataCode {
  intro: string | null;
  items: DataCodeItem[];
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
