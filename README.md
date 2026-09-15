# abdullah.dev

Personal site for a software and cyber security engineer. Next.js App Router,
TypeScript, Tailwind, Framer Motion. Light by default, dark on request.

---

## Design decisions worth knowing before you edit

**The hero opens on an artifact, not a portrait.** A Dockerfile diff with real
before/after numbers says more to a technical reader in three seconds than a
headshot does. If you change nothing else, keep this — it is the thesis of the page.

**The code panel is the signature element, and it is used four times.** Hero,
one case study artifact per project that has one, the incident log in Experience,
and article code blocks. The ATT&CK table in Research borrows the same chrome to
carry data instead of code. It is deliberately *not* on every section: a signature
that appears everywhere is wallpaper.

**Mint is the only accent, and it only marks live things** — links, active states,
focus rings, added lines, current role. Nothing decorative is mint.

**Dark mode is re-derived, not inverted.** In `app/globals.css` the dark scheme
lightens the mint and warms the greys so contrast holds in both directions.
Check both themes after any colour change.

**No progress bars in Skills.** A percentage next to a language name has never
told anyone anything true.

---

## Getting started

```bash
cp .env.example .env.local     # fill in the values
npm install
npm run dev                    # http://localhost:3000
```

Add `public/abdullah-cv.pdf` before the résumé buttons will do anything useful.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URLs, sitemap, Open Graph |
| `NEXT_PUBLIC_GITHUB_USERNAME` | yes | Which account the GitHub section reads |
| `NEXT_PUBLIC_CALENDLY_URL` | yes | Scheduling widget |
| `GITHUB_TOKEN` | no | Raises the API limit from 60/hr to 5000/hr |

Without `GITHUB_TOKEN` the site still works: `lib/github.ts` falls back to static
data rather than failing the page.

---

## Editing content

All copy lives in `content/` as typed data. You do not need to touch a component
to add a project or a note.

| File | Holds |
| --- | --- |
| `content/site.ts` | Name, email, links, nav items, section order |
| `content/projects.ts` | Case studies. Add an object, get a page at `/projects/<slug>` |
| `content/notes.ts` | Articles as typed blocks. Reading time is computed |
| `content/experience.ts` | Timeline, reused by the home page and `/resume` |
| `content/skills.ts` | Skill groups |

Adding a project also adds it to the sitemap, the command palette, and the
projects grid automatically. Nothing else to update.

Notes use a small block format (`p`, `h`, `list`, `quote`, `code`) instead of
MDX, which keeps the build dependency-free. If you would rather write `.mdx`,
`contentlayer` or `next-mdx-remote` drops in behind the same `Note` type.

---

## Structure

```
app/
  layout.tsx            Fonts, metadata, JSON-LD, theme provider, chrome
  page.tsx              Home — composes the ten sections
  projects/[slug]/      Case study pages (SSG)
  notes/[slug]/         Article pages (SSG)
  resume/               HTML résumé, print stylesheet, PDF download
  api/contact/          Form endpoint — swap the TODO for your mail provider
  api/github/           JSON passthrough, revalidated hourly
  sitemap.ts robots.ts rss.xml/
components/
  nav, footer, section-rail, command-palette, scroll-progress, back-to-top
  theme-provider, theme-toggle
  sections/             One file per home page section
  ui/                   code-panel (signature), button, section, reveal, project-art
content/                All copy and data
lib/                    github fetching, active-section hook, cn()
```

`components.json` is configured, so `npx shadcn@latest add dialog` works and
will pick up these tokens rather than shadcn's defaults.

---

## Accessibility and performance

Built in rather than bolted on:

- Skip link, visible focus rings on the accent colour, semantic landmarks
- `aria-current` on the active nav item and rail node
- `prefers-reduced-motion` respected globally and in `Reveal`
- Every section reachable by keyboard; the palette supports arrows, Enter, Escape
- Fonts self-hosted via `next/font` — no layout shift, no third-party request
- Calendly loads only when its section approaches the viewport
- GitHub data fetched server-side and cached for an hour
- Security headers and a CSP set in `next.config.mjs`

Expect Lighthouse in the mid-to-high 90s on all four categories once the résumé
PDF and OG image are in place. The largest remaining cost is Framer Motion; if
you want the last few points, `Reveal` can be swapped for a CSS
`@starting-style` animation and the dependency dropped.

---

## Deploying to Vercel

1. Push to GitHub.
2. Import the repository at vercel.com/new. Next.js is detected; no build
   settings to change.
3. Add the four environment variables under **Settings → Environment Variables**,
   for Production, Preview and Development.
4. Deploy, then add your domain under **Settings → Domains** and point the
   registrar at Vercel's nameservers or the provided A/CNAME records.
5. Set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy, so canonical URLs
   and the sitemap are right.

CLI equivalent:

```bash
npm i -g vercel
vercel link
vercel env add NEXT_PUBLIC_SITE_URL
vercel --prod
```

Verify after the first production deploy: `/sitemap.xml`, `/robots.txt`,
`/rss.xml`, the résumé download, one project page, and the theme toggle after a
hard refresh (it should not flash).

---

## Suggested next steps

Roughly in the order I would do them.

1. **Real GitHub contributions.** The heat grid and the "1,204 contributions"
   stat in `components/sections/github.tsx` are still deterministic placeholder
   data; the actual contribution calendar needs the GraphQL API and a token.
   This is the last invented number on the site.
2. **Wire the contact form** to Resend or Postmark, and add a honeypot field plus
   rate limiting on the route.
3. **OG images per page** via `opengraph-image.tsx` and `next/og`, so a shared
   project link previews with its own title.
4. **View transitions** between the projects grid and a case study, the one
   place extra motion would genuinely help.
5. **Analytics** on résumé downloads and outbound repo clicks (Vercel Analytics
   is a single component).
6. **A test or two.** Playwright over the palette, the theme toggle, and one
   case study route would catch most regressions.
7. **MDX** if writing notes in TypeScript objects starts to chafe.
