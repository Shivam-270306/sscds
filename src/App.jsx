import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Strategies from "./pages/Strategies.jsx";
import StrategyPage from "./pages/StrategyPage.jsx";
import InsightsLatest from "./pages/InsightsLatest.jsx";
import InsightDetailPage from "./pages/InsightDetailPage.jsx";
import InsightsHistory from "./pages/InsightsHistory.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/strategies" element={<Strategies />} />
      <Route path="/strategies/:key" element={<StrategyPage />} />

      <Route path="/insights" element={<InsightsLatest />} />
      <Route path="/insights/history" element={<InsightsHistory />} />
      <Route path="/insights/:id" element={<InsightDetailPage />} />

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
