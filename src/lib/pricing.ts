import type { Product } from "./types";

export function formatBaht(n: number): string {
  return "฿" + Number(n).toLocaleString("en-US");
}

/** Monthly price actually charged today: promo if running, else regular. */
export function effectivePrice(p: Product): number {
  return p.promoPrice ?? p.price ?? p.monthlyPrice;
}

export interface PriceRange {
  min: number;
  /** null when there is a single price (no more-expensive plan). */
  max: number | null;
}

/** Cheapest and most expensive monthly price across the product's service plans. */
export function priceRange(p: Product): PriceRange {
  const planPrices = (p.plans ?? []).map((x) => x.pricePerMonth).filter(Boolean);
  const base = effectivePrice(p);
  if (!planPrices.length) return { min: base, max: null };
  const min = Math.min(base, ...planPrices);
  const max = Math.max(...planPrices);
  return { min, max: max > min ? max : null };
}

/** Percent saved by the current promo, or null when no promo is running. */
export function discountPct(p: Product): number | null {
  if (p.promoPrice && p.monthlyPrice && p.monthlyPrice > p.promoPrice) {
    return Math.round((1 - p.promoPrice / p.monthlyPrice) * 100);
  }
  return null;
}

/** How many leading months the promo price applies, parsed from "ลด 50% 6 เดือนแรก". */
export function promoMonths(p: Product): number {
  const m = /(\d+)\s*เดือนแรก/.exec(p.promoLabel ?? "");
  return m ? Number(m[1]) : 0;
}

export interface SubscribeTotal {
  months: number;
  total: number;
  promoMonths: number;
  promo: number;
  normal: number;
}

/** Total cost over the whole contract: promo months at promo price, the rest at regular. */
export function subscribeTotal(p: Product): SubscribeTotal {
  const months = p.contractMonths || 60;
  const normal = p.monthlyPrice || p.price || 0;
  const promo = p.promoPrice ?? normal;
  const pm = promoMonths(p);
  return { months, total: promo * pm + normal * (months - pm), promoMonths: pm, promo, normal };
}

/** Index of the cheapest plan — the default selection on the detail page. */
export function cheapestPlanIndex(p: Product): number {
  const plans = p.plans ?? [];
  if (!plans.length) return -1;
  return plans.reduce((best, x, i) => (x.pricePerMonth < plans[best].pricePerMonth ? i : best), 0);
}
