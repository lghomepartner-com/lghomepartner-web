import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategory,
  getProduct,
  imageSrc,
  products,
  relatedProducts,
  site,
  variantSlug,
} from "@/lib/catalog";
import { siteUrl } from "@/lib/site-url";
import { discountPct, effectivePrice, formatBaht } from "@/lib/pricing";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "./ProductGallery";
import PlanAndPrice from "./PlanAndPrice";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${formatBaht(effectivePrice(p))}/เดือน — LG Subscribe Thailand`,
    description: p.description,
    alternates: { canonical: `/products/${p.slug}/` },
    openGraph: { images: p.image ? [imageSrc(p.image)] : [] },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const cat = getCategory(p.category);
  const pct = discountPct(p);
  const related = relatedProducts(p);
  const variants = p.variants ?? [];

  // Product + BreadcrumbList rich-result markup. The offer is the monthly
  // subscription price, so priceCurrency/price describe one month.
  const cover = imageSrc(p.image);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: cover ? [cover.startsWith("/") ? `${siteUrl}${cover}` : cover] : undefined,
    brand: { "@type": "Brand", name: "LG" },
    category: cat?.nameTh ?? p.category,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${p.slug}/`,
      price: effectivePrice(p),
      priceCurrency: "THB",
      availability: "https://schema.org/InStock",
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าหลัก", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "สินค้าทั้งหมด", item: `${siteUrl}/products/` },
      { "@type": "ListItem", position: 3, name: p.name },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">หน้าหลัก</Link> / <Link href="/products">สินค้าทั้งหมด</Link> /{" "}
          <Link href={`/products?category=${p.category}`}>{cat?.nameTh ?? p.category}</Link> /{" "}
          {p.name}
        </div>
        <div className="detail-grid">
          <ProductGallery
            name={p.name}
            gallery={(p.gallery.length ? p.gallery : p.image ? [p.image] : []).map(imageSrc)}
            fallbackEmoji={cat?.emoji ?? "📦"}
            discountPct={pct}
            featured={p.featured ?? false}
          />
          <div className="detail-info">
            <div className="cat-line">
              {cat?.emoji ?? ""} {cat?.nameTh ?? p.category}
            </div>
            <h1>{p.name}</h1>
            <div className="model">รุ่น {p.specs["รุ่น"] ?? p.slug}</div>
            {variants.length > 0 && (
              <div className="opt-group">
                <h3>เลือกขนาด</h3>
                <div className="opt-row">
                  {variants.map((v) => {
                    const active = v.url === p.url;
                    return (
                      <Link
                        key={v.url}
                        className={`opt${active ? " active" : ""}`}
                        href={`/products/${encodeURIComponent(variantSlug(v.url))}`}
                      >
                        <b>{v.label}</b>
                        <small>{formatBaht(v.pricePerMonth)}/ด.</small>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            <PlanAndPrice product={p} site={site} />
            <div className="stat-tiles">
              <div className="stat-tile red">
                <div className="lb">สัญญา</div>
                <div className="vl">{p.contract || "-"}</div>
              </div>
              <div className="stat-tile green">
                <div className="lb">รอบบริการ</div>
                <div className="vl">{p.serviceInterval || "-"}</div>
              </div>
              <div className="stat-tile red">
                <div className="lb">ประกัน</div>
                <div className="vl">{p.warranty || "-"}</div>
              </div>
              <div className="stat-tile">
                <div className="lb">รวมตลอดสัญญา</div>
                <div className="vl">{p.totalContractValue || "-"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-sections">
          <div className="inner-grid">
            <div>
              {p.features.length > 0 && (
                <div className="card-box">
                  <h2>คุณสมบัติเด่น</h2>
                  <ul className="feature-list">
                    {p.features.map((f) => (
                      <li key={f}>
                        <span className="check">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(p.technologies ?? []).length > 0 && (
                <div className="card-box">
                  <h2>เทคโนโลยีที่ควรรู้</h2>
                  <ul className="tech-list">
                    {p.technologies!.map((t) => (
                      <li key={t.name}>
                        <span className="dot"></span>
                        <span>
                          <b>{t.name}</b> — {t.detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="card-box">
                <h2>Subscribe vs ซื้อขาด</h2>
                <table className="compare-table">
                  <tbody>
                    <tr>
                      <th>รายการ</th>
                      <th className="sub">Subscribe</th>
                      <th>ซื้อขาด</th>
                    </tr>
                    <tr>
                      <td>ค่าใช้จ่ายวันแรก</td>
                      <td className="good">จ่ายงวดแรกเท่านั้น</td>
                      <td>จ่ายเต็มจำนวน</td>
                    </tr>
                    <tr>
                      <td>ติดตั้ง</td>
                      <td className="good">ฟรี</td>
                      <td>จ่ายเอง</td>
                    </tr>
                    <tr>
                      <td>ล้าง / บำรุงรักษา</td>
                      <td className="good">ฟรีตลอดสัญญา</td>
                      <td>จ่ายเองทุกครั้ง</td>
                    </tr>
                    <tr>
                      <td>ซ่อม / อะไหล่</td>
                      <td className="good">ฟรีตลอดสัญญา</td>
                      <td>จ่ายเองหลังหมดประกัน</td>
                    </tr>
                    <tr>
                      <td>ประกัน</td>
                      <td className="good">{p.warranty || "5 ปี"}</td>
                      <td>1–2 ปีตามผู้ผลิต</td>
                    </tr>
                    <tr>
                      <td>วงเงินบัตรเครดิต</td>
                      <td className="good">ไม่ล็อก ตัดรายเดือน</td>
                      <td>ผ่อน = ล็อกเต็มจำนวน</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              {Object.keys(p.specs).length > 0 && (
                <div className="card-box">
                  <h2>สเปคสินค้า</h2>
                  <table className="spec-table">
                    <tbody>
                      {Object.entries(p.specs).map(([k, v]) => (
                        <tr key={k}>
                          <td>{k}</td>
                          <td>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="card-box center">
                <div style={{ fontSize: 40 }}>{cat?.emoji ?? "📦"}</div>
                <h2 className="mt-2">สนใจรุ่นนี้?</h2>
                <p style={{ fontSize: 14 }}>
                  ทักไลน์บอกรุ่นที่สนใจ ทีมงานคำนวณราคา
                  <br />
                  และแนะนำแผนที่เหมาะกับบ้านคุณ
                </p>
                <a className="btn btn-line mt-2" href={site.line} target="_blank" rel="noopener">
                  <span className="line-dot">LINE</span> แอดไลน์สอบถามเลย
                </a>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section style={{ paddingTop: 0 }}>
            <div className="section-head">
              <div>
                <div className="kicker">Related</div>
                <h2>{cat?.nameTh ?? ""}รุ่นอื่นๆ</h2>
              </div>
              <Link className="see-all" href={`/products?category=${p.category}`}>
                ดูทั้งหมด →
              </Link>
            </div>
            <div className="product-grid cols-4">
              {related.map((x) => (
                <ProductCard key={x.slug} product={x} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
