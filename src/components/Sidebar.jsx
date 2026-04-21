import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();
  const close = () => onClose();
  return (
    <>
      <div className="sidebar-overlay" onClick={close} />
      <aside className="sidebar">
        <div className="spread" style={{marginBottom: 8}}>
          <Link to="/" onClick={close} className="brand">
            <span className="brand-mark">S</span><span>SmartSupply<small>IN</small></span>
          </Link>
          <button className="menu-btn" onClick={close} aria-label="Close">✕</button>
        </div>
        <Link to="/home" onClick={close} className="sidebar-link">🏠 Home</Link>
        <Link to="/dashboard" onClick={close} className="sidebar-link">📊 Dashboard</Link>

        <h4>Strategies</h4>
        <Link to="/strategies" onClick={close} className="sidebar-link">📚 Compare all</Link>
        <Link to="/strategies/cheapest" onClick={close} className="sidebar-link">💰 Cheapest</Link>
        <Link to="/strategies/nearest" onClick={close} className="sidebar-link">📍 Nearest</Link>
        <Link to="/strategies/balanced" onClick={close} className="sidebar-link">⚖️ Balanced</Link>

        <h4>Insights</h4>
        <Link to="/insights" onClick={close} className="sidebar-link">✨ Why this shop</Link>
        <Link to="/insights/history" onClick={close} className="sidebar-link">🕘 Search history</Link>

        <div className="sidebar-divider" />
        {user ? (
          <button className="sidebar-link" style={{width:"100%", textAlign:"left", background:"transparent", border:0}} onClick={() => { logout(); close(); }}>
            ↩ Logout
          </button>
        ) : (
          <>
            <Link to="/login" onClick={close} className="sidebar-link">→ Login</Link>
            <Link to="/signup" onClick={close} className="sidebar-link">＋ Sign up</Link>
          </>
        )}
      </aside>
    </>
  );
}
