This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Unified backend and dashboard

Set `NEXT_PUBLIC_API_URL` to the main `kungfujew-backend` origin (for example
`http://localhost:5000`), without an API path. Stories and projects are served by
that backend under `/api/v1`; authentication uses its existing `/auth` endpoints.

Run the website on port 3000 and the dashboard on port 3001 (`npm run dev -- -p 3001`
in the dashboard). Set the website's `NEXT_PUBLIC_DASHBOARD_URL` and the dashboard's
`NEXTAUTH_URL` to the dashboard origin. Configure `NEXTAUTH_SECRET` in the dashboard.
Website dashboard/login routes redirect to the separate dashboard.

Dashboard routes: `/dashboard/stories`, `/dashboard/projects`, `/dashboard/settings`.
Use a main-backend admin account. If the legacy stories database is separate,
copy its `realshipmentstories` and `projects` collections into the main database
before switching traffic. See `kungfujew-backend/CONTENT-MIGRATION.md` in the workspace.
