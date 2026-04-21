import { useParams, Navigate, Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import StrategyDetail from "../components/StrategyDetail.jsx";
import { STRATEGIES } from "../data/strategies.js";

export default function StrategyPage() {
  const { key } = useParams();
  if (!STRATEGIES[key]) return <Navigate to="/strategies" replace />;
  return (
    <AppShell>
      <div className="container section">
        <Link to="/strategies" className="muted" style={{fontSize: 13}}>← Back to all strategies</Link>
        <div style={{marginTop: 12}}>
          <StrategyDetail strategyKey={key} />
        </div>
      </div>
    </AppShell>
  );
}
