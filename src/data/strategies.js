export const STRATEGIES = {
  cheapest: {
    key: "cheapest",
    title: "Cheapest Strategy",
    tagline: "Maximise savings — price dominates the score.",
    description:
      "The Cheapest strategy puts 60% of the decision weight on price. It is built for budget-sensitive buyers — bulk procurers, students, small kirana shops — who can absorb a longer trip or slightly lower service quality if it means a meaningfully smaller bill. Distance, stock and rating still influence the ranking, but only as tiebreakers.",
    weights: { price: 0.6, distance: 0.15, avail: 0.1, rating: 0.15 },
    bestFor: [
      "Bulk household purchases (Diwali, wedding, festive stocking)",
      "Price-sensitive Tier-2 / Tier-3 buyers",
      "Reseller and kirana sourcing",
    ],
    tradeoffs: [
      "May recommend a shop several km away to save ₹500",
      "Lower-rated sellers can win if their price is dramatically lower",
      "Delivery fuel cost is not modelled — factor it in for very far shops",
    ],
    formula: "score = 0.60·pricẽ + 0.15·distancẽ + 0.10·(1/stock)̃ + 0.15·(1/rating)̃",
    example:
      "If Poorvika (Chennai) lists a phone at ₹7,480 vs Bajaj Electronics (Hyderabad) at ₹9,350, the Cheapest strategy will pick Poorvika even when the buyer is closer to Hyderabad — the ₹1,870 saving outweighs the distance penalty.",
  },
  nearest: {
    key: "nearest",
    title: "Nearest Strategy",
    tagline: "Fastest fulfilment — distance dominates the score.",
    description:
      "The Nearest strategy weights distance at 60%, ideal when you need the product today — a charger before a flight, medicine, an emergency replacement. It minimises travel time, fuel cost and delivery ETA. Price still matters (15%) so the engine will not pick a wildly overpriced corner shop unless it is dramatically closer than every alternative.",
    weights: { price: 0.15, distance: 0.6, avail: 0.1, rating: 0.15 },
    bestFor: [
      "Same-day or hyperlocal delivery (Blinkit / Zepto-style needs)",
      "Emergency purchases (medicine, charger, last-minute gifts)",
      "Buyers with limited transport access",
    ],
    tradeoffs: [
      "You may pay a 5–15% premium versus the cheapest option",
      "Less optimal for high-ticket items where price gap > travel cost",
    ],
    formula: "score = 0.15·pricẽ + 0.60·distancẽ + 0.10·(1/stock)̃ + 0.15·(1/rating)̃",
    example:
      "A buyer in Mumbai needs a USB-C cable in 30 minutes. Reliance Digital (1.2 km) wins over Vijay Sales in Delhi even though Delhi's price is lower — the time saved is worth more than ₹400.",
  },
  balanced: {
    key: "balanced",
    title: "Balanced Strategy",
    tagline: "All four factors weighted equally — the safe default.",
    description:
      "The Balanced strategy splits weight 25/25/25/25 across price, distance, availability and rating. It is the recommended default for most everyday Indian shoppers — neither chasing the absolute lowest price nor the closest store, but optimising overall value. Use this when you have no strong preference or are buying for a household where every factor matters a little.",
    weights: { price: 0.25, distance: 0.25, avail: 0.25, rating: 0.25 },
    bestFor: [
      "Everyday electronics, appliances, groceries",
      "First-time users exploring the system",
      "Buyers who value reviews and service as much as price",
    ],
    tradeoffs: [
      "Rarely the absolute cheapest or absolute closest",
      "Harder to explain in one line — the winner reflects four factors",
    ],
    formula: "score = 0.25·pricẽ + 0.25·distancẽ + 0.25·(1/stock)̃ + 0.25·(1/rating)̃",
    example:
      "For a mid-range smartphone, Balanced often picks Vijay Sales or Reliance Digital — both reasonably priced, well-rated, and in major metros — instead of the absolute cheapest in a far city.",
  },
};
