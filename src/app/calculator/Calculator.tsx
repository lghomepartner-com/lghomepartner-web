"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProduct, imageSrc, nonEmptyCategories, products, site } from "@/lib/catalog";
import { effectivePrice, formatBaht, subscribeTotal } from "@/lib/pricing";

/** Days per month used to convert contract totals to a per-day figure. */
const DAYS_PER_MONTH = 30.4;

interface BuyDefaults {
  install: number;
  maint: number;
  maintNote: string;
}

/** Default "buy outright" assumptions per category — editable by the rep. */
const BUY_DEFAULTS: Record<string, BuyDefaults> = {
  "air-conditioner": { install: 2500, maint: 1600, maintNote: "ล้างแอร์เอง ~2 ครั้ง/ปี" },
  "commercial-ac": { install: 4500, maint: 2400, maintNote: "ล้างใหญ่ ~2 ครั้ง/ปี" },
  "water-purifier": { install: 1500, maint: 1800, maintNote: "ไส้กรอง ~ปีละชุด" },
  "air-purifier": { install: 0, maint: 1200, maintNote: "แผ่นกรอง ~ปีละชุด" },
  refrigerator: { install: 0, maint: 500, maintNote: "ตรวจเช็ค/น้ำยา" },
  "washing-machine": { install: 500, maint: 800, maintNote: "ล้างถัง/ตรวจเช็ค" },
  dryer: { install: 500, maint: 600, maintNote: "ทำความสะอาด/เช็ค" },
  dishwasher: { install: 1200, maint: 900, maintNote: "เกลือ/ไส้กรอง" },
  dehumidifier: { install: 0, maint: 400, maintNote: "แผ่นกรอง/เช็ค" },
  vacuum: { install: 0, maint: 800, maintNote: "แบต/ไส้กรอง" },
  styler: { install: 500, maint: 600, maintNote: "ตรวจเช็คระบบ" },
};

const DEFAULT_BUY: BuyDefaults = { install: 0, maint: 400, maintNote: "บำรุงรักษาทั่วไป" };

function buyDefaultsFor(categorySlug: string): BuyDefaults {
  return BUY_DEFAULTS[categorySlug] ?? DEFAULT_BUY;
}

