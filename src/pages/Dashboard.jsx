import { useEffect, useState } from "react";
import AppShell from "../components/AppShell.jsx";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { loadHistory } from "../lib/recommend.js";
import { shops, formatINR } from "../data/shops.js";
import { STRATEGIES } from "../data/strategies.js";

const tooltipStyle = { background: "#151b32", border: "1px solid #232a47", borderRadius: 8, fontSize: 12, color: "#e8ecf8" };
const COLORS = ["#6366f1", "#22d3ee", "#f59e0b", "#10b981", "#ef4444", "#a78bfa"];

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const refresh = () => setHistory(loadHistory());
    refresh();
    window.addEventListener("sscds:history", refresh);
    return () => window.removeEventListener("sscds:history", refresh);
  }, []);

  const priceData = shops.map(s => ({ name: s.name.split(" ")[0], price: s.price }));
  const ratingData = shops.map(s => ({ name: s.name.split(" ")[0], rating: s.rating }));

  // Recommendation distribution from history
  const stratCount = { cheapest: 0, nearest: 0, balanced: 0 };
  history.forEach(r => { stratCount[r.priority] = (stratCount[r.priority] || 0) + 1; });
  const stratData = Object.entries(stratCount).map(([k, v]) => ({ name: STRATEGIES[k].title.replace(" Strategy",""), value: v }));

  return (
    <AppShell>
      <div className="container section">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Visual overview of the Indian shop catalog and your recommendation history.</p>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h3 style={{margin: 0}}>Price comparison (₹)</h3>
            <div className="muted">Across all shops in the catalog</div>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#232a47" />
                  <XAxis dataKey="name" stroke="#8b94b3" fontSize={12} />
                  <YAxis stroke="#8b94b3" fontSize={12} tickFormatter={(v) => `₹${(v/1000).toFixed(1)}k`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatINR(v)} />
                  <Bar dataKey="price" fill="#6366f1" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3 style={{margin: 0}}>Ratings</h3>
            <div className="muted">Customer satisfaction per retailer</div>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ratingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#232a47" />
                  <XAxis dataKey="name" stroke="#8b94b3" fontSize={12} />
                  <YAxis stroke="#8b94b3" fontSize={12} domain={[0,5]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="rating" fill="#22d3ee" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card" style={{marginTop: 20}}>
          <h3 style={{margin: 0}}>Your recommendation history</h3>
          <div className="muted">Distribution of strategies you have run on this device</div>
          {history.length === 0 ? (
            <div className="empty" style={{marginTop: 16}}>No searches yet. Run one from the Home page.</div>
          ) : (
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stratData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {stratData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{fontSize:12, color:"#8b94b3"}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
