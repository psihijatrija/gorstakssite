# Assets

## logo.png

The Gorstak "G" shield logo. Used as:
- the site favicon (browser tab icon), and
- the profile avatar on the landing page (shown as a 140x140 circle).

To replace it, drop a new PNG here named `logo.png` (a square image works best; it is
center-cropped into a circle for the avatar).

If the file is ever missing, the avatar falls back to a generated "G" placeholder so the page
never breaks. To point at a different filename, update the two `assets/logo.png` references in
`index.html` (the `<link rel="icon">` tag and the `<img class="avatar">` tag).
