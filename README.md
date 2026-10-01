#  gorstak-site

> **Gorstak Project Showcase Website** - Static HTML portfolio site displaying GitHub projects with modern UI.

---

##  Overview

gorstak-site is a clean, modern portfolio website showcasing Gorstak's GitHub projects. Built with vanilla HTML, CSS, and JavaScript, it provides an elegant interface for browsing repositories with search and filtering capabilities.

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
| `index.html` | Main website page (22.3 KB) |
| `projects.json` | Project data and metadata (38.9 KB) |
| `repos.json` | Repository list (83 B) |
| `repos.zip` | Compressed repository archive (15.4 KB) |
| `CNAME` | Custom domain configuration |
| `scripts/` | JavaScript utilities |

---

##  Deployment

### GitHub Pages
1. Fork this repository
2. Go to Settings -> Pages
3. Select main branch as source
4. Site will be available at `https://yourusername.github.io/gorstak-site`

### Custom Domain
1. Update `CNAME` file with your domain
2. Configure DNS records:
   - CNAME: `www` -> `yourusername.github.io`
   - A Records: Point to GitHub Pages IPs
3. Enable HTTPS in repository settings

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
      "url": "https://github.com/Gorstak-Zadar/GEDR",
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
  "url": "https://github.com/Gorstak-Zadar/ProjectName",
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