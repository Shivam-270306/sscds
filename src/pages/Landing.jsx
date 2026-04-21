import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";

export default function Landing() {
  return (
    <AppShell>
      <section className="container hero">
        <span className="badge">🇮🇳 Built for the Indian market</span>
        <h1 style={{marginTop: 14}}>Smart Supply Chain Decisions, in Rupees.</h1>
        <p>
          SmartSupply IN compares Indian retailers across price (₹), distance from your city,
          stock and rating — and explains <em>exactly</em> why one shop wins.
        </p>
        <div className="hero-cta">
          <Link to="/home" className="btn btn-primary">Find best shop →</Link>
          <Link to="/strategies" className="btn btn-outline">Compare strategies</Link>
        </div>
      </section>

      <section className="container">
        <div className="feature-grid">
          <div className="feature">
            <div className="icon">💰</div>
            <h3>Pricing in ₹</h3>
            <p>All prices, formulas and badges shown in Indian Rupees with localized formatting.</p>
          </div>
          <div className="feature">
            <div className="icon">📍</div>
            <h3>City-aware distance</h3>
            <p>Pick from 10 Indian metros — distance to every shop is recomputed using the haversine formula.</p>
          </div>
          <div className="feature">
            <div className="icon">✨</div>
            <h3>Why this shop?</h3>
            <p>Every search saved with a full analytical breakdown — charts, weights and per-factor reasoning.</p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
