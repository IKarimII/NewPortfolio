# Karim Hawwa's portfolio

The site behind [karimhawwa.tech](https://www.karimhawwa.tech), built with React 19, Vite and Tailwind CSS 4.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run lint
```

## Editing content

All text, links and project data live in `src/data.js`. Sections in
`src/components/` only lay that data out.

- **CV**: replace `public/Karim-Hawwa-CV.pdf`.
- **Project screenshots**: add a `.webp` to `src/assets/work/` and reference it
  from `src/data.js`. A project with `image: null` shows its address instead.
- **Colours and fonts**: the tokens at the top of `src/index.css`.
