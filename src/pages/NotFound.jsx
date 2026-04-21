import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";

export default function NotFound() {
  return (
    <AppShell>
      <div className="container-narrow section" style={{textAlign:"center"}}>
        <h1 style={{fontSize: 64, margin: 0}}>404</h1>
        <p className="muted" style={{marginTop: 8}}>Page not found.</p>
        <Link to="/" className="btn btn-primary" style={{marginTop: 16}}>Go home</Link>
      </div>
    </AppShell>
  );
}
