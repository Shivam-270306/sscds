# SmartSupply IN — Smart Supply Chain Decision System

Vite + React Router DOM + plain CSS. Localized for the Indian market (₹).

## Features
- Public landing page (login NOT required)
- Home recommendation engine: pick city, product, strategy → get best shop in ₹
- Three strategies (Cheapest, Nearest, Balanced) with detailed analytics pages (Recharts)
- **NEW: "Why this shop" insights** — every search saved to localStorage with a full analytical breakdown:
  - Score per shop (bar chart, winner highlighted)
  - Weight distribution (radar chart)
  - Stacked factor contribution (where each shop won points)
  - Head-to-head comparison vs runners-up
  - Plain-English factor-by-factor reasoning
- Search history page with detail view per past search
- Optional Auth (login/signup, localStorage-only — UI demo)
- Responsive plain CSS, dark-friendly tokens

## Run
```
npm install
npm run dev
```

Build:
```
npm run build && npm run preview
```
