import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);
const USERS = "sscds_users";
const SESSION = "sscds_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (u) => {
    setUser(u);
    if (u) localStorage.setItem(SESSION, JSON.stringify(u));
    else localStorage.removeItem(SESSION);
  };

  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS) || "[]");
    if (users.find((u) => u.email === email)) {
      return { ok: false, error: "Account already exists." };
    }
    const u = { email, password };
    users.push(u);
    localStorage.setItem(USERS, JSON.stringify(users));
    persist({ email });
    return { ok: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS) || "[]");
    const u = users.find((x) => x.email === email && x.password === password);
    if (!u) return { ok: false, error: "Invalid email or password." };
    persist({ email });
    return { ok: true };
  };

  const logout = () => persist(null);

  return (
    <AuthCtx.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
