# Linwis Ventures Website

Static one-page portfolio site for Linwis Ventures LLC, deployed on GitHub Pages.

## Deploy on GitHub Pages

1. Push this repository to GitHub (public repo).
2. Go to **Settings → Pages**, set source to **Deploy from a branch**, branch `main`, folder `/` (root).
3. Site will publish at `https://<username>.github.io/linwis-website/`.

> If you use a custom domain, update every `skajake1983.github.io/linwis-website/` URL in `index.html`, `robots.txt`, and `sitemap.xml`, then add a `CNAME` file with your domain name.

## Run locally

Open `index.html` in your browser, or use a local static server:

```
npx serve .
```

## Contact Form

Formspree is already wired up in `index.html`. To test:

1. Deploy the site (Formspree validates the origin).
2. Submit a message via the contact section.
3. Check Formspree dashboard or inbox for delivery.

## Security notes

- Content Security Policy, X-Frame-Options, Referrer-Policy, and Permissions-Policy are set via `<meta http-equiv>` in `<head>`. These are enforced client-side. For server-level HTTP header enforcement on a custom domain, add a `_headers` file (Netlify/Cloudflare Pages) or configure your CDN.
- All external links use `rel="noopener noreferrer"` to prevent tab-napping.
- A hidden honeypot field is in the contact form to reduce bot submissions.
- No API keys, credentials, or PII are stored in this repository.

## File overview

| Path | Purpose |
|---|---|
| `index.html` | Main one-page site |
| `assets/css/main.css` | Styles and responsive layout |
| `assets/js/main.js` | Scroll reveal + Formspree submit handler |
| `assets/images/logos/` | Linwis and portfolio project logos |
| `jacob.jpg` | Founder photo |
| `robots.txt` | Crawler access control |
| `sitemap.xml` | Sitemap for search indexing |

## Portfolio Status Rules

- **Live** projects include an external Visit Site link.
- **Coming Soon** and **Future** projects show a status badge only.
