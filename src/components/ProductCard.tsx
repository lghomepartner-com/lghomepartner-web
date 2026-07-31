import Link from "next/link";
import { getCategory, imageSrc } from "@/lib/catalog";
import { discountPct, formatBaht, priceRange } from "@/lib/pricing";
import type { Product } from "@/lib/types";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  const range = priceRange(product);
  const pct = discountPct(product);
  const cat = getCategory(product.category);
  const choices = (product.plans ?? []).length || (product.variants ?? []).length;

  return (
    <Link className="p-card" href={`/products/${encodeURIComponent(product.slug)}`}>
      <div className="img-wrap">
        <ProductImage
          src={imageSrc(product.image)}
          alt={product.name}
          fallbackEmoji={cat?.emoji ?? "📦"}
          loading="lazy"
        />
        {pct !== null && <span className="badge">-{pct}%</span>}
        {product.featured && <span className="badge featured">แนะนำ</span>}
      </div>
      <div className="body">
        <div className="cat">{cat?.nameTh ?? product.category}</div>
        <h3>{product.name}</h3>
        <div className="meta">
          ประกัน {product.warranty || "5 ปี"} · ดูแล{product.serviceInterval || ""}
        </div>
        {product.features[0] && <div className="meta">{product.features[0]}</div>}
        <div className="price-row">
          <span className="price">{formatBaht(range.min)}</span>
          {range.max !== null && <span className="price-max">– {formatBaht(range.max)}</span>}
          <span className="unit">/เดือน</span>
          {pct !== null && product.monthlyPrice && (
            <span className="was-price">{formatBaht(product.monthlyPrice)}</span>
          )}
        </div>
        {choices > 1 ? (
          <div className="plans-note">{choices} แผนให้เลือก</div>
        ) : (
          product.promoLabel && <div className="plans-note">{product.promoLabel}</div>
        )}
      </div>
    </Link>
  );
}
