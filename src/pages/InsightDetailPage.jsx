import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import InsightDetail from "../components/InsightDetail.jsx";
import { getRecommendation } from "../lib/recommend.js";

export default function InsightDetailPage() {
  const { id } = useParams();
  const [rec, setRec] = useState(undefined);

  useEffect(() => {
    setRec(getRecommendation(id) || null);
  }, [id]);

  if (rec === undefined) {
    return (
      <AppShell>
        <div className="container section" style={{textAlign:"center", color:"var(--muted)"}}>Loading insight…</div>
      </AppShell>
    );
  }

  if (rec === null) {
    return (
      <AppShell>
        <div className="container-narrow section" style={{textAlign:"center"}}>
          <h1>Insight not found</h1>
          <p className="muted">This recommendation may have been cleared from local storage.</p>
          <Link to="/insights" className="btn btn-primary" style={{marginTop: 16}}>Back to insights</Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="container section">
        <Link to="/insights" className="muted" style={{fontSize: 13}}>← Back to latest insight</Link>
        <div className="page-header" style={{marginTop: 12}}>
          <div className="eyebrow">Saved insight</div>
          <h1>Why "{rec.product}" → {rec.best.name}?</h1>
          <p>Searched from {rec.location} · {new Date(rec.createdAt).toLocaleString("en-IN")}</p>
        </div>
        <InsightDetail rec={rec} />
      </div>
    </AppShell>
  );
}
