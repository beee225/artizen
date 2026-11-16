# Artizen — ART I ZEN gifting website

Static site (HTML, CSS, JavaScript). No build step needed.

## Run
Open `index.html` in a browser (needs internet for Google Fonts and Lucide icons).

## Put it online (GitHub Pages)
1. Upload all these files to a GitHub repository (keep the folder structure).
2. Repo Settings → Pages → Source: "Deploy from a branch" → `main` / `(root)` → Save.
3. Your site appears at `https://<username>.github.io/<repo>/`.

## Change photos
- Product photos live in `assets/<category>/`. Paths are set in `js/products.js`.
- Missing photos show a placeholder automatically. Add a file with the same name to replace it.
- Background image: `assets/bg/background.jpg` (optional).
- BEE creator logo: `assets/logo/bee.png` (optional).

## Contact numbers
WhatsApp ordering number is set in `js/whatsapp.js` (`WA_NUM`).
