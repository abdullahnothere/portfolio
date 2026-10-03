# portfolio

My personal site: [abdullahhas.vercel.app](https://abdullahhas.vercel.app)

I'm a software engineer moving into security. I spent two and a half years building backend services at GoSaaS Labs and have just finished an MSc in Cyber Security Engineering at Warwick. The site holds my project write ups, my dissertation results and a few notes on things I've learned along the way.

## Stack

Next.js (App Router), TypeScript and Tailwind CSS, deployed on Vercel.

## Running it locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Environment variables

| Variable | What it's for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata and the sitemap |
| `NEXT_PUBLIC_GITHUB_USERNAME` | GitHub account shown on the site |
| `NEXT_PUBLIC_CALENDLY_URL` | Booking link for the meeting section |
| `GITHUB_TOKEN` | Optional, raises the GitHub API rate limit |
| `RESEND_API_KEY` | Sends contact form messages. Without it the form opens an email draft instead |
| `CONTACT_TO_EMAIL` | Where contact form messages are delivered |

## Where things live

- `content/` has all the text: projects, notes, experience, skills and site details
- `app/` has the pages, plus the contact and GitHub API routes
- `components/` has the page sections and shared UI
- `public/` has the two résumé PDFs

Adding a project or a note is a new entry in `content/projects.ts` or `content/notes.ts`.
