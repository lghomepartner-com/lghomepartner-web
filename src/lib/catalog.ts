import catalogJson from "@/data/products.json";
import type { Catalog, Category, Product } from "./types";

const catalog = catalogJson as unknown as Catalog;

export const site = catalog.site;
export const categories = catalog.categories;
export const products = catalog.products;
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
