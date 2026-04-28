# SmartSupply IN — Smart Supply Chain Decision System

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-5.4-purple?style=for-the-badge&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Status-Active-green?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">
</p>

> **Smart Supply Chain Decision System** — An intelligent recommendation engine for the Indian retail market. Find the best shop for any product based on price, distance, availability, and ratings using weighted scoring algorithms.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Strategies Explained](#strategies-explained)
- [Analytics & Charts](#analytics--charts)
- [Data Model](#data-model)
- [Future Implementations](#future-implementations)
- [Contributing](#contributing)
- [License](#license)

---

## 🌐 Overview

SmartSupply IN is a **decision support system** designed for the Indian retail ecosystem. It helps consumers, small businesses, and kirana shops find the optimal retailer for their purchases by analyzing multiple factors:

- **Price** — Product pricing across different retailers
- **Distance** — Proximity to the buyer's location
- **Availability** — In-stock status and inventory levels
- **Rating** — Customer satisfaction scores

The system uses **weighted scoring algorithms** to rank shops and provides detailed analytical breakdowns with interactive charts.

---

## ✨ Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Landing Page** | Public landing page with no login required |
| **Recommendation Engine** | Select city, product, and strategy to get the best shop recommendation in INR |
| **Three Strategies** | Cheapest, Nearest, and Balanced with detailed analytics |
| **Why This Shop Insights** | Full analytical breakdown for every search |
| **Search History** | View past searches with detailed analysis |
| **Optional Authentication** | Login/Signup UI (localStorage-based demo) |
| **Responsive Design** | Mobile-friendly plain CSS with dark mode support |

### Analytics Features

- **Score per Shop** — Bar chart with winner highlighted
- **Weight Distribution** — Radar chart showing factor contributions
- **Stacked Factor Contribution** — Visual breakdown of where each shop won points
- **Head-to-Head Comparison** — Compare winner vs runners-up
- **Plain-English Reasoning** — Factor-by-factor explanation

### Supported Cities

The system currently covers **10 major Indian cities**: Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Lucknow

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18.2** | UI Framework |
| **Vite 5.4** | Build Tool & Dev Server |
| **React Router DOM** | Client-side Routing |
| **Recharts** | Data Visualization (Charts) |
| **Plain CSS** | Styling (CSS Variables, Dark Mode) |
| **localStorage** | Data Persistence |

---

## 📂 Project Structure

```
sscds/
├── index.html                 # Entry HTML
├── package.json               # Dependencies & Scripts
├── vite.config.js             # Vite Configuration
├── README.md                  # This File
├── src/
│   ├── main.jsx               # React Entry Point
│   ├── App.jsx                # Main App with Routes
│   ├── styles.css             # Global Styles
│   ├── components/            # Reusable UI Components
│   │   ├── AppShell.jsx       # App Layout Shell
│   │   ├── HistoryList.jsx    # Search History List
│   │   ├── InputForm.jsx      # Search Input Form
│   │   ├── InsightDetail.jsx  # Insight Detail View
│   │   ├── Navbar.jsx         # Navigation Bar
│   │   ├── ResultCard.jsx     # Shop Result Card
│   │   ├── ShopTable.jsx      # Shop Comparison Table
│   │   ├── Sidebar.jsx        # Sidebar Navigation
│   │   └── StrategyDetail.jsx # Strategy Info Card
│   ├── context/
│   │   └── AuthContext.jsx    # Authentication Context
│   ├── data/
│   │   ├── shops.js           # Shop Data & Utilities
│   │   └── strategies.js      # Strategy Definitions
│   ├── lib/
│   │   └── recommend.js       # Recommendation Algorithm
│   ├── pages/                 # Route Pages
│   │   ├── Landing.jsx        # Landing Page
│   │   ├── Home.jsx           # Home/Search Page
│   │   ├── Dashboard.jsx      # User Dashboard
│   │   ├── Login.jsx          # Login Page
│   │   ├── Signup.jsx         # Signup Page
│   │   ├── Strategies.jsx     # Strategies Overview
│   │   ├── StrategyPage.jsx   # Individual Strategy
│   │   ├── InsightsLatest.jsx # Latest Insights
│   │   ├── InsightDetailPage.jsx # Insight Detail
│   │   ├── InsightsHistory.jsx # Search History
│   │   └── NotFound.jsx       # 404 Page
│   └── styles/
│       └── index.css          # Additional Styles
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
cd sscds

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

The app will be available at **http://localhost:5173/**

---

## ⚙️ How It Works

### Recommendation Algorithm

The core recommendation engine uses a **weighted scoring system**:

1. **Input**: Product name, City, Strategy
2. **Processing**:
   - Calculate distance from selected city to all shops using Haversine formula
   - Filter for in-stock shops only
   - Normalize all factors (price, distance, availability, rating) to 0-1 range
   - Apply strategy weights to compute scores
3. **Output**: Ranked list of shops with detailed analytics

### Scoring Formula

```
score = w₁·price + w₂·distance + w₃·availability + w₄·rating
```

Where weights vary by strategy (see below).

---

## 📊 Strategies Explained

### 1. Cheapest Strategy

| Attribute | Value |
|-----------|-------|
| **Price Weight** | 60% |
| **Distance Weight** | 15% |
| **Availability Weight** | 10% |
| **Rating Weight** | 15% |

**Best For:**
- Bulk household purchases (Diwali, wedding, festive stocking)
- Price-sensitive Tier-2/Tier-3 buyers
- Reseller and kirana sourcing

**Tradeoffs:**
- May recommend shops several km away to save money
- Lower-rated sellers can win if price is dramatically lower

---

### 2. Nearest Strategy

| Attribute | Value |
|-----------|-------|
| **Price Weight** | 15% |
| **Distance Weight** | 60% |
| **Availability Weight** | 10% |
| **Rating Weight** | 15% |

**Best For:**
- Same-day or hyperlocal delivery needs
- Emergency purchases (medicine, charger, last-minute gifts)
- Buyers with limited transport access

**Tradeoffs:**
- May pay 5-15% premium vs cheapest option
- Less optimal for high-ticket items

---

### 3. Balanced Strategy

| Attribute | Value |
|-----------|-------|
| **Price Weight** | 25% |
| **Distance Weight** | 25% |
| **Availability Weight** | 25% |
| **Rating Weight** | 25% |

**Best For:**
- Everyday Indian shoppers
- No strong preference scenarios
- Household purchases where all factors matter

---

## 📈 Analytics & Charts

The system provides comprehensive analytics with **Recharts**:

### Chart Types

| Chart | Purpose |
|-------|---------|
| **Bar Chart** | Score per shop (winner highlighted) |
| **Radar Chart** | Weight distribution across factors |
| **Stacked Bar Chart** | Factor contribution per shop |
| **Comparison Table** | Head-to-head winner vs runners-up |

### Insight Details

Each search generates a complete analytical breakdown:

1. **Score Breakdown** — Individual factor scores for each shop
2. **Winner Analysis** — Why the recommended shop won
3. **Factor Reasoning** — Plain-English explanation
4. **Historical Comparison** — How this compares to similar searches

---

## 🗃 Data Model

### Shop Data Structure

```javascript
{
  name: "Reliance Digital",
  city: "Mumbai",
  lat: 19.076,
  lon: 72.8777,
  price: 8499,        // INR
  distance: 1.2,      // km (calculated)
  stock: true,        // availability
  rating: 4.5         // out of 5
}
```

### Search Result Structure

```javascript
{
  id: "timestamp-random",
  createdAt: Date.now(),
  product: "Product Name",
  location: "Mumbai",
  priority: "cheapest|nearest|balanced",
  ranked: [...],      // All shops sorted by score
  best: {...},        // Winning shop
  explanation: "..."  // Human-readable reason
}
```

---

## 🔮 Future Implementations

### Phase 1: Enhanced Data & Features

- [ ] **More Cities** — Expand to 50+ Indian cities
- [ ] **More Products** — Electronics, groceries, pharmaceuticals, fashion
- [ ] **Real-time Stock** — Integration with retailer APIs
- [ ] **Price History** — Track price changes over time
- [ ] **Deal Alerts** — Notify users of price drops

### Phase 2: User Experience

- [ ] **User Accounts** - Full authentication with backend
- [ ] **Favorites** - Save preferred shops
- [ ] **Price Alerts** - Get notified when prices drop
- [ ] **Comparison Tool** - Compare multiple products/shops
- [ ] **Wishlist** - Save products for later

### Phase 3: Advanced Analytics

- [ ] **Trend Charts** - Price trends over time
- [ ] **Seasonal Analysis** - Best times to buy
- [ ] **Price Prediction** - ML-based price forecasting
- [ ] **Recommendation Engine** - Personalized suggestions
- [ ] **Business Intelligence** - Sales forecasts for retailers

### Phase 4: Integration & Scale

- [ ] **Retailer APIs** - Real-time inventory & pricing
- [ ] **Payment Integration** - UPI, cards, wallets
- [ ] **Delivery Partners** - Same-day delivery booking
- [ ] **Business Portal** - For retailers to manage listings
- [ ] **Multi-language Support** - Hindi, regional languages

### Phase 5: AI & Automation

- [ ] **Chatbot Assistant** - AI-powered shopping help
- [ ] **Voice Search** - Voice-enabled product search
- [ ] **Image Search** - Find products by photo
- [ ] **Smart Contracts** - Automated bulk purchasing
- [ ] **Blockchain** - Supply chain transparency

### Additional Ideas

- [ ] **PWA Support** - Installable mobile app
- [ ] **Dark/Light Theme Toggle** - User preference
- [ ] **Accessibility Features** - Screen reader support
- [ ] **Offline Mode** - Cached data access
- [ ] **Social Sharing** - Share recommendations
- [ ] **Business Analytics Dashboard** - For retailers
- [ ] **Bulk Order Discounts** - Tiered pricing
- [ ] **Loyalty Points** - Reward system
- [ ] **Carbon Footprint** - Eco-friendly routing
- [ ] **Multi-language UI** - Localization

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

```bash
# Fork the repo
# Create your feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m 'Add amazing feature'

# Push to the branch
git push origin feature/amazing-feature

# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
  Made with ❤️ for the Indian market
</p>
