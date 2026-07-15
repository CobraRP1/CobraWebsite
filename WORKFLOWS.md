# Maintaining the COBRA website

Everything on the site comes from the YAML files in `src/data/`. Editing the site means editing
those files — you never have to touch the page code. This file is the recipe book.

**The one rule that matters:** if you don't know something, leave it `null`. Never fill in a
plausible-looking date, title, or affiliation to make a page look finished. An empty spot shows
up as a visible "Placeholder" box, which is exactly what it should look like until the real
information exists.

---

## Everyday loop

```bash
npm run dev        # live preview at http://localhost:4321/CobraWebsite/
# edit a file in src/data/ — the browser reloads as you save
npm run build      # sanity check: must finish without errors
git add -A && git commit -m "Add ..." && git push
```

Pushing to `main` deploys automatically. The site is live 1–2 minutes later at
**https://cobrarp1.github.io/CobraWebsite/**. Watch the run under the repo's **Actions** tab; a
red X there means the site did *not* update.

If `npm` isn't found, close and reopen your terminal (Node was installed system-wide).

---

## Add a paper

Open `src/data/publications.yaml` (published) or `src/data/working-papers.yaml` (working paper)
and add an entry **at the top** of `items:`:

```yaml
items:
  - title: The exact title, as published
    authors: [Ada Lovelace, Alan Turing]
    outlet: Journal of Accounting Research     # or: SSRN Working Paper
    year: 2026
    abstract: >-
      Paste the abstract here, word for word from the publisher or SSRN.
    link: https://doi.org/10.1234/example
    doi: 10.1234/example
    selected: true                             # true = also show on the homepage
```

- **The abstract must be copied verbatim.** Don't summarize it, don't rewrite it. If you don't
  have it in front of you, write `abstract: null` — that's always the right answer.
- To feature a paper in the "Research Insights" section, add an `insight:` block
  (quote / question / analysis / impact / publishedNote / pdf) — see the existing entries
  for the shape. Insight PDFs go in `public/assets/`.
- Optionally add a line to `news.yaml` announcing it.

## Add a person

`src/data/people.yaml`. Find the right group and add to its `members:` list:

```yaml
  - title: Doctoral researchers
    members:
      - name: Ada Lovelace
        role: Doctoral researcher
        affiliation: University of Mannheim
        photo: /assets/ada-lovelace.jpg   # or null → initials are shown instead
        url: https://...                  # personal page; null is fine
        email: ada@uni-mannheim.de        # or null
        bio: >-
          One or two sentences.
```

Photos go in `public/assets/`. Resize to roughly 600×600 px before committing — don't commit a
5 MB camera file. Groups with no members are hidden automatically, so you can leave the empty
ones in place.

## Add an event

`src/data/events.yaml`. Upcoming vs. past is worked out from the date **at build time** — you
never move an event by hand:

```yaml
items:
  - date: 2026-09-15        # YYYY-MM-DD
    endDate: 2026-09-16     # null for a single-day event
    title: COBRA Annual Conference
    kind: Conference
    location: Mannheim
    note: null              # short flag next to the title, e.g. "fully booked"
    description: >-
      One or two sentences.
    image: null             # optional photo in public/assets/
    link: https://...
    materials: []           # slides etc. — self-host the files in public/assets/
    recordings: []          # video links (YouTube etc.) — links only, NEVER embeds
```

- If the exact date isn't fixed yet, use `date: null`, `upcoming: true`, and
  `dateText: "July 2026"` — the event shows under Upcoming with that text. Remove the
  override once the real date exists (or once it's past).
- `materials` files must be **self-hosted** (`public/assets/`), not linked from another
  server. `recordings` stay external links — no embeds, ever (GDPR).
- The split happens when the site is *built*. An event that has just passed still shows as
  upcoming until the next push. Any push (or a manual run from the Actions tab) refreshes it.

## Add a media mention ("In the News")

`src/data/media.yaml` → `inTheNews.items`, newest on top:

```yaml
    - text: Jane Doe on tax transparency in the Financial Times
      link: https://www.ft.com/...
      date: 2026-08          # or null if unknown — never guess
```

## Add a dataset or tool

`src/data/data-tools.yaml` → `items`. Fields: `title`, optional `tagline`, `description`
(paragraphs separated by a blank line — use `|-`), `access` (who can use it, status), and
optional `link` (dashboard/repository URL when live).

## Add news

`src/data/news.yaml`, newest **on top**. Keep 4–6 items and delete old ones — a stale news list
looks worse than a short one.

```yaml
items:
  - date: 2026-07           # YYYY-MM (or YYYY-MM-DD)
    title: Short headline
    body: >-
      One or two sentences.
    link: https://...       # optional
```

## Fill in the About page

`src/data/about.yaml`: `intro` (also used as the homepage headline paragraph), `mission`, and
any number of extra `sections`. Partners and funders live in `partners.yaml`.

---

## Bigger, one-off jobs

### Add the official logo and corporate design

Everything visual is defined in **one file**, `src/styles/global.css`, in the token block at the
top. To adopt the real Uni Mannheim / MBS corporate design:

1. Put the logo in `public/assets/` (SVG preferred) and set `logo: /assets/cobra-logo.svg` in
   `site.yaml`. The header switches from the text wordmark to the image automatically.
2. Replace the color values under "Color (PLACEHOLDER)" with the official ones, and the two
   `--font-*` values if the CD prescribes typefaces.
3. If a CD font isn't on fontsource, self-host the files — **do not** add a Google Fonts link.
   Every request must stay first-party.
4. Replace `public/favicon.svg`.

No component changes are needed; nothing hardcodes a color.

### Turn on analytics (GoatCounter)

1. Sign up at goatcounter.com, get your site code.
2. Set `goatcounter: yourcode` in `site.yaml`.
3. **In the same commit**, add a GoatCounter section to `src/pages/datenschutz.astro` (there's a
   TODO comment marking the spot). GoatCounter sets no cookies and stores no personal data, but
   it still has to be disclosed.

While `goatcounter: null`, the site loads no analytics script at all.

### Move to a custom domain

1. Buy the domain; decide it with the university if the name involves theirs.
2. Add a `public/CNAME` file containing just the domain, e.g. `cobra-mannheim.de`.
3. In `.github/workflows/deploy.yml`, change the build env to:
   ```yaml
   SITE_URL: https://cobra-mannheim.de
   BASE_PATH: /
   ```
4. Update `url:` in `site.yaml`.
5. At the registrar, point DNS at GitHub Pages (four A records for the apex domain, plus a
   `www` CNAME to `cobrarp1.github.io`). GitHub's docs have the current IPs.
6. In repo **Settings → Pages**, set the custom domain and tick **Enforce HTTPS** once the
   certificate has been issued (can take up to an hour).

Because every link goes through `href()`, changing `BASE_PATH` is all the code needs.

---

## Checks before a real launch

```bash
npm run build && npm run preview     # click through every page in the built site
```

Then, from a shell in the repo, confirm the site still makes **no third-party requests**:

```bash
grep -rEo 'https?://[a-z0-9.-]+' dist --include=*.html --include=*.css --include=*.js \
  | grep -vE 'cobrarp1\.github\.io|schema\.org|www\.w3\.org' | sort -u
```

That must print nothing. Anything it prints is a request a visitor's browser would make to a
third party — which is exactly what the GDPR-conscious setup is designed to avoid.

Still open before the site should be publicised: the Impressum and Datenschutzerklärung are
**unreviewed drafts** (see `CLAUDE.md` → Open questions), and the design is a placeholder.
