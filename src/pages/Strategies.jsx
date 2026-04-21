import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import { STRATEGIES } from "../data/strategies.js";

export default function Strategies() {
  const list = Object.values(STRATEGIES);
  return (
    <AppShell>
      <div className="container section">
        <div className="page-header">
          <h1>Strategies</h1>
          <p>Three ways the engine can pick the best Indian shop. Each one weighs price, distance, stock and rating differently.</p>
        </div>
        <div className="grid grid-2">
          {list.map(s => (
            <Link to={`/strategies/${s.key}`} key={s.key} className="card" style={{textDecoration:"none"}}>
              <div className="eyebrow">{s.title}</div>
              <h3 style={{margin: "6px 0 4px"}}>{s.tagline}</h3>
              <p style={{color:"var(--text-soft)", margin: 0}}>{s.description.slice(0, 180)}…</p>
              <div className="row" style={{marginTop: 12}}>
                <span className="badge">Price {(s.weights.price*100).toFixed(0)}%</span>
                <span className="badge">Distance {(s.weights.distance*100).toFixed(0)}%</span>
                <span className="badge">Rating {(s.weights.rating*100).toFixed(0)}%</span>
                <span className="badge">Stock {(s.weights.avail*100).toFixed(0)}%</span>
              </div>
              <div style={{marginTop: 14, color:"#a5b4fc", fontWeight: 600, fontSize: 14}}>Read full analysis →</div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
