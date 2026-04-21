import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import { STRATEGIES } from "../data/strategies.js";
import { shops, INDIAN_CITIES, haversineKm, formatINR } from "../data/shops.js";

const tooltipStyle = {
  background: "#151b32", border: "1px solid #232a47", borderRadius: 8, fontSize: 12, color: "#e8ecf8",
};

function rankShops(strategyKey, originCity = "Mumbai") {
  const origin = INDIAN_CITIES[originCity];
  const inStock = shops.filter(s => s.stock).map(s => ({ ...s, distance: haversineKm(origin, { lat: s.lat, lon: s.lon }) }));
  const w = STRATEGIES[strategyKey].weights;
  const norm = (vals) => { const min = Math.min(...vals); const max = Math.max(...vals); const span = max - min || 1; return vals.map(v => (v - min) / span); };
  const prices = norm(inStock.map(s => s.price));
  const dists  = norm(inStock.map(s => s.distance));
  const ratInv = norm(inStock.map(s => 1 / s.rating));
  return inStock.map((s, i) => ({
    ...s, score: w.price * prices[i] + w.distance * dists[i] + w.rating * ratInv[i],
  })).sort((a,b) => a.score - b.score);
}

export default function StrategyDetail({ strategyKey }) {
  const s = STRATEGIES[strategyKey];
  const ranked = rankShops(strategyKey);
  const winner = ranked[0];

  const weightData = [
    { factor: "Price",    weight: s.weights.price * 100 },
    { factor: "Distance", weight: s.weights.distance * 100 },
    { factor: "Rating",   weight: s.weights.rating * 100 },
    { factor: "Stock",    weight: s.weights.avail * 100 },
  ];
  const scoreData = ranked.map(r => ({ name: r.name.split(" ")[0], score: Number((1 - r.score).toFixed(3)) }));

  return (
    <div className="grid">
      <div className="card-hero">
        <h2 style={{margin: 0}}>{s.title}</h2>
        <p style={{color:"#a5b4fc", margin:"6px 0 0", fontWeight: 600}}>{s.tagline}</p>
        <p style={{marginTop: 12, color:"var(--text-soft)"}}>{s.description}</p>
        <div className="formula">∑ {s.formula}</div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3 style={{margin: 0, fontSize: 16}}>Weight distribution</h3>
          <div className="muted">How this strategy balances the four factors</div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={weightData}>
                <PolarGrid stroke="#232a47" />
                <PolarAngleAxis dataKey="factor" tick={{ fontSize: 12, fill: "#8b94b3" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill:"#8b94b3" }} />
                <Radar dataKey="weight" stroke="#6366f1" fill="#6366f1" fillOpacity={0.45} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{margin: 0, fontSize: 16}}>Shop ranking under this strategy</h3>
          <div className="muted">From Mumbai — taller = better score</div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#232a47" />
                <XAxis dataKey="name" stroke="#8b94b3" fontSize={12} />
                <YAxis stroke="#8b94b3" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{fontSize:12, color:"#8b94b3"}} />
                <Bar dataKey="score" fill="#22d3ee" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="eyebrow">Top pick from Mumbai</div>
        <h3 style={{margin: "4px 0 0"}}>{winner.name} <span className="muted" style={{fontWeight:400}}>— {winner.city}</span></h3>
        <div className="row" style={{marginTop: 12}}>
          <div className="stat" style={{minWidth:120}}><div className="lbl">Price</div><div className="val">{formatINR(winner.price)}</div></div>
          <div className="stat" style={{minWidth:120}}><div className="lbl">Distance</div><div className="val">{winner.distance.toFixed(1)} km</div></div>
          <div className="stat" style={{minWidth:120}}><div className="lbl">Rating</div><div className="val">{winner.rating.toFixed(1)} ★</div></div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="eyebrow" style={{color:"#6ee7b7"}}>✓ Best for</div>
          <ul className="clean" style={{marginTop: 8}}>{s.bestFor.map(b => <li key={b}>• {b}</li>)}</ul>
        </div>
        <div className="card">
          <div className="eyebrow" style={{color:"#fca5a5"}}>! Trade-offs</div>
          <ul className="clean" style={{marginTop: 8}}>{s.tradeoffs.map(b => <li key={b}>• {b}</li>)}</ul>
        </div>
      </div>

      <div className="card card-soft">
        <div className="eyebrow">Real-world Indian example</div>
        <p style={{margin:"6px 0 0", color:"var(--text-soft)"}}>{s.example}</p>
      </div>
    </div>
  );
}
