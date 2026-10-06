#  gorstak-site

> **Gorstak Project Showcase Website** - Static HTML portfolio site displaying GitHub projects with modern UI.
>
> Live at **https://gorstak.eu** (GitHub Pages, custom domain).

---

##  Overview

gorstak-site is a clean, modern portfolio website showcasing Gorstak's GitHub projects. Built with vanilla HTML, CSS, and JavaScript, it provides an elegant interface for browsing repositories with search and filtering capabilities. It is hosted on GitHub Pages under the `psihijatrija` account at the custom domain `gorstak.eu`.

---

##  Features

-  **Project Search** - Real-time search across all repositories
-  **Category Filtering** - Filter by project type
-  **Project Stats** - Display stars, forks, language info
-  **Responsive Design** - Works on all devices
-  **Fast Loading** - Static site with optimized assets
-  **Direct Links** - One-click access to GitHub repos
-  **Modern UI** - Clean, professional design

---

##  Project Structure

| File | Description |
|------|-------------|
| `index.html` | Main website page (self-contained HTML/CSS/JS) |
| `projects.json` | Hand-curated project list used by the UI |
| `readmes/` | Per-project README markdown shown in the detail modal |
| `notes/` | My-Notes knowledge base, indexed by `notes/notes.json` |
| `repos.json` | Config for the optional fetch script (`users`, `excludeRepos`) |
| `CNAME` | Custom domain (`gorstak.eu`) |
| `scripts/` | Optional `fetch-projects.js` GitHub API fetcher (manual use) |
| `.github/workflows/` | Pages deploy workflow |

---

##  Deployment

### GitHub Pages
1. Push to the `main` branch of `psihijatrija/gorstakssite`
2. Settings -> Pages -> Source: "Deploy from a branch" (or the included Actions workflow)
3. The `Deploy GitHub Pages` workflow publishes the site on every push to `main`

### Custom Domain (gorstak.eu)
1. `CNAME` contains `gorstak.eu`
2. DNS at the registrar (OVH):
   - Apex `@` A records -> GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` CNAME -> `psihijatrija.github.io.`
3. Enable "Enforce HTTPS" in Settings -> Pages once the certificate provisions

### Local Testing
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Access
http://localhost:8000
```

---

##  Data Structure

### projects.json
```json
{
  "projects": [
    {
      "name": "GEDR",
      "description": "Gorstak Endpoint Detection & Response",
      "language": "C#",
      "stars": 150,
      "forks": 25,
      "url": "https://github.com/psihijatrija/Sentinel",
      "category": "security",
      "tags": ["edr", "security", "windows"]
    }
  ]
}
```

### Updating Projects
1. Edit `projects.json`
2. Add new project entries
3. Commit and push
4. GitHub Pages auto-updates

---

##  Customization

### Colors & Theme
Edit CSS variables in `index.html`:
```css
:root {
  --primary-color: #0078d4;
  --background: #ffffff;
  --text-color: #333333;
  --accent: #5c6bc0;
}
```

### Layout
- Hero section: Top banner
- Search bar: Project filtering
- Grid layout: Project cards
- Footer: Links and info

### Adding Sections
```html
<section id="new-section">
  <h2>Section Title</h2>
  <!-- Content -->
</section>
```

---

##  Features in Detail

### Search Functionality
- Real-time filtering as you type
- Searches name, description, and tags
- Instant UI updates

### Project Cards
- Repository name and description
- Primary language with color indicator
- Star and fork counts
- Direct GitHub link
- Category badge

### Responsive Design
- Mobile: Single column
- Tablet: Two columns
- Desktop: Three columns
- Large screens: Four columns

---

##  Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

##  Maintenance

### Adding New Projects
1. Open `projects.json`
2. Add entry:
```json
{
  "name": "ProjectName",
  "description": "Brief description",
  "language": "Python",
  "stars": 0,
  "forks": 0,
  "url": "https://github.com/psihijatrija/ProjectName",
  "category": "tools",
  "tags": ["python", "automation"]
}
```
3. Commit and push

### Updating Stats
- Stars and forks can be updated manually
- Or use GitHub API to auto-update
- Update `projects.json` periodically

---

##  Future Enhancements

- [ ] GitHub API integration for live stats
- [ ] Dark mode toggle
- [ ] Project detail pages
- [ ] Blog/updates section
- [ ] Contact form
- [ ] Resume/CV download

---

##  License & Disclaimer
---

## Comprehensive legal disclaimer

This project is intended for authorized defensive, administrative, research, or educational use only.

- Use only on systems, networks, and environments where you have explicit permission.
- Misuse may violate law, contracts, policy, or acceptable-use terms.
- Running security, hardening, monitoring, or response tooling can impact stability and may disrupt legitimate software.
- Validate all changes in a test environment before production use.
- This project is provided "AS IS", without warranties of any kind, including merchantability, fitness for a particular purpose, and non-infringement.
- Authors and contributors are not liable for direct or indirect damages, data loss, downtime, business interruption, legal exposure, or compliance impact.
- You are solely responsible for lawful operation, configuration choices, and compliance obligations in your jurisdiction.

---

<p align="center">
  <sub>Built with care by <strong>Gorstak</strong></sub>
</p>