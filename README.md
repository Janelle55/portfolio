# Janelle Nana Akokua Yankey · Portfolio

Personal portfolio site built with React, Vite, and globe.gl.

## Run it locally (Windows, PowerShell)

1. Install [Node.js](https://nodejs.org) (LTS) if you don't have it. Check with `node -v`.
2. Unzip this folder and open it in VS Code.
3. In the VS Code terminal:

   ```powershell
   npm install
   npm run dev
   ```

4. Open the link it prints (usually http://localhost:5173).

## Where things live

| What | File |
|---|---|
| All text, projects, events, and menu items | `src/data/content.js` |
| Colors, fonts, spacing, day and night themes | `src/styles.css` |
| The 3D globe | `src/components/JourneyGlobe.jsx` |
| Earth texture | `public/earth.jpg` |
| Your resume (website copy, no phone number) | `public/resume.pdf` |

Placeholders in `content.js` are written in [square brackets]. Replace them as your content is ready.

## Event photos

Put images in `public/events/` (for example `public/events/admi.jpg`) and set `photo: '/events/admi.jpg'` on that event in `content.js`.

## Build for production

```powershell
npm run build
```

The finished site is in `dist/`. Vercel runs this step for you when you deploy.

## Next stages

- Supabase: move `content.js` data into tables so the admin dashboard can edit it
- Admin dashboard at `/admin`, sign-in for the owner only
- Deploy to Vercel
