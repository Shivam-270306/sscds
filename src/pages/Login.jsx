import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");
    const r = login(email.trim(), pw);
    if (!r.ok) { setErr(r.error); return; }
    alert("Logged in!");
    navigate("/home");
  };

  return (
    <AppShell>
      <div className="auth-wrap">
        <div className="card auth-card">
          <h2>Welcome back</h2>
          <p className="sub">Login is optional — you can use the app without it.</p>
          <form className="auth-form" onSubmit={onSubmit}>
            {err && <div className="alert">{err}</div>}
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" required value={pw} onChange={(e)=>setPw(e.target.value)} />
            </div>
            <button className="btn btn-primary" type="submit">Login</button>
            <div className="muted" style={{textAlign:"center"}}>
              No account? <Link to="/signup" style={{color:"#a5b4fc"}}>Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
