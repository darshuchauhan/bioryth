Deployment notes
----------------

This project uses the Resend email API for contact form handling. When uploading the `dist` folder directly to a server, set the `RESEND_API_KEY` environment variable on the server (or place it in a non-committed `.env` file). The API code reads `process.env.RESEND_API_KEY` in [api/contact.ts](api/contact.ts#L1-L40).

Recommended steps:

1. Create a `.env` locally with `RESEND_API_KEY=your_key` and add `.env` to `.gitignore` (already added).
2. On the server, set environment variable `RESEND_API_KEY` (e.g., in systemd service, hosting panel, or Docker env).
3. Upload the `dist` folder and ensure your server process has access to the environment variables.

Vercel deployment
-----------------

If you deploy the app to Vercel (server + frontend together), add `RESEND_API_KEY` via the Vercel dashboard (Project → Settings → Environment Variables) or with the CLI (`vercel env add RESEND_API_KEY production`). When deployed on Vercel you can keep the frontend fetch as a relative path because Vercel will serve the serverless API at `/api/contact`.

Using static hosting (Hostinger `public_html`)
--------------------------------------------

If you upload only the `dist` static files to Hostinger's `public_html`, you won't have a server runtime there. To use the API running on Vercel, set the frontend's API base to your Vercel URL before building:

1. Create or update `.env` (or use build-time env) and set:

```
VITE_API_BASE=https://bioryth.vercel.app
```

2. Build the app:

```bash
npm run build
```

3. Upload the generated `dist` contents to Hostinger `public_html`. The frontend will call `https://bioryth.vercel.app/api/contact` for form submissions.

Notes
-----
- Do NOT embed `RESEND_API_KEY` into client-side code or commit it to the repo.
- For local development you can leave `VITE_API_BASE` blank (relative `/api/contact`) and run the API locally or use `vercel dev`.
