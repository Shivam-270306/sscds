import { Link } from "react-router-dom";
import { formatINR } from "../data/shops.js";
import { STRATEGIES } from "../data/strategies.js";

export default function HistoryList({ items }) {
  return (
    <div className="history-list">
      {items.map((r) => (
        <Link key={r.id} to={`/insights/${r.id}`} className="history-item">
          <div style={{minWidth:0, flex:1}}>
            <div className="meta">
              <span>{new Date(r.createdAt).toLocaleString("en-IN")}</span>
              <span>·</span>
              <span className="badge">{STRATEGIES[r.priority].title.replace(" Strategy","")}</span>
              <span>·</span>
              <span>From {r.location}</span>
            </div>
            <div className="title">"{r.product}" → {r.best.name} <span className="muted" style={{fontWeight:400}}>— {r.best.city}</span></div>
            <div className="pills">
              <span>🏆 Score {(r.best.scoreNorm * 100).toFixed(0)}/100</span>
              <span>💰 {formatINR(r.best.price)}</span>
              <span>📍 {r.best.distance.toFixed(1)} km</span>
              <span>⭐ {r.best.rating.toFixed(1)}</span>
            </div>
          </div>
          <span style={{color:"var(--muted)"}}>›</span>
        </Link>
      ))}
    </div>
  );
}