export default function Calculator() {
  const searchParams = useSearchParams();
  const preselected = getProduct(searchParams.get("slug") ?? "");

  const initialCat = preselected?.category ?? "air-conditioner";
  const [catSlug, setCatSlug] = useState(initialCat);
  const [productSlug, setProductSlug] = useState(
    () => preselected?.slug ?? products.find((p) => p.category === initialCat)?.slug ?? "",
  );
  const [buyPrice, setBuyPrice] = useState("");
  const [buyInstall, setBuyInstall] = useState(String(buyDefaultsFor(initialCat).install));
  const [buyMaint, setBuyMaint] = useState(String(buyDefaultsFor(initialCat).maint));

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === catSlug),
    [catSlug],
  );
  const product = getProduct(productSlug) ?? categoryProducts[0];
  const maintNote = buyDefaultsFor(catSlug).maintNote;

  function selectCategory(slug: string) {
    setCatSlug(slug);
    setProductSlug(products.find((p) => p.category === slug)?.slug ?? "");
    const d = buyDefaultsFor(slug);
    setBuyInstall(String(d.install));
    setBuyMaint(String(d.maint));
  }

  if (!product) return null;

  const s = subscribeTotal(product);
  const years = s.months / 12;
  const perDay = s.total / (s.months * DAYS_PER_MONTH);
  const buy = Number(buyPrice) || 0;
  const install = Number(buyInstall) || 0;
  const maintYr = Number(buyMaint) || 0;
  const buyTotal = buy + install + maintYr * years;
  const hasBuy = buy > 0;
  const maxTotal = Math.max(s.total, buyTotal, 1);

  const subItems = [
    "เครื่องใหม่ 100% พร้อมติดตั้งฟรี",
    `ล้าง / บำรุงรักษาฟรี ${product.serviceInterval || "ตามรอบ"}`,
    `ซ่อม + อะไหล่ฟรีตลอด ${product.contract || `${Math.round(years)} ปี`}`,
    `ประกัน ${product.warranty || "5 ปี"} — ซ่อมไม่ได้เปลี่ยนเครื่องใหม่`,
    "ไม่ล็อกวงเงินบัตร · ไม่มีเงินก้อนวันแรก",
  ];
  const buyItems = [
    `จ่ายก้อนใหญ่ตั้งแต่วันแรก ${hasBuy ? formatBaht(buy) : ""}`,
    `ค่าติดตั้ง ${formatBaht(install)}`,
    `ค่าดูแลเอง ~${formatBaht(maintYr)}/ปี × ${years.toFixed(0)} ปี = ${formatBaht(maintYr * years)}`,
    "ประกันมาตรฐาน 1–2 ปี หลังจากนั้นซ่อมเอง",
    "ผ่อน 0% = ล็อกวงเงินบัตรเต็มจำนวน",
  ];

  return (
    <section style={{ paddingTop: 32 }}>
      <div className="container calc-grid">
        <div className="calc-panel">
          <h3>1 · เลือกสินค้า</h3>
          <div className="field">
            <label htmlFor="calc-cat">หมวดสินค้า</label>
            <select id="calc-cat" value={catSlug} onChange={(e) => selectCategory(e.target.value)}>
              {nonEmptyCategories().map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.emoji} {c.nameTh}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="calc-product">รุ่น</label>
            <select
              id="calc-product"
              value={product.slug}
              onChange={(e) => setProductSlug(e.target.value)}
            >
              {categoryProducts.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} — {formatBaht(effectivePrice(p))}/ด.
                </option>
              ))}
            </select>
          </div>
          <div className="calc-product-preview">
            {product.image && <img src={imageSrc(product.image)} alt="" />}
            <div>
              <div className="nm">{product.name}</div>
              <div className="pr">
                {formatBaht(effectivePrice(product))}/เดือน
                {product.promoLabel ? ` · ${product.promoLabel}` : ""}
              </div>
            </div>
          </div>

          <h3 style={{ marginTop: 22 }}>2 · ฝั่งซื้อขาด (ปรับได้)</h3>
          <div className="field">
            <label htmlFor="calc-buy-price">
              ราคาซื้อขาดหน้าร้าน (฿) <span className="hint">— ใส่ราคาที่ลูกค้าเห็นมา</span>
            </label>
            <input
              type="number"
              id="calc-buy-price"
              min={0}
              step={100}
              placeholder="เช่น 18900"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="calc-buy-install">ค่าติดตั้ง (฿)</label>
            <input
              type="number"
              id="calc-buy-install"
              min={0}
              step={100}
              value={buyInstall}
              onChange={(e) => setBuyInstall(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="calc-buy-maint">ค่าดูแลเองต่อปี (฿)</label>
            <input
              type="number"
              id="calc-buy-maint"
              min={0}
              step={100}
              value={buyMaint}
              onChange={(e) => setBuyMaint(e.target.value)}
            />
            <div className="hint" style={{ marginTop: 5 }}>
              ค่าเริ่มต้น: {maintNote} — แก้ตัวเลขได้ตามจริง
            </div>
          </div>
        </div>

        <div>
          <div className="vs-grid">
            <div className="vs-card sub">
              {hasBuy && s.total < buyTotal && <span className="win-badge">คุ้มกว่า</span>}
              <div className="tag">LG Subscribe · {s.months} เดือน</div>
              <div className="total">{formatBaht(Math.round(s.total))}</div>
              <div className="per">
                {s.promoMonths
                  ? `${formatBaht(s.promo)} × ${s.promoMonths} ด.แรก + ${formatBaht(s.normal)} × ${s.months - s.promoMonths} ด.`
                  : `${formatBaht(s.normal)}/เดือน`}
              </div>
              <div className="perday-chip">
                เฉลี่ยวันละ <b>{formatBaht(Math.ceil(perDay))}</b>
              </div>
              <ul>
                {subItems.map((t) => (
                  <li key={t}>
                    <span className="y">✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="vs-card">
              <div className="tag">ซื้อขาด + ดูแลเอง · {Math.round(years)} ปี</div>
              <div className="total">{hasBuy ? formatBaht(Math.round(buyTotal)) : "— ใส่ราคาเครื่อง"}</div>
              <div className="per">
                {hasBuy
                  ? `เทียบเท่า ${formatBaht(Math.round(buyTotal / s.months))}/เดือน`
                  : "พิมพ์ราคาหน้าร้านในช่องซ้ายเพื่อเทียบ"}
              </div>
              {hasBuy && (
                <div className="perday-chip" style={{ background: "#6b7280" }}>
                  เฉลี่ยวันละ <b>{formatBaht(Math.ceil(buyTotal / (s.months * DAYS_PER_MONTH)))}</b>
                </div>
              )}
              <ul>
                {buyItems.map((t) => (
                  <li key={t}>
                    <span className="n">✗</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {hasBuy && (
            <div className="calc-panel" style={{ marginTop: 18 }}>
              <div className="bar-row">
                <div className="bar-label">
                  <span>LG Subscribe</span>
                  <span>{formatBaht(Math.round(s.total))}</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill red"
                    style={{ width: `${((s.total / maxTotal) * 100).toFixed(1)}%` }}
                  ></div>
                </div>
              </div>
              <div className="bar-row">
                <div className="bar-label">
                  <span>ซื้อขาด + ดูแลเอง</span>
                  <span>{formatBaht(Math.round(buyTotal))}</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill gray"
                    style={{ width: `${((buyTotal / maxTotal) * 100).toFixed(1)}%` }}
                  ></div>
                </div>
              </div>
              {buyTotal > s.total ? (
                <div className="diff-banner">
                  <div>
                    <div className="big">
                      Subscribe ประหยัดกว่า {formatBaht(Math.round(buyTotal - s.total))}
                    </div>
                    <div className="note">
                      ตลอด {Math.round(years)} ปี — ยังไม่รวมความเสี่ยงค่าซ่อมใหญ่หลังหมดประกัน ที่
                      Subscribe ครอบคลุมให้ฟรี
                    </div>
                  </div>
                </div>
              ) : (
                <div className="diff-banner" style={{ background: "#fff7ed", borderColor: "#fed7aa" }}>
                  <div>
                    <div className="big" style={{ color: "var(--orange)" }}>
                      ต่างกัน {formatBaht(Math.round(Math.abs(buyTotal - s.total)))}
                    </div>
                    <div className="note">
                      แลกกับติดตั้งฟรี ดูแลฟรี ซ่อม-อะไหล่ฟรี เปลี่ยนเครื่องใหม่ถ้าซ่อมไม่ได้
                      และไม่จ่ายเงินก้อนวันแรก — เทียบมูลค่าบริการแล้วมักคุ้มกว่า
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <p className="calc-disclaimer">
            * ตัวเลขฝั่ง &quot;ซื้อขาด&quot; เป็นค่าประมาณที่ปรับแก้ได้ตามราคาหน้าร้านจริง — ราคา
            Subscribe คำนวณจากแพ็กเกจจริง ยืนยันใบเสนอราคาทาง LINE
          </p>

          <div className="calc-panel center" style={{ marginTop: 18 }}>
            <h3>ตัวเลขตรงใจแล้วใช่ไหม?</h3>
            <p style={{ fontSize: 14 }}>ทักไลน์พร้อมชื่อรุ่น รับใบเสนอราคาจริงภายในวันเดียว</p>
            <a className="btn btn-line btn-lg mt-2" href={site.line} target="_blank" rel="noopener">
              <span className="line-dot">LINE</span> รับใบเสนอราคาทาง LINE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
