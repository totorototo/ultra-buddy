# <img src="./public/logo192.png" width="24"> Ultra-Buddy

Ultra-Buddy is a progrossive web application dedicated for trail runner.

Onboarding worflow is quite simple: easy as 1,2,3!

1. Load trace (gpx, kml, ...),
2. Load timetable (csv),
3. enjoy!

Then you will be able to:

- spot runner on track (map),
- spot runner on elevation profile,
- display sections details,
- display current section details,
- follow trail runner progression.

Final thoughts:

- either works on phone, tablet or computer,
- totaly free,
- offline supported.

# Style

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Continous integration

![Deploy to Now](https://badgen.net/badge/%E2%96%B2%20Deploy%20to%20Now/$%20now%20totorototo%2Fultra-buddy/black)

# Requirements

- Node.js `>=18.0.0`
- npm `>=9.0.0`
- Valid Mapbox account

# Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), follow these steps:

```bash
git clone https://github.com/totorototo/ultra-buddy.git
cd ultra-buddy
npm install                           # Install project dependencies
```

## Mapbox Configuration

Create a `.env` file in the project root and add your Mapbox public key:

```bash
VITE_MAPBOX_KEY=<your_mapbox_key>
```

## Development & Build

This project uses **Vite** for fast development and optimized builds:

```bash
npm start                      # Start development server
npm run build                  # Build for production
npm run preview               # Preview production build locally
```

Sample data can be found in `/src/data`:

- gpx: /src/data/echappee_belle_2020.gpx
- csv: /src/data/echappee_belle2020.csv

# Screenshots

| Feature | Preview |
|---------|---------|
| **Wizard** - Upload your GPX trace and CSV timetable in 2 easy steps | ![Wizard step](./screenshots/wizard.png) |
| **Map View** - Track runner location on interactive map with real-time updates | ![Map view](./screenshots/map.png) |
| **Elevation Profile** - Monitor altitude changes throughout the race | ![Elevation profile](./screenshots/main.png) |
| **Sections** - View detailed information for each race section | ![Sections detail](./screenshots/sections.png) |
| **Progression** - Follow runner progress and time remaining | ![Runner progression](./screenshots/progression.png) |
| **Options** - Configure display settings and preferences | ![Options menu](./screenshots/options.png) |
| **Menu** - Quick access to all features and controls | ![Menu](./screenshots/stack-menu.png) |

# Links:

- [Trail-Buddy](https://ultra-buddy.now.sh/)
- [Twiter](https://twitter.com/LLogicielle)
