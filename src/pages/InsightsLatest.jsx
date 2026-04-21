import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import InsightDetail from "../components/InsightDetail.jsx";
import HistoryList from "../components/HistoryList.jsx";
import { loadHistory } from "../lib/recommend.js";

export default function InsightsLatest() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const refresh = () => setHistory(loadHistory());
    refresh();
    window.addEventListener("sscds:history", refresh);
    return () => window.removeEventListener("sscds:history", refresh);
  }, []);

  const latest = history[0];

  if (!latest) {
    return (
      <AppShell>
        <div className="container-narrow section" style={{textAlign:"center"}}>
          <div className="brand-mark" style={{margin:"0 auto 16px", width:56, height:56, fontSize:24}}>✨</div>
          <h1>No insights yet</h1>
          <p className="muted" style={{maxWidth:520, margin:"8px auto 20px"}}>
            Run a recommendation on the Home page to unlock a full analytical breakdown of why a particular Indian shop was picked for you.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/home")}>Find a shop</button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="container section">
        <div className="spread page-header">
          <div>
            <div className="eyebrow">Latest insight</div>
            <h1 style={{margin:"4px 0 0"}}>Why this shop?</h1>
            <p>Detailed reasoning, weight breakdown and comparison for your most recent search.</p>
          </div>
          <Link to="/insights/history" className="btn btn-outline btn-sm">🕘 All searches ({history.length})</Link>
        </div>

        <InsightDetail rec={latest} />

        {history.length > 1 && (
          <div style={{marginTop: 32}}>
            <h2 style={{margin: "0 0 12px"}}>Previous searches</h2>
            <HistoryList items={history.slice(1, 6)} />
          </div>
        )}
      </div>
    </AppShell>
  );
}
