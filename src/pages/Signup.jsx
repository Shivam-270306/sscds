import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");
    if (pw.length < 4) { setErr("Password must be at least 4 characters."); return; }
    const r = signup(email.trim(), pw);
    if (!r.ok) { setErr(r.error); return; }
    alert("Account created!");
    navigate("/home");
  };

  return (
    <AppShell>
      <div className="auth-wrap">
        <div className="card auth-card">
          <h2>Create your account</h2>
          <p className="sub">Sign up is optional — you can use the app without it.</p>
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
            <button className="btn btn-primary" type="submit">Sign up</button>
            <div className="muted" style={{textAlign:"center"}}>
              Already have an account? <Link to="/login" style={{color:"#a5b4fc"}}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
