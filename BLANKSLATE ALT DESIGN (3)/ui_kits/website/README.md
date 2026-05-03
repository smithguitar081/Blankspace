# BLANKSLATE Website UI Kit

Recreates the single-page BLANKSLATE music label website as a clickable prototype.

## Screens
1. **Full page** — navbar → hero → now playing → tracks → label image → footer

## Components
- `Nav.jsx` — fixed navbar with logo + nav links
- `Hero.jsx` — full-bleed hero with glass-head image and overlay text
- `MusicPlayer.jsx` — "Now Playing" section + track listing with buy buttons
- `Footer.jsx` — copyright footer with top border

## Design notes
- Pure black/white. No color accents.
- Helvetica Neue throughout. No web fonts loaded.
- All corners sharp (border-radius: 0).
- Audio uses native `<audio controls>`.
- Buy button inverts on hover.
- Nav links fade to 0.7 opacity on hover.

## Usage
Open `index.html` for a full interactive prototype.
