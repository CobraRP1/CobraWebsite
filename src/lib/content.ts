/**
 * Content loader.
 *
 * ALL site content lives in src/data/*.yaml — never hardcode content into a
 * page or component. Files are read through Vite's glob import so that editing
 * a YAML file hot-reloads the dev server.
 */
import yaml from 'js-yaml';
import type {
  About,
  BusinessContent,
  DataTools,
  EventItem,
  MediaContent,
  NewsItem,
  Partners,
  Paper,
  People,
  PolicyContent,
  ResearchContent,
  SiteConfig,
  Legal,
} from './types';

const files = import.meta.glob('../data/*.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function load<T>(name: string): T {
  const key = `../data/${name}.yaml`;
  const raw = files[key];
  if (raw === undefined) {
    throw new Error(
      `Missing content file src/data/${name}.yaml (found: ${Object.keys(files).join(', ')})`,
    );
  }
  // CORE_SCHEMA keeps dates as plain "YYYY-MM-DD" strings; the default schema
  // would turn them into JS Date objects and break formatDate/splitEvents.
  return yaml.load(raw, { schema: yaml.CORE_SCHEMA }) as T;
}

export const site = load<SiteConfig>('site');
export const about = load<About>('about');
export const people = load<People>('people');
export const publications = load<{ items: Paper[] }>('publications').items ?? [];
export const workingPapers = load<{ items: Paper[] }>('working-papers').items ?? [];
export const news = load<{ items: NewsItem[] }>('news').items ?? [];
export const events = load<{ items: EventItem[] }>('events').items ?? [];
export const dataTools = load<DataTools>('data-tools');
export const policy = load<PolicyContent>('policy');
export const business = load<BusinessContent>('business');
export const media = load<MediaContent>('media');
export const research = load<ResearchContent>('research');
export const partners = load<Partners>('partners');
export const legal = load<Legal>('legal');

/**
 * Split events into upcoming vs past against the build date.
 * Events without a parseable `date` are treated as past so a malformed entry
 * can never masquerade as an upcoming event — unless the entry explicitly sets
 * `upcoming: true` (for events whose exact date is not yet known; pair it with
 * `dateText` so visitors see e.g. "July 2026").
 */
export function splitEvents(items: EventItem[], now: Date = new Date()) {
  const upcoming: EventItem[] = [];
  const past: EventItem[] = [];

  for (const item of items) {
    const end = item.endDate ?? item.date;
    const when = end ? new Date(end) : null;
    const isUpcoming =
      item.upcoming === true ||
      (when !== null && !Number.isNaN(when.getTime()) && when >= startOfDay(now));
    (isUpcoming ? upcoming : past).push(item);
  }

  upcoming.sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));
  past.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

  return { upcoming, past };
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** "2026-07" -> "July 2026"; "2026-07-14" -> "14 July 2026". Returns "" for null. */
export function formatDate(value: string | null | undefined): string {
  if (!value) return '';
  const parts = value.split('-');
  const [y, m, d] = parts;
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const monthIndex = Number(m) - 1;
  const month = monthNames[monthIndex] ?? '';
  if (!month) return value;
  if (d) return `${Number(d)} ${month} ${y}`;
  return `${month} ${y}`;
}

/** Papers already carry newest-first order in YAML; `selected` drives the homepage. */
export const selectedPapers = [...publications, ...workingPapers].filter((p) => p.selected);
