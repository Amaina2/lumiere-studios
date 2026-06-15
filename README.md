# Lumière Studios

Premium photography and videography website for Lumière Studios — weddings, corporate, fashion, and commercial work in Kenya.

## Live Site

After deployment, your site will be available at:

**https://YOUR_GITHUB_USERNAME.github.io/lumiere-studios/**

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

## Project Structure

```
lumiere-studios/
├── index.html          # Main landing page
├── privacy.html        # Privacy policy
├── 404.html            # Custom not-found page
├── style.css           # Styles
├── script.js           # Interactivity
├── site.config.js      # Site URL, contact info, form settings
├── assets/             # Favicon and static assets
├── robots.txt          # Search engine rules
├── sitemap.xml         # SEO sitemap
└── .github/workflows/  # GitHub Pages deployment
```

## Local Preview

Open `index.html` in your browser, or run a local server:

```powershell
cd C:\Users\Austin\Projects\lumiere-studios
python -m http.server 8000
```

Then visit **http://localhost:8000**

## Deploy to GitHub Pages

### 1. Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name the repository `lumiere-studios` (or any name — update URLs in config if different)
3. Keep it **Public**
4. Do **not** initialize with a README (this repo already has one)

### 2. Push your code

```powershell
cd C:\Users\Austin\Projects\lumiere-studios
git add .
git commit -m "Prepare Lumière Studios site for GitHub Pages"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/lumiere-studios.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Open your repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push to `main` triggers the deploy workflow automatically
4. Wait 1–2 minutes, then open your live URL

### 4. Update site configuration

Edit `site.config.js` before or after your first deploy:

| Setting | What to change |
|---------|----------------|
| `siteUrl` | Your live GitHub Pages URL |
| `contact` | Real phone, email, WhatsApp number |
| `social` | Your Instagram, Facebook, etc. links |
| `formspreeId` | Your Formspree form ID (see below) |

Also update `robots.txt` and `sitemap.xml` with your real `siteUrl`.

## Booking Form (Formspree)

The booking form works on static hosting via [Formspree](https://formspree.io) (free tier available):

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID (e.g. `xyzabcde` from `https://formspree.io/f/xyzabcde`)
3. Paste it into `site.config.js`:

```js
formspreeId: 'xyzabcde',
```

4. Commit and push — inquiries will arrive in your email

Until Formspree is configured, the form falls back to opening the user's email client with a pre-filled message.

## Custom Domain (Optional)

1. Add a `CNAME` file to the repo root containing your domain (e.g. `www.lumierestudios.co.ke`)
2. In GitHub **Settings → Pages**, enter the same domain
3. At your domain registrar, add DNS records per [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## Features

- Responsive design (mobile, tablet, desktop)
- Dark / light theme toggle
- Portfolio gallery with filters and lightbox
- Testimonials carousel
- Animated statistics
- Booking form with validation
- WhatsApp contact button
- SEO meta tags and structured data
- Custom 404 page
- Privacy policy page

## License

© 2026 Lumière Studios. All rights reserved.

Portfolio images are sourced from [Unsplash](https://unsplash.com) for demonstration. Replace with your own photography before going live.
