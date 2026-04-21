import { Link } from "react-router-dom";
import { formatINR } from "../data/shops.js";

export default function ResultCard({ shop, explanation, insightId }) {
  return (
    <div className="card-hero fade-in">
      <div className="row" style={{marginBottom: 8}}>
        <div className="brand-mark" style={{width:44, height:44, fontSize:20}}>🏆</div>
        <div>
          <div className="eyebrow">Best recommendation</div>
          <h2 style={{margin:"2px 0 0"}}>{shop.name}</h2>
          <div className="muted">{shop.city}</div>
        </div>
      </div>

      <div className="result-stats">
        <Stat lbl="Price" val={formatINR(shop.price)} />
        <Stat lbl="Distance" val={`${shop.distance.toFixed(1)} km`} />
        <Stat lbl="Rating" val={`${shop.rating.toFixed(1)} ★`} />
        <Stat lbl="Stock" val={shop.stock ? "Yes" : "No"} />
      </div>

      <div className="why">
        <div className="eyebrow">Why this shop?</div>
        <p style={{margin: "6px 0 0"}}>{explanation}</p>
        {insightId && (
          <Link to={`/insights/${insightId}`} className="btn btn-ghost btn-sm" style={{padding:"6px 0", marginTop: 10, color:"#a5b4fc"}}>
            See full analytical breakdown →
          </Link>
        )}
      </div>
    </div>
  );
}

function Stat({ lbl, val }) {
  return <div className="stat"><div className="lbl">{lbl}</div><div className="val">{val}</div></div>;
}
