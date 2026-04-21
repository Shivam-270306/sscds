import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar({ onOpenSidebar }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const stratActive = pathname.startsWith("/strategies");
  const insightsActive = pathname.startsWith("/insights");

  return (
    <header className="nav">
      <div className="container nav-inner">
        <div className="row">
          <button className="menu-btn" onClick={onOpenSidebar} aria-label="Open menu">☰</button>
          <Link to="/" className="brand">
            <span className="brand-mark">S</span>
            <span>SmartSupply<small>IN</small></span>
          </Link>
        </div>

        <nav className="nav-links">
          <NavLink to="/home" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>Home</NavLink>
          <NavLink to="/dashboard" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>Dashboard</NavLink>

          <div className="dropdown">
            <NavLink to="/strategies" className={"nav-link" + (stratActive ? " active" : "")}>
              Strategies ▾
            </NavLink>
            <div className="dropdown-menu">
              <Link to="/strategies/cheapest" className="dropdown-item"><div className="t">Cheapest</div><div className="d">Lowest ₹ wins</div></Link>
              <Link to="/strategies/nearest" className="dropdown-item"><div className="t">Nearest</div><div className="d">Closest distance wins</div></Link>
              <Link to="/strategies/balanced" className="dropdown-item"><div className="t">Balanced</div><div className="d">All factors equally</div></Link>
              <div className="dropdown-divider" />
              <Link to="/strategies" className="dropdown-item"><div className="t" style={{color:"#a5b4fc"}}>Compare all strategies →</div></Link>
            </div>
          </div>

          <NavLink to="/insights" className={"nav-link" + (insightsActive ? " active" : "")}>
            Why this shop
          </NavLink>
        </nav>

        <div className="nav-actions">
          {user ? (
            <>
              <span className="muted" style={{marginRight: 6}}>{user.email}</span>
              <button className="btn btn-outline btn-sm" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
