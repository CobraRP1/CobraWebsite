# CobraWebsite — website of the Mannheim Center for Corporate Behavior and Regulation Analysis (COBRA)

Astro static site. **All content lives in `src/data/*.yaml`** — content edits are YAML edits;
never hardcode content into a page or component. Architecture mirrors `marcelolbert.com`
(see `MarcelOlbert.md`, kept local/untracked — it contains personal details).

**Day-to-day recipes live in `WORKFLOWS.md`** (add a paper, a person, an event, news, the logo,
the domain). Keep it in sync when workflows change.

## Why this site exists (context)

COBRA's original web presence is embedded in the Mannheim Business School site:
https://www.mannheim-business-school.com/de/the-mannheim-experience/faculty-research/cobra-mannheim-center-for-corporate-behavior-and-regulation-analysis/
The center wants its **own site with its own top-level navigation** instead of living
under MBS's information architecture. **All content on this site was migrated from those
old pages in July 2026** (text verbatim from the raw HTML; images, ZIPs, and insight PDFs
downloaded and self-hosted). The old site remains the content source of record until the
center starts updating this one directly.

## Stack & operations

- **Astro 5**, static output, no client-side framework.
- **Deploy**: `git push` to `main` → GitHub Actions (`.github/workflows/deploy.yml`, Node 24)
  → GitHub Pages. Repo: `CobraRP1/CobraWebsite`.
- Live at **https://cobrarp1.github.io/CobraWebsite/** — a GitHub *project* page, so the site
  serves from a **sub-path**. Every internal link and asset path MUST go through `href()` in
  `src/lib/site.ts`; a hardcoded leading `/` works in dev and 404s in production.
- Local: `npm run dev` → localhost:4321. Build check: `npm run build`, then `npm run preview`
  (sub-path bugs only show in the built output).
- Node 24 installed system-wide via winget. If `node` isn't found, restart the terminal.
- YAML is loaded with `CORE_SCHEMA` so `2026-05-20` stays a string — don't remove that.

## Navigation

Top-level nav = the old site's 7 "Explore COBRA" sections, same order:
**Data & Tools · Research · Policy · Business · Media · Events · People**.
About and News sit in `secondaryNav` (footer only); their content also feeds the homepage
("What We Do", "In the Spotlight").

## Content model (`src/data/`)

| File | What | Convention |
|---|---|---|
| `site.yaml` | Name, tagline, contact, nav (7 sections + tile blurbs/images), `secondaryNav`, social, `goatcounter` | Global settings |
| `about.yaml` | What We Do / Who We Serve / Our Impact | Drives /about/ + homepage |
| `people.yaml` | Groups: Core Team, Academic Co-Directors, Post-Docs, PhD, Pre-Docs, Affiliated, Advisory Board, Interns | Group photos, no individual portraits; empty groups hidden; Advisory Board renders as a compact list |
| `publications.yaml` | Published papers | New on top; `selected: true` → homepage; `insight` = center's verbatim write-up (not the abstract) |
| `working-papers.yaml` | Working papers | Same conventions |
| `research.yaml` | Research page sections (support, pre-doc program, seminars…) | |
| `news.yaml` | "In the Spotlight" + /news/ | date `YYYY-MM(-DD)`, `images` gallery + `credit` supported |
| `events.yaml` | Events | Upcoming/past split by date; `upcoming: true` + `dateText` for events without exact dates; `materials` (self-hosted files) + `recordings` (external links) |
| `data-tools.yaml` | EPT, Orbis, textual reporting data, CbCR repository | `access` line verbatim from old site |
| `policy.yaml` | Policy page (5 policy areas etc.) | |
| `business.yaml` | Business page | |
| `media.yaml` | "In the News" items + For Journalists | |
| `partners.yaml` | Partner institutions and funders | Shown on /about/; still empty |
| `legal.yaml` | Impressum / Datenschutz details | All null until someone supplies them |

## Hard rules

- **Never invent facts.** No guessed dates, names, roles, affiliations, titles, or mission
  statements. Abstracts are copied **verbatim** from the publisher/SSRN or left `null`.
  The `insight` blocks are the center's own write-ups, verbatim from the old site — they are
  not abstracts and must not be presented as such.
- An unknown value is `null`, not a plausible guess. Nulls render as nothing or as a visible
  `<Placeholder>` box. Everything unverified carries a `TODO(Cobra)` comment in the YAML.
- **No third-party requests** (GDPR; German institutional audience) — the sole exception is
  the disclosed GoatCounter count ping (see Analytics below). Fonts self-hosted via fontsource.
  No Google Fonts, no CDNs, **no YouTube iframes — recordings are outbound links only**. All
  old-site images/files were downloaded and self-hosted; never hotlink the MBS server. Verify
  after changes: build, then grep `dist/` for external hosts (WORKFLOWS.md).
- **Design tokens live only in `src/styles/global.css`.** Current palette/fonts are NEUTRAL
  PLACEHOLDERS, not the official Uni Mannheim / MBS corporate design.
- MBS branding (logo, AACSB/EQUIS/AMBA/LEA accreditation marks) was deliberately **not**
  migrated — those marks belong to MBS and must not appear on a non-MBS site.
- Analytics: **GoatCounter is ON** (`goatcounter: cobra-mannheim` in site.yaml, endpoint
  `cobra-mannheim.goatcounter.com`). The script is **self-hosted** at `public/count.js` — do
  not switch it back to `gc.zgo.at`. The count ping is the site's ONLY external request and is
  disclosed in `/datenschutz/`; any analytics change must keep that page in sync **in the same
  commit**. Setting `goatcounter: null` turns it off entirely (then update /datenschutz/ too).
- Impressum/Datenschutzerklärung are **unreviewed Claude drafts, not legal advice**.

## Open questions (blocking a public launch)

1. **Contact email** — the old site prints `cobra@mannheim-business.school.com`, whose domain
   has **no MX record** (cannot receive mail; looks like a typo for
   `cobra@mannheim-business-school.com`). `site.yaml` has `email: null` until the center
   confirms the real address.
2. **Corporate design** — no logo or CD manual yet; placeholder tokens in `global.css`.
3. **Image rights** — group photos and event photos were published on the center's old page
   (soft-launch photos credited "Photos by Sarah Hähnle"); confirm the center holds usage
   rights before public launch.
4. **Legal pages** — is COBRA covered by the university's/MBS's central Impressum &
   Datenschutzerklärung? "Based at Mannheim Business School" (old site) is not a statement of
   legal responsibility.
5. **Domain** — **cobra-mannheim.com is reserved** (per the center, July 2026) but not yet
   pointed at the site; cutover steps in WORKFLOWS.md. Until then the sub-path above serves.
6. **Media item dates** — the old site gives none for the four "In the News" items.
7. **Summer School dates** — "July 2026, fully booked" per old site; exact dates unknown
   (`upcoming: true` + `dateText` in events.yaml until known — likely already past, then flip).
