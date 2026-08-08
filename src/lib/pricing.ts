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

/**
 * How many months the promo price applies, parsed from the label:
 * "ลด 50% 6 เดือนแรก" → 6, or a billing range "ลด 50% บิลที่ 2-8" → 7.
 */
export function promoMonths(p: Product): number {
  const label = p.promoLabel ?? "";
  const m = /(\d+)\s*เดือนแรก/.exec(label);
  if (m) return Number(m[1]);
  const r = /บิลที่\s*(\d+)\s*-\s*(\d+)/.exec(label);
  if (r) return Number(r[2]) - Number(r[1]) + 1;
  return 0;
}

/** Special first-bill price parsed from "บิลแรก ฿149" / "เดือนแรก ฿149", or null. */
export function firstBillPrice(p: Product): number | null {
  const m = /(?:บิลแรก|เดือนแรก)\s*฿?\s*([\d,]+)/.exec(p.promoLabel ?? "");
  return m ? Number(m[1].replace(/,/g, "")) : null;
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
  let total = promo * pm + normal * (months - pm);
  // a "บิลแรก ฿149" bill replaces one regular-priced month
  const first = firstBillPrice(p);
  if (first !== null && pm < months) total -= normal - first;
  return { months, total, promoMonths: pm, promo, normal };
}

/** Index of the cheapest plan — the default selection on the detail page. */
export function cheapestPlanIndex(p: Product): number {
  const plans = p.plans ?? [];
  if (!plans.length) return -1;
  return plans.reduce((best, x, i) => (x.pricePerMonth < plans[best].pricePerMonth ? i : best), 0);
}
