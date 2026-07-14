# CobraWebsite — website of the Mannheim Center for Corporate Behavior and Regulation Analysis (Cobra)

Astro static site. **All content lives in `src/data/*.yaml`** — content edits are YAML edits;
never hardcode content into a page or component. Architecture mirrors `marcelolbert.com`
(see `MarcelOlbert.md` for that site's notes).

**Day-to-day recipes live in `WORKFLOWS.md`** (add a paper, a person, an event, news, the logo,
the domain). Keep it in sync when workflows change.

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

## Content model (`src/data/`)

| File | What | Convention |
|---|---|---|
| `site.yaml` | Name, tagline, description, contact, nav, social, `goatcounter` | Global settings |
| `about.yaml` | Intro, mission, free-form sections | Drives /about/ and the homepage hero |
| `people.yaml` | Members grouped by role | Empty groups are hidden automatically |
| `publications.yaml` | Published papers | New entries on top; `selected: true` → homepage |
| `working-papers.yaml` | Working papers | New entries on top |
| `news.yaml` | /news/ + homepage "Latest" | date `YYYY-MM`, keep 4–6 items, prune old |
| `events.yaml` | Conferences, workshops, seminars | Upcoming/past split automatically by date |
| `data-code.yaml` | Datasets, code, replication packages | |
| `partners.yaml` | Partner institutions and funders | Shown on /about/ |
| `legal.yaml` | Impressum / Datenschutz details | All null until someone supplies them |

## Hard rules

- **Never invent facts.** No guessed dates, names, roles, affiliations, titles, or mission
  statements. Abstracts are copied **verbatim** from the publisher/SSRN or left `null` —
  never paraphrased, never reconstructed from a title.
- An unknown value is `null`, not a plausible guess. Nulls render as nothing or as a visible
  `<Placeholder>` box; that is the design, not a gap to fill in with something convincing.
- Everything unverified carries a `TODO(Cobra)` comment in the YAML.
- **No third-party requests, ever** (GDPR; German institutional audience). Fonts are self-hosted
  via fontsource. No Google Fonts, no CDNs, no YouTube iframes — link out instead. Verify after
  changes: build, then grep `dist/` for external hosts (see WORKFLOWS.md).
- **Design tokens live only in `src/styles/global.css`.** No component hardcodes a color, font,
  or size. The current palette and fonts are NEUTRAL PLACEHOLDERS, not the official
  Uni Mannheim / MBS corporate design.
- Analytics (GoatCounter) is wired but **off** while `goatcounter: null`. Switching it on
  requires adding a GoatCounter section to `/datenschutz/` **in the same commit**.
- The Impressum and Datenschutzerklärung are **unreviewed Claude drafts, not legal advice**.
  They must not go public unreviewed — see the open questions below.

## Open questions (blocking a public launch)

1. **Corporate design** — no logo or CD manual yet. Current colors/fonts are placeholders.
2. **Institutional status** — is Cobra a unit of the University of Mannheim, of Mannheim
   Business School, or independent? This determines `parentOrganization` in `site.yaml`, the
   JSON-LD, and above all who is legally responsible in the Impressum.
3. **Legal pages** — does the university's central Impressum/Datenschutzerklärung already cover
   Cobra? If so, link to it instead of publishing our own.
4. **Domain** — undecided. Until then the site serves from the sub-path above.
5. **Content** — mission text, member list, papers, events all still empty.
