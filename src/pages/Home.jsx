import { useMemo, useState } from "react";
import AppShell from "../components/AppShell.jsx";
import InputForm from "../components/InputForm.jsx";
import ResultCard from "../components/ResultCard.jsx";
import ShopTable from "../components/ShopTable.jsx";
import { compute, saveRecommendation } from "../lib/recommend.js";

export default function Home() {
  const [product, setProduct] = useState("");
  const [priority, setPriority] = useState("balanced");
  const [location, setLocation] = useState("Mumbai");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onSubmit = () => {
    if (!product.trim()) { alert("Please enter a product name."); return; }
    setLoading(true);
    setTimeout(() => {
      const rec = compute(product, priority, location);
      saveRecommendation(rec);
      setResult(rec);
      setLoading(false);
    }, 500);
  };

  const heading = useMemo(
    () => result ? `Best shop for "${product}" near ${location}` : "Find the optimal shop in India",
    [result, product, location]
  );

  return (
    <AppShell>
      <div className="container section">
        <div className="page-header">
          <h1>{heading}</h1>
          <p>Enter a product, pick your city, choose a strategy — get an explainable recommendation in ₹.</p>
        </div>

        <div className="grid">
          <InputForm
            product={product} setProduct={setProduct}
            priority={priority} setPriority={setPriority}
            location={location} setLocation={setLocation}
            onSubmit={onSubmit} loading={loading}
          />

          {result && (
            <div className="grid">
              <ResultCard shop={result.best} explanation={result.explanation} insightId={result.id} />
              <div>
                <h2 style={{margin: "8px 0 12px"}}>All shops compared</h2>
                <ShopTable rows={result.ranked} bestName={result.best.name} />
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
