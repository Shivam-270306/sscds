import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import HistoryList from "../components/HistoryList.jsx";
import { clearHistory, loadHistory } from "../lib/recommend.js";

export default function InsightsHistory() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const refresh = () => setHistory(loadHistory());
    refresh();
    window.addEventListener("sscds:history", refresh);
    return () => window.removeEventListener("sscds:history", refresh);
  }, []);

  return (
    <AppShell>
      <div className="container section">
        <Link to="/insights" className="muted" style={{fontSize: 13}}>← Back to latest insight</Link>
        <div className="spread page-header" style={{marginTop: 12}}>
          <div>
            <h1>All searches</h1>
            <p>{history.length === 0 ? "No searches saved yet." : `${history.length} recommendation${history.length === 1 ? "" : "s"} stored locally on this device.`}</p>
          </div>
          {history.length > 0 && (
            <button className="btn btn-danger btn-sm" onClick={() => { if (confirm("Delete all saved insights?")) clearHistory(); }}>
              🗑 Clear history
            </button>
          )}
        </div>

        {history.length === 0
          ? <div className="empty">Run a search on the Home page to start building your history.</div>
          : <HistoryList items={history} />}
      </div>
    </AppShell>
  );
}
