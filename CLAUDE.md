# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for dogdroid.dev. Static site with no build step - pure HTML, CSS, and vanilla JavaScript.

## Development

Preview the site by opening `index.html` directly in a browser:
```bash
open index.html
```

Or serve locally:
```bash
python3 -m http.server 8000
```

## Architecture

**index.html** - Single-page site with sections:
- Hero with animated terminal typing effect and glitch title
- About section (terminal-styled bio + skills grid + stats)
- Experience timeline (URBN, Chariot Solutions, ECRI)
- Projects grid (4 cards)
- Contact links

**style.css** - CSS custom properties for theming:
- `--accent-primary`: #00ffcc (cyan)
- `--accent-secondary`: #ff00aa (magenta)
- `--accent-tertiary`: #ffcc00 (gold)
- `--font-display`: Silkscreen (pixel font)
- `--font-mono`: JetBrains Mono

Visual effects: scanlines overlay, noise texture, glitch animations on hover.

**script.js** - Vanilla JS features:
- Mood cycler (rotating status text)
- Stat counter animation (IntersectionObserver)
- Scroll-triggered fade-in animations
- Konami code easter egg (triggers rainbow hue-rotate)

## Design System

Neo-retro terminal aesthetic with cyberpunk accents. Key patterns:
- Terminal windows with red/yellow/green dots
- `>` prefix on list items
- Section numbers in bordered boxes (01, 02, 03, 04)
- Neon glow on hover (`box-shadow: var(--shadow-glow)`)
