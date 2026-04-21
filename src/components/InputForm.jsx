import { INDIAN_CITIES } from "../data/shops.js";

export default function InputForm({ product, setProduct, priority, setPriority, location, setLocation, onSubmit, loading }) {
  const opts = [
    { v: "cheapest", t: "Cheapest", d: "Lowest ₹ wins" },
    { v: "nearest",  t: "Nearest",  d: "Closest distance wins" },
    { v: "balanced", t: "Balanced", d: "All factors equally" },
  ];
  return (
    <form className="card" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div className="grid grid-2">
        <div>
          <label className="label">Product name</label>
          <input className="input" value={product} onChange={(e)=>setProduct(e.target.value)} placeholder="e.g. Wireless Mouse, Smartphone" />
        </div>
        <div>
          <label className="label">Your location</label>
          <select className="select" value={location} onChange={(e)=>setLocation(e.target.value)}>
            {Object.keys(INDIAN_CITIES).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="muted" style={{marginTop: 6}}>Distance to each shop is calculated from this city.</div>
        </div>
      </div>

      <label className="label" style={{marginTop: 18}}>Priority strategy</label>
      <div className="priority-grid">
        {opts.map(o => (
          <button type="button" key={o.v}
            className={"priority-card" + (priority === o.v ? " active" : "")}
            onClick={() => setPriority(o.v)}>
            <div className="t">{o.t}</div>
            <div className="d">{o.d}</div>
          </button>
        ))}
      </div>

      <div style={{marginTop: 18}}>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading && <span className="spinner" />} {loading ? "Computing..." : "Find best shop"}
        </button>
      </div>
    </form>
  );
}
