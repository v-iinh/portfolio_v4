# Vinh Tran — tarot deck portfolio

A tarot-deck portfolio built with React and Vite, with a dark theme (black, silver and muted gold) and a light theme (paper and ink). A deck box sits in the middle of the screen; click it and it glides down, the lid opens, and five engraved Major Arcana cards rise out and fan into a spread. Click a card and it flips over and grows into that section's page.

## Run it

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

## Build and deploy

```bash
npm run build      # outputs to dist/
npm run preview    # serves dist/ locally to check it
```

On Vercel, use build command `npm run build`; `vercel.json` sets the output directory to `dist`. On Netlify, use build command `npm run build` and output directory `dist`.

## Where things live

- `src/data/content.js` — all text: your profile, the five cards (label, numeral, arcana, one-line description), the content of each page (work, projects, courses, skills). Edit this first.
- `src/App.jsx` — the page itself: the deck box, the spread, hover behaviour, the flip-and-grow into each page, and the sun and moon theme switch. The spread layouts (`FAN` and `ROWS`) are at the top, in card widths.
- `src/art/cards.jsx` — the five engraved cards (Hermit, Wheel of Fortune, Magician, Star, Sun), and the card back.
- `src/art/PageBackdrops.jsx` — the muted engraved scene behind each card's page, each with its own slow motion: the Hermit's lantern pulsing light over drifting mountain mist under an arc of moon phases, planets travelling the Wheel's orbits between turning rims and drifting clouds, light flowing around the Magician's infinity loop between two turning magic circles with orbiting satellites, under light that pours from above and rises from below, shooting stars and a Milky Way over the Star's rippling water, and heat rising off the Sun while clouds drift over and its flowers sway above an ivy-covered wall. Switching between pages crossfades one scene into the next.
- `src/art/TarotBox.jsx` — the engraved deck box.
- `src/art/shapes.js` and `src/art/EngravingDefs.jsx` — drawing helpers and the shared hatching patterns.
- `src/components/` — the background and effects: `Heavens` (wheel and moon ring), `ConstellationField` (interactive stars), `Sky` (dust and sparkle trail), `CursorLight` (the light that replaces the pointer), `CelestialWheel`, `Letters` and `SectionBody` (the entries on each card's page).
- `src/theme.js` — the colours the engravings and canvases are drawn in, for both themes.
- `src/styles.css` — layout, type, colours and animation. Page colours are variables at the top of `.tp-root`.

## Behaviour worth knowing

- **Light and dark mode:** the sun and moon button on the bottom edge of the frame switches themes. Day opens out of the button in a widening circle; night closes in, with the day shrinking back into the button. This uses View Transitions where the browser has them and a snapshot fallback elsewhere. The choice is saved in the browser, and first-time visitors get their system setting.
- **The deck box:** the sun on the deck box turns while the box is hovered or focused.
- **The cards:** five engraved Major Arcana in `src/art/cards.jsx`. Every line draws itself in as the cards come out of the box, and each card's details move only while it is hovered.
- **Card labels:** once the cards land, a small italic label under each one names the page it opens (the card's `label` in `src/data/content.js`). The label under the hovered card brightens; the others soften.
- **Opening a card:** the card lifts from exactly where it is drawn, flips and grows to fill the screen, and the page's text fades in once it lands. Each page is one centred column of entries over a muted, full-width engraved scene for that card, and links back to the deck and to the other cards. Closing returns the card to its spot in the spread.

- **Responsive:** card size is worked out from the space below the heading, and the spread switches between one fanned row and two rows, whichever lets the cards be larger. The homepage is always exactly one screen; only an opened page scrolls.
- **Keyboard and screen readers:** Tab reaches the deck and the cards, Enter opens them, focus stays inside an open page, and Escape closes it and returns focus to the card. Opening and closing the deck is announced.
- **Reduce Motion:** if a visitor has it turned on, the glides and fades stay, and the 3D flip, spinning, twinkling, line drawing, sparkle trail and pointer trail are switched off.
- **Touch screens:** the pointer light is not drawn on phones and tablets; the star field still responds to touch.

## Changing the colours

- Engraving and canvas colours for both themes are in `THEMES` in `src/theme.js`: `INK` (card engraving), `SKY_INK` (the sky), `PAPER` (card stock), `LINE` and `BOX` (the deck box), and the star-field colours.
- Page colours for the dark theme are the variables at the top of `.tp-root` in `src/styles.css`; the light theme overrides them under `.tp-root[data-theme="light"]`, further down the same file.
