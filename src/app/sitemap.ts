import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";
import { siteUrl as base } from "@/lib/site-url";

export const dynamic = "force-static";

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
