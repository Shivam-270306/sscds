import { formatINR } from "../data/shops.js";

export default function ShopTable({ rows, bestName }) {
  return (
    <div className="card" style={{padding: 0}}>
      <div className="table-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Shop</th>
              <th>City</th>
              <th className="r">Price</th>
              <th className="r">Distance</th>
              <th className="r">Rating</th>
              <th>Badges</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className={r.name === bestName ? "best" : ""}>
                <td><strong>{r.name}</strong></td>
                <td className="muted">{r.city}</td>
                <td className="r">{formatINR(r.price)}</td>
                <td className="r">{r.distance.toFixed(1)} km</td>
                <td className="r">{r.rating.toFixed(1)} ★</td>
                <td>{r.badges.map((b) => <span key={b} className="badge" style={{marginRight:4}}>{b}</span>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
