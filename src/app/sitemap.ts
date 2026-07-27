import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";

export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = ["", "/products", "/calculator", "/careship", "/faq"].map(
    (path) => ({
      url: `${base}${path}/`,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    }),
  );
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.slug}/`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));
  return [...staticPages, ...productPages];
}
