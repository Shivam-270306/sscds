import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import { formatINR } from "../data/shops.js";
import { STRATEGIES } from "../data/strategies.js";

const tooltipStyle = {
  background: "#151b32", border: "1px solid #232a47", borderRadius: 8, fontSize: 12, color: "#e8ecf8",
};

export default function InsightDetail({ rec }) {
  const strat = STRATEGIES[rec.priority];
  const best = rec.best;
  const runners = rec.ranked.slice(1, 4);

  const weightData = [
    { factor: "Price",    weight: strat.weights.price * 100 },
    { factor: "Distance", weight: strat.weights.distance * 100 },
    { factor: "Rating",   weight: strat.weights.rating * 100 },
    { factor: "Stock",    weight: strat.weights.avail * 100 },
  ];

  const scoreData = rec.ranked.map((r) => ({
    name: r.name.split(" ")[0],
    score: Number((r.scoreNorm * 100).toFixed(1)),
    isBest: r.name === best.name,
  }));

  const maxContrib = {
    price:    Math.max(...rec.ranked.map(r => r.contrib.price))    || 1,
    distance: Math.max(...rec.ranked.map(r => r.contrib.distance)) || 1,
    avail:    Math.max(...rec.ranked.map(r => r.contrib.avail))    || 1,
    rating:   Math.max(...rec.ranked.map(r => r.contrib.rating))   || 1,
  };
  const contribData = rec.ranked.map((r) => ({
    name: r.name.split(" ")[0],
    Price:    Number(((1 - r.contrib.price    / maxContrib.price)    * (strat.weights.price    * 100)).toFixed(1)),
    Distance: Number(((1 - r.contrib.distance / maxContrib.distance) * (strat.weights.distance * 100)).toFixed(1)),
    Stock:    Number(((1 - r.contrib.avail    / maxContrib.avail)    * (strat.weights.avail    * 100)).toFixed(1)),
    Rating:   Number(((1 - r.contrib.rating   / maxContrib.rating)   * (strat.weights.rating   * 100)).toFixed(1)),
  }));

  const reasons = buildReasons(rec);

  return (
    <div className="grid">
      {/* Hero */}
      <div className="card-hero">
        <div className="row">
          <div className="brand-mark" style={{width:48, height:48, fontSize:22}}>🏆</div>
          <div style={{flex:1, minWidth:0}}>
            <div className="eyebrow">Winner · {strat.title}</div>
            <h2 style={{margin:"4px 0 0"}}>{best.name} <span className="muted" style={{fontWeight:400}}>— {best.city}</span></h2>
            <div className="row" style={{marginTop: 8}}>
              {best.badges.map(b => <span key={b} className="badge">{b}</span>)}
              <span className="badge badge-outline">Final score {(best.scoreNorm*100).toFixed(0)}/100</span>
            </div>
          </div>
        </div>

        <div className="result-stats">
          <Stat lbl="Price" val={formatINR(best.price)} />
          <Stat lbl={`Distance from ${rec.location}`} val={`${best.distance.toFixed(1)} km`} />
          <Stat lbl="Rating" val={`${best.rating.toFixed(1)} ★`} />
          <Stat lbl="In stock" val={best.stock ? "Yes" : "No"} />
        </div>

        <div className="why">
          <div className="eyebrow">Plain-English reasoning</div>
          <p style={{margin: "6px 0 0"}}>{rec.explanation}</p>
        </div>
      </div>

      {/* Strategy summary */}
      <div className="card">
        <div className="eyebrow">⚖ Strategy applied</div>
        <h3 style={{margin:"4px 0 0"}}>{strat.title}</h3>
        <p style={{color: "#a5b4fc", margin: "6px 0 0", fontSize:14}}>{strat.tagline}</p>
        <p style={{marginTop: 12, color:"var(--text-soft)"}}>{strat.description}</p>
        <div className="formula">∑ {strat.formula}</div>
      </div>

      {/* Charts */}
      <div className="grid grid-2">
        <ChartCard title="Weight distribution" subtitle="How the four factors were weighted for this search">
          <RadarChart data={weightData}>
            <PolarGrid stroke="#232a47" />
            <PolarAngleAxis dataKey="factor" tick={{ fontSize: 12, fill: "#8b94b3" }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill:"#8b94b3" }} />
            <Radar dataKey="weight" stroke="#6366f1" fill="#6366f1" fillOpacity={0.45} />
            <Tooltip contentStyle={tooltipStyle} />
          </RadarChart>
        </ChartCard>

        <ChartCard title="Final score per shop" subtitle="Higher = better. The winning shop is highlighted.">
          <BarChart data={scoreData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#232a47" />
            <XAxis dataKey="name" stroke="#8b94b3" fontSize={12} />
            <YAxis stroke="#8b94b3" fontSize={12} domain={[0, 100]} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="score" radius={[8,8,0,0]}>
              {scoreData.map((d, i) => <Cell key={i} fill={d.isBest ? "#6366f1" : "#22d3ee"} />)}
            </Bar>
          </BarChart>
        </ChartCard>
      </div>

      <ChartCard title="Where each shop won points" subtitle="Stacked contribution per factor (taller stack = stronger across the board)">
        <BarChart data={contribData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#232a47" />
          <XAxis dataKey="name" stroke="#8b94b3" fontSize={12} />
          <YAxis stroke="#8b94b3" fontSize={12} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{fontSize:12, color:"#8b94b3"}} />
          <Bar dataKey="Price"    stackId="a" fill="#6366f1" />
          <Bar dataKey="Distance" stackId="a" fill="#22d3ee" />
          <Bar dataKey="Rating"   stackId="a" fill="#f59e0b" />
          <Bar dataKey="Stock"    stackId="a" fill="#10b981" />
        </BarChart>
      </ChartCard>

      {/* Reasons */}
      <div className="card">
        <div className="eyebrow">🧮 Why {best.name} won — factor by factor</div>
        <div className="grid grid-2" style={{marginTop: 12}}>
          {reasons.map((p) => (
            <div key={p.label} className="card card-soft">
              <div className="spread">
                <strong style={{fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", color:"var(--muted)"}}>{p.label}</strong>
                <span className="badge">weight {(p.weight*100).toFixed(0)}%</span>
              </div>
              <p style={{margin: "8px 0 0", color:"var(--text-soft)", fontSize: 14}}>{p.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Head-to-head */}
      {runners.length > 0 && (
        <div className="card" style={{padding:0}}>
          <div style={{padding: "20px 24px 0"}}>
            <h3 style={{margin: 0}}>Head-to-head vs the next best shops</h3>
          </div>
          <div className="table-wrap" style={{padding:"12px 12px 12px"}}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Shop</th>
                  <th className="r">Price</th>
                  <th className="r">Distance</th>
                  <th className="r">Rating</th>
                  <th className="r">Score</th>
                  <th className="r">vs Winner</th>
                </tr>
              </thead>
              <tbody>
                <Row shop={best} winner highlight />
                {runners.map((r) => (
                  <Row key={r.name} shop={r} winner={false}
                       bestPrice={best.price} bestDist={best.distance} bestScore={best.scoreNorm} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Best for / trade-offs */}
      <div className="grid grid-2">
        <div className="card">
          <div className="eyebrow" style={{color:"#6ee7b7"}}>✓ When this strategy works best</div>
          <ul className="clean" style={{marginTop: 8}}>
            {strat.bestFor.map(b => <li key={b}>• {b}</li>)}
          </ul>
        </div>
        <div className="card">
          <div className="eyebrow" style={{color:"#fca5a5"}}>! Trade-offs to keep in mind</div>
          <ul className="clean" style={{marginTop: 8}}>
            {strat.tradeoffs.map(b => <li key={b}>• {b}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Stat({ lbl, val }) {
  return <div className="stat"><div className="lbl">{lbl}</div><div className="val">{val}</div></div>;
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="card">
      <div className="spread">
        <div>
          <h3 style={{margin: 0, fontSize: 16}}>{title}</h3>
          <div className="muted">{subtitle}</div>
        </div>
      </div>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
      </div>
    </div>
  );
}

function Row({ shop, winner, highlight, bestPrice, bestDist, bestScore }) {
  const priceDiff = bestPrice != null ? shop.price - bestPrice : 0;
  const distDiff  = bestDist  != null ? shop.distance - bestDist : 0;
  const scoreDiff = bestScore != null ? (shop.scoreNorm - bestScore) * 100 : 0;
  return (
    <tr className={highlight ? "best" : ""}>
      <td>
        <strong>{shop.name}</strong> {winner && <span style={{marginLeft: 6, color:"#a5b4fc", fontSize: 12}}>★ winner</span>}
        <div className="muted" style={{fontSize: 12}}>{shop.city}</div>
      </td>
      <td className="r">{formatINR(shop.price)}</td>
      <td className="r">{shop.distance.toFixed(1)} km</td>
      <td className="r">{shop.rating.toFixed(1)} ★</td>
      <td className="r"><strong>{(shop.scoreNorm*100).toFixed(0)}</strong></td>
      <td className="r" style={{fontSize:12, color:"var(--muted)"}}>
        {winner ? "—" : (
          <>
            <div>{priceDiff > 0 ? `+${formatINR(priceDiff)}` : formatINR(priceDiff)}</div>
            <div>{distDiff > 0 ? `+${distDiff.toFixed(1)}` : distDiff.toFixed(1)} km</div>
            <div>{scoreDiff.toFixed(0)} pts</div>
          </>
        )}
      </td>
    </tr>
  );
}

function buildReasons(rec) {
  const w = STRATEGIES[rec.priority].weights;
  const best = rec.best;
  const others = rec.ranked.filter(r => r.name !== best.name);
  const minPrice = Math.min(...rec.ranked.map(r => r.price));
  const minDist  = Math.min(...rec.ranked.map(r => r.distance));
  const maxRating = Math.max(...rec.ranked.map(r => r.rating));
  const cheapestOther = [...others].sort((a,b) => a.price - b.price)[0];
  const closestOther  = [...others].sort((a,b) => a.distance - b.distance)[0];

  return [
    {
      label: "Price", weight: w.price,
      text: best.price === minPrice
        ? `${best.name} has the lowest price at ${formatINR(best.price)}, beating the next cheapest by ${formatINR(cheapestOther.price - best.price)}.`
        : `At ${formatINR(best.price)}, ${best.name} costs ${formatINR(best.price - minPrice)} more than the cheapest option, but the strategy weighs price at only ${(w.price*100).toFixed(0)}%, so the gap is acceptable.`,
    },
    {
      label: "Distance", weight: w.distance,
      text: best.distance === minDist
        ? `Closest to ${rec.location} at ${best.distance.toFixed(1)} km — ${(closestOther.distance - best.distance).toFixed(1)} km nearer than the next shop.`
        : `${best.distance.toFixed(1)} km from ${rec.location} (${(best.distance - minDist).toFixed(1)} km farther than the closest), offset by stronger price/rating.`,
    },
    {
      label: "Rating", weight: w.rating,
      text: best.rating === maxRating
        ? `Top-rated shop in this comparison at ${best.rating.toFixed(1)} ★ — high reliability and service quality.`
        : `Rated ${best.rating.toFixed(1)} ★ vs the leader's ${maxRating.toFixed(1)} ★ — competitive but not the best on this dimension.`,
    },
    {
      label: "Stock availability", weight: w.avail,
      text: best.stock
        ? `Confirmed in stock — eliminates the risk of an out-of-stock surprise after travelling.`
        : `Currently out of stock, which heavily penalises the score under any strategy.`,
    },
  ];
}
