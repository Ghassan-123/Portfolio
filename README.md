# Mohamed Ghassan Alkhani: Portfolio

A bilingual (English / Arabic) portfolio built with React 19, Vite and Tailwind CSS 4.

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
```

Add `?lang=ar` to the URL to open the Arabic version directly.

## Editing content

| What | Where |
|---|---|
| Name, photo, email, phone, links, CV | `src/data/profile.js` |
| Projects (text in EN/AR, tags, tech, media) | `src/data/projects.json` |
| Skills and the tech strip | `src/data/skills.jsx` |
| All other text (hero, about, contact…) | `src/data/translations.js` |

Empty fields are hidden automatically. For example, if `email` is `''`, the email button isn't shown.

## Adding your photo

Put a square photo at **`public/profile.jpg`**. Until it exists, an animated "MG" monogram is shown instead.

## Adding project images and videos

Every project in `projects.json` has three optional media fields:

```json
"mainImg": "/projects/matchlens/cover.jpg",
"gallery": ["/projects/matchlens/1.jpg", "/projects/matchlens/2.jpg"],
"video": "https://youtu.be/XXXXXXXXXXX"
```

- **mainImg:** the cover. Without one, a generated cover with the project's icon is used.
- **gallery:** screenshots. The section is hidden when the list is empty.
- **video:** any of:
  - a file in `public/`, e.g. `"/videos/matchlens.mp4"` (keep files small, ideally under 20 MB)
  - a YouTube link (`watch?v=`, `youtu.be/` or `shorts/`)
  - a Vimeo link
  - a Google Drive file link (set the file to "anyone with the link")

  The demo-video section only appears when `video` is set, and project cards show a ▶ badge.

Files under `public/` are served from the site root, so `public/projects/matchlens/cover.jpg` becomes `/projects/matchlens/cover.jpg`.

**Tip:** YouTube (unlisted is fine) is the best option for long videos. It keeps the site fast and the repository small.

## Project types

`type` controls the badge on each card: `graduation`, `personal` (solo), `client`, `team` or `course`.
`featured: true` shows a project in the home page's *Featured Work* grid. The grid is designed for 6 projects.
