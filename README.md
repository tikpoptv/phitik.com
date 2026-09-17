# Phitik.com

Personal portfolio for Supachok Deetaweesukh. The homepage introduces the
person, experience, and selected work. The plate finder is one project in a
broader collection, not the identity of the root website.

The published website is static HTML in `public/`. `src/index.js` is
intentionally empty; the older React portfolio sources remain in the repository
for reference but are not rendered. This makes the content readable without
JavaScript and gives each page a unique URL, title, description, and canonical.

## Pages

- `/`: personal introduction and selected work
- `/work/`: curated portfolio with project context and source links
- `/work/plate-finder/`: original product case study
- `/about/`: personal history, education, experience, working perspective, contact
- `/privacy/`: privacy and third-party service disclosure

The plate comparison application itself is a separate project at
`https://ป้ายไหน.phitik.com/`. This repository does not deploy that app.

## Develop and verify

```bash
npm ci
npm run check:pages
npm run build
python3 -m http.server 8765 --directory build
```

Then open `http://localhost:8765/` and inspect the five pages on desktop and
mobile. `check:pages` verifies unique titles, descriptions, one H1 per page,
canonical URLs, internal links, and sitemap entries.

## Publishing

The root domain currently redirects to `https://www.phitik.com/` on Vercel.
The canonical URLs and sitemap use that final URL. Netlify and Docker
configurations are retained as alternate deployment options. Both now serve
real content files and should return 404 for unknown paths instead of rewriting
every URL to the homepage.

No deployment or AdSense review submission happens as part of a local build.
After publishing, verify the live HTML, all five routes, `/sitemap.xml`,
`/robots.txt`, `/ads.txt`, and AdSense privacy/consent settings before
requesting another review. Google's approval is not guaranteed by these changes.
