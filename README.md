# Trail-Buddy - Lybitos

Trail-Buddy is a free web service dedicated for trail runner.

Onboarding worflow is quite simple: easy as 1,2,3!

1. Load trace file (gpx, kml, ...),
2. Load roadbook file (csv),
3. enjoy the race!

Then you will be able to:

- spot trail runner on track (map),
- spot trail runner on elevation profile,
- display sections details,
- display current section details,
- follow trail runner progression.

Final thoughts:

- works on phone, tablet or computer,
- free,
- offline supported.

# Style

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Continous integration

![Deploy to Now](https://badgen.net/badge/%E2%96%B2%20Deploy%20to%20Now/$%20now%20totorototo%2Fstack-menu/black)

# Requirements

- node `^6.9.1`
- npm `^3.10.8`
- have a valid Mapbox account and copy your public API key
- create an .env file into project root directory
- paste your MAPBOX public key inside your .env file and make sure to replace [AAA] with your key.

```bash
REACT_APP_MAPBOX_KEY=[AAA]
```

# Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), you can follow these steps to get the project up and running:

```bash
git clone https://github.com/totorototo/stack-menu.git
cd stack-menu
yarn install                           # Install project dependencies
```

# Ignition

```bash
yarn start                     # Compile and launch packager
```

sample data could be found in /src/data

- gpx: /src/data/echappee_belle_2020.gpx
- csv: /src/data/echappee_belle2020.csv

# Links:

- [Trail-Buddy](https://stack-menu.now.sh/)
- [Twiter](https://twitter.com/LLogicielle)
