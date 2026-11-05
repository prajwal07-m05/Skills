# For Frooti ♡ — Birthday Scrapbook

A cute, dreamy, mobile-first birthday website built with React + Vite.

## Run locally

Requirements: Node.js 18+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Personalise it

- **Name:** Search for `Frooti` in `src/App.jsx` and replace it if needed.
- **Letter:** Edit the text inside the `letter-paper` section in `src/App.jsx`.
- **Reasons:** Edit the `reasons` array near the top of `src/App.jsx`.
- **Memory cards:** Edit the `memories` array near the top of `src/App.jsx`.
- **Photos:** Open the site and tap **Add our photos**. Selected photos are shown locally in that browser session; they are not uploaded to a server. For permanent photos, put image files in `public/photos/` and update the gallery markup to reference those files.
- **Music:** The top-right music control is a demo toggle. To add a real song, use a royalty-free or personally owned audio file, place it at `public/birthday-song.mp3`, then add an `<audio>` element and play/pause handler in `src/App.jsx`. Browsers require a user gesture before audio playback.

## Deploy free with Vercel

1. Create a GitHub repository and push this project.
2. Sign in to https://vercel.com and choose **Add New → Project**.
3. Import the repository.
4. Framework preset: **Vite** (usually detected automatically).
5. Build command: `npm run build`; output directory: `dist`.
6. Click **Deploy**. Share the generated URL with Frooti.

## Deploy free with Netlify

1. Push the project to GitHub.
2. In https://app.netlify.com choose **Add new site → Import an existing project**.
3. Select the repository.
4. Build command: `npm run build`; publish directory: `dist`.
5. Deploy and share the URL.

## Mobile compatibility

The layout uses responsive CSS breakpoints, flexible grids, a 320px minimum viewport, touch-friendly controls, and reduced-motion support. Test with your browser's mobile device toolbar and on a real phone before sharing.
