# ronitmartin.github.io

Source code for Ronit Martin's personal portfolio website.

Both portfolios are maintained together on `main`. The site builds with Vite and deploys to GitHub Pages automatically when changes are pushed to `main`.

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Portfolio URLs

- `/corporate/` — Corporate Portfolio
- `/wii/` — Wii Menu Portfolio

The root URL opens Corporate Portfolio. Legacy `/?view=wii` and channel links still open the Wii version.

## Updating the site

Work directly on `main`, then commit and push your changes:

```bash
git add <changed-files>
git commit -m "Describe the update"
git push origin main
```

No redesign branch or pull request is needed for routine updates. GitHub Actions builds and deploys both portfolios together. Configure the repository’s Pages source as **GitHub Actions**.

Live URLs:

- https://ronitmartin.github.io/ — opens Corporate Portfolio
- https://ronitmartin.github.io/corporate/
- https://ronitmartin.github.io/wii/
