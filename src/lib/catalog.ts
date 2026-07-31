import catalogJson from "@/data/products.json";
import type { Catalog, Category, Product, ServicePlan } from "./types";

const catalog = catalogJson as unknown as Catalog;

/**
 * The scraped data repeats some service plans — exact copies, or the same
 * interval+type at two prices (the differentiator, likely contract term, was
 * lost). Keep one entry per interval+type, at the cheapest price, so the
 * catalog cards and the detail page's plan picker always agree.
 */
function dedupePlans(p: Product): Product {
  if (!p.plans?.length) return p;
  const seen = new Map<string, ServicePlan>();
  for (const plan of p.plans) {
    const key = `${plan.interval}|${plan.type}`;
    const prev = seen.get(key);
    if (!prev || plan.pricePerMonth < prev.pricePerMonth) seen.set(key, plan);
  }
  return { ...p, plans: [...seen.values()] };
}

export const site = catalog.site;
export const categories = catalog.categories;
export const products = catalog.products.map(dedupePlans);
export const reviews = catalog.reviews;
export const faqs = catalog.faqs;

const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
const productBySlug = new Map(products.map((p) => [p.slug, p]));

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug);
}

export function getProduct(slug: string): Product | undefined {
  return productBySlug.get(slug);
}

export function featuredProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function productsInCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function relatedProducts(p: Product, limit = 4): Product[] {
  return products
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, limit);
}

/** Categories that actually have products (some are placeholders with count 0). */
export function nonEmptyCategories(): Category[] {
  return categories.filter((c) => c.productCount > 0);
}

/** Real product photo representing a category (first product with an image). */
export function categoryImage(categorySlug: string): string | undefined {
  return products.find((p) => p.category === categorySlug && p.image)?.image;
}

/**
 * Resolve a catalog image path. When imageBase is a remote origin it is
 * prefixed; when empty the path is served from /public as-is.
 */
export function imageSrc(path: string | undefined | null): string {
  if (!path) return "";
  return site.imageBase ? site.imageBase + path : path;
}

/** Slug of the product a variant links to, e.g. "/products/ac/art13a-12000btu/" → "art13a-12000btu". */
export function variantSlug(variantUrl: string): string {
  return variantUrl.replace(/\/$/, "").split("/").pop() ?? "";
}
