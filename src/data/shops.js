export const INDIAN_CITIES = {
  Mumbai:    { lat: 19.076,  lon: 72.8777 },
  Delhi:     { lat: 28.6139, lon: 77.209  },
  Bengaluru: { lat: 12.9716, lon: 77.5946 },
  Hyderabad: { lat: 17.385,  lon: 78.4867 },
  Chennai:   { lat: 13.0827, lon: 80.2707 },
  Kolkata:   { lat: 22.5726, lon: 88.3639 },
  Pune:      { lat: 18.5204, lon: 73.8567 },
  Ahmedabad: { lat: 23.0225, lon: 72.5714 },
  Jaipur:    { lat: 26.9124, lon: 75.7873 },
  Lucknow:   { lat: 26.8467, lon: 80.9462 },
};

export const shops = [
  { name: "Reliance Digital",  city: "Mumbai",    lat: 19.076,  lon: 72.8777, price: 8499, distance: 1.2, stock: true,  rating: 4.5 },
  { name: "Croma Electronics", city: "Pune",      lat: 18.5204, lon: 73.8567, price: 7649, distance: 3.5, stock: true,  rating: 3.8 },
  { name: "Vijay Sales",       city: "Delhi",     lat: 28.6139, lon: 77.209,  price: 8075, distance: 0.8, stock: true,  rating: 4.7 },
  { name: "Sangeetha Mobiles", city: "Bengaluru", lat: 12.9716, lon: 77.5946, price: 8925, distance: 2.0, stock: true,  rating: 4.2 },
  { name: "Poorvika",          city: "Chennai",   lat: 13.0827, lon: 80.2707, price: 7480, distance: 5.0, stock: false, rating: 4.0 },
  { name: "Bajaj Electronics", city: "Hyderabad", lat: 17.385,  lon: 78.4867, price: 9350, distance: 1.5, stock: true,  rating: 4.8 },
];

export function haversineKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatINR(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}
