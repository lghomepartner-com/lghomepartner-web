"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories, getCategory, products, site } from "@/lib/catalog";
import { discountPct, priceRange } from "@/lib/pricing";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

interface BudgetOption {
  id: string;
  label: string;
  matches: (pricePerMonth: number) => boolean;
}

const BUDGETS: BudgetOption[] = [
  { id: "all", label: "ทุกงบ", matches: () => true },
  { id: "b300", label: "≤ ฿300/ด.", matches: (n) => n <= 300 },
  { id: "b500", label: "฿301–500/ด.", matches: (n) => n >= 301 && n <= 500 },
  { id: "b800", label: "฿501–800/ด.", matches: (n) => n >= 501 && n <= 800 },
  { id: "b801", label: "฿801+/ด.", matches: (n) => n >= 801 },
];

type SortOption = "featured" | "priceAsc" | "priceDesc" | "discount";

function sortProducts(list: Product[], sortBy: SortOption): Product[] {
  const sorted = [...list];
  switch (sortBy) {
    case "priceAsc":
      return sorted.sort((a, b) => priceRange(a).min - priceRange(b).min);
    case "priceDesc":
      return sorted.sort((a, b) => priceRange(b).min - priceRange(a).min);
    case "discount":
      return sorted.sort((a, b) => (discountPct(b) ?? 0) - (discountPct(a) ?? 0));
    default:
      return sorted.sort(
        (a, b) =>
          Number(b.featured ?? false) - Number(a.featured ?? false) ||
          (discountPct(b) ?? 0) - (discountPct(a) ?? 0),
      );
  }
}

export default function CatalogBrowser() {
  const searchParams = useSearchParams();
  const [activeCat, setActiveCat] = useState(searchParams.get("category") ?? "all");
  const [term, setTerm] = useState("");
  const [budget, setBudget] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const list = useMemo(() => {
    let result = products;
    if (activeCat !== "all") result = result.filter((p) => p.category === activeCat);
    const budgetOption = BUDGETS.find((b) => b.id === budget);
    if (budgetOption && budget !== "all") {
      result = result.filter((p) => budgetOption.matches(priceRange(p).min));
    }
    const t = term.trim().toLowerCase();
    if (t) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(t) ||
          p.features.some((f) => f.toLowerCase().includes(t)) ||
          (getCategory(p.category)?.nameTh ?? "").toLowerCase().includes(t),
      );
    }
    return sortProducts(result, sortBy);
  }, [activeCat, term, budget, sortBy]);

  function selectCategory(slug: string) {
    setActiveCat(slug);
    // Keep the URL shareable without triggering a navigation.
    window.history.replaceState(null, "", slug === "all" ? "/products" : `/products?category=${slug}`);
  }

  function resetFilters() {
    selectCategory("all");
    setTerm("");
    setBudget("all");
  }

  const activeCategory = getCategory(activeCat);

  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="kicker">Products</div>
          <h1>{activeCategory ? activeCategory.nameTh : "สินค้าทั้งหมด"}</h1>
          <p>ทุกรุ่นติดตั้งฟรี ดูแลฟรีตลอดสัญญา — เลือกหมวดหรือค้นหารุ่นที่สนใจ แล้วทักไลน์สอบถามได้เลย</p>
          <div className="filter-bar">
            <button
              className={`filter-chip${activeCat === "all" ? " active" : ""}`}
              aria-pressed={activeCat === "all"}
              onClick={() => selectCategory("all")}
            >
              ทั้งหมด ({products.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                className={`filter-chip${activeCat === c.slug ? " active" : ""}`}
                aria-pressed={activeCat === c.slug}
                onClick={() => selectCategory(c.slug)}
              >
                {c.nameTh} ({c.productCount})
              </button>
            ))}
          </div>
          <div className="control-row">
            <label>งบต่อเดือน:</label>
            <div className="filter-bar" style={{ margin: 0 }}>
              {BUDGETS.map((b) => (
                <button
                  key={b.id}
                  className={`filter-chip${budget === b.id ? " active" : ""}`}
                  aria-pressed={budget === b.id}
                  onClick={() => setBudget(b.id)}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
          <div className="control-row">
            <label htmlFor="sort-select">เรียงตาม:</label>
            <select
              id="sort-select"
              className="select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="featured">แนะนำ</option>
              <option value="priceAsc">ราคาต่ำ → สูง</option>
              <option value="priceDesc">ราคาสูง → ต่ำ</option>
              <option value="discount">ส่วนลดสูงสุด</option>
            </select>
            <input
              type="search"
              className="search-input"
              placeholder="ค้นหารุ่น เช่น DUALCOOL, 18000 BTU…"
              aria-label="ค้นหาสินค้า"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <section style={{ paddingTop: 26 }}>
        <div className="container">
          <div className="result-count">พบ {list.length} รุ่น</div>
          {list.length > 0 ? (
            <div className="product-grid">
              {list.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div style={{ fontSize: 44 }}>🔍</div>
              <p className="mt-2">
                ไม่พบสินค้าที่ค้นหา — ลองเปลี่ยนคำค้น ล้างตัวกรอง หรือทักไลน์ถามทีมงานได้เลย
              </p>
              <div
                className="mt-2"
                style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
              >
                <button className="btn btn-outline" onClick={resetFilters}>
                  ล้างตัวกรองทั้งหมด
                </button>
                <a className="btn btn-line" href={site.line} target="_blank" rel="noopener">
                  <img className="line-dot" src="/line-icon.svg" alt="" /> สอบถามทาง LINE
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
