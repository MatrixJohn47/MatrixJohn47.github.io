# MatrixJohn47.github.io

# mobinsanthoshjohn.com

Personal portfolio site. Plain HTML, CSS, and JS, no build tools, no frameworks. Hosted on GitHub Pages via the `main` branch.

## Structure

- `index.html` — homepage / hero
- `style.css` — shared stylesheet for the main portfolio (about, industry pages, etc)
- `about/index.html` — About page (CV-style)
- `vision/index.html` — "dot. — the vision" scrollytelling page
- `dot-arc/index.html` — dot.arc placeholder page (case study / event choice)
- `work-in-progress/index.html`
- `fan-art/index.html`
- `private-work/index.html` — password-gated, `noindex`, not linked anywhere on the site. Shares `private-work.js` and `style.css`.

## dot. system (separate visual identity)

- `dot-style.css` — shared stylesheet for anything under the "dot." brand family (dark, lavender/green palette)
- `vision.js` — scroll animations for the vision page

## Notes

- Clean URLs use the `folder/index.html` pattern. GitHub Pages auto-serves `index.html` for any folder visited without a filename.
- `sitemap.xml` lists public pages only. `private-work` is deliberately excluded (it's noindexed).
- `private-work.js` password is set as a plain variable in `private-work/index.html`. This is a casual deterrent only, not real security, anyone viewing page source can find it.
- `development` branch exists for testing changes before merging into `main`. Netlify auto-builds a preview URL for it. `main` is what's actually live at the real domain.
- Asset images live under `assets/private-work/` and are referenced with `../` paths from inside folders.
