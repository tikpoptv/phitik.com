const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'public');
const pages = [
  '',
  'work/',
  'work/plate-finder/',
  'about/',
  'privacy/'
];
const titles = new Set();

for (const page of pages) {
  const file = path.join(root, page, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const expectedCanonical = 'https://www.phitik.com/' + page;
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const h1Count = (html.match(/<h1[ >]/g) || []).length;
  if (!title || titles.has(title)) throw new Error(`Missing or duplicate title: ${file}`);
  if (!description || description.length < 90) throw new Error(`Missing/short description: ${file}`);
  if (h1Count !== 1) throw new Error(`Expected one h1 in ${file}, got ${h1Count}`);
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) {
    throw new Error(`Wrong canonical: ${file}`);
  }
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const [linkPath, fragment] = match[1].split('#');
    const pathname = linkPath.split('?')[0];
    if (!pathname) continue;
    const target = path.join(root, pathname, pathname.endsWith('/') ? 'index.html' : '');
    if (!fs.existsSync(target)) throw new Error(`Broken internal link ${pathname} in ${file}`);
    if (fragment && !fs.readFileSync(target, 'utf8').includes(`id="${fragment}"`)) {
      throw new Error(`Broken anchor #${fragment} in ${file}`);
    }
  }
  titles.add(title);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const page of pages) {
  if (!sitemap.includes(`<loc>https://www.phitik.com/${page}</loc>`)) {
    throw new Error(`Missing sitemap URL: ${page}`);
  }
}
console.log(`Checked ${pages.length} HTML pages: titles, descriptions, headings, canonicals, local links, sitemap OK`);
