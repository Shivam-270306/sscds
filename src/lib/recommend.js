import { shops, INDIAN_CITIES, haversineKm, formatINR } from "../data/shops.js";
import { STRATEGIES } from "../data/strategies.js";

function normalize(values) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v) => (v - min) / span);
}

export function compute(product, priority, location) {
  const origin = INDIAN_CITIES[location] || INDIAN_CITIES.Mumbai;
  const inStock = shops
    .filter((s) => s.stock)
    .map((s) => ({ ...s, distance: haversineKm(origin, { lat: s.lat, lon: s.lon }) }));

  const w = STRATEGIES[priority].weights;

  const prices    = normalize(inStock.map((s) => s.price));
  const distances = normalize(inStock.map((s) => s.distance));
  const availInv  = normalize(inStock.map((s) => 1 / (s.stock ? 1 : 0.001)));
  const ratingInv = normalize(inStock.map((s) => 1 / s.rating));

  const cheapest  = [...inStock].sort((a, b) => a.price - b.price)[0];
  const closest   = [...inStock].sort((a, b) => a.distance - b.distance)[0];
  const bestRated = [...inStock].sort((a, b) => b.rating - a.rating)[0];

  const scoredRaw = inStock.map((s, i) => {
    const contrib = {
      price:    w.price    * prices[i],
      distance: w.distance * distances[i],
      avail:    w.avail    * availInv[i],
      rating:   w.rating   * ratingInv[i],
    };
    const score = contrib.price + contrib.distance + contrib.avail + contrib.rating;
    return { s, i, score, contrib };
  });

  const minScore = Math.min(...scoredRaw.map((r) => r.score));
  const maxScore = Math.max(...scoredRaw.map((r) => r.score));
  const span = maxScore - minScore || 1;

  const ranked = scoredRaw
    .map(({ s, score, contrib }) => {
      const badges = [];
      if (s.name === cheapest.name)  badges.push("Cheapest");
      if (s.name === closest.name)   badges.push("Closest");
      if (s.name === bestRated.name) badges.push("Best Rated");
      return {
        ...s,
        score,
        scoreNorm: 1 - (score - minScore) / span, // 1 = best
        badges,
        contrib,
      };
    })
    .sort((a, b) => a.score - b.score);

  const best = ranked[0];
  const reasons = [];
  if (best.name === cheapest.name)  reasons.push(`offers the lowest price (${formatINR(best.price)})`);
  if (best.name === closest.name)   reasons.push(`is the closest to ${location} (${best.distance.toFixed(1)} km)`);
  if (best.name === bestRated.name) reasons.push(`has the highest rating (${best.rating.toFixed(1)}★)`);
  if (reasons.length === 0) reasons.push("has the strongest balance across all factors");

  const focus =
    priority === "cheapest" ? "you prioritized lowest price"
      : priority === "nearest" ? "you prioritized shortest distance from " + location
      : "you chose a balanced strategy";

  const explanation = `${best.name} (${best.city}) ${reasons.join(" and ")}. Since ${focus}, the weighted score (${best.score.toFixed(3)}) ranked it #1 out of ${ranked.length} in-stock shops.`;

  return {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
    product: (product || "").trim() || "Unnamed product",
    location,
    priority,
    ranked,
    best,
    explanation,
  };
}

// ===== History store =====
const KEY = "sscds_history_v1";
const MAX = 25;

export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}

export function saveRecommendation(rec) {
  const list = loadHistory();
  const next = [rec, ...list.filter((r) => r.id !== rec.id)].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("sscds:history"));
}

export function getRecommendation(id) {
  return loadHistory().find((r) => r.id === id);
}

export function clearHistory() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("sscds:history"));
}
