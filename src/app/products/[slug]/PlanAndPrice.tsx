"use client";

import Link from "next/link";
import { useState } from "react";
import { cheapestPlanIndex, discountPct, effectivePrice, formatBaht } from "@/lib/pricing";
import type { Product, SiteConfig } from "@/lib/types";

interface PlanAndPriceProps {
  product: Product;
  /** Passed as a prop (not imported from catalog.ts) to keep the catalog JSON out of the client bundle. */
  site: SiteConfig;
}

/** Service-plan selector plus the price block that reflects the chosen plan. */
export default function PlanAndPrice({ product: p, site }: PlanAndPriceProps) {
  const plans = p.plans ?? [];
  const [planIdx, setPlanIdx] = useState(() => cheapestPlanIndex(p));

  const now = planIdx >= 0 && plans[planIdx] ? plans[planIdx].pricePerMonth : effectivePrice(p);
  const showWas = Boolean(p.monthlyPrice && p.monthlyPrice > now);
  const pct = discountPct(p);

  return (
    <>
      {plans.length > 0 && (
        <div className="opt-group">
          <h3>เลือกแผนบริการ</h3>
          <div className="opt-row">
            {plans.map((plan, i) => (
              <button
                key={`${plan.interval}-${plan.type}`}
                className={`opt${i === planIdx ? " active" : ""}`}
                onClick={() => setPlanIdx(i)}
              >
                <b>{plan.interval}</b>
                <small>{plan.type}</small>
                <small>
                  <b>{formatBaht(plan.pricePerMonth)}/ด.</b>
                </small>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="price-block">
        <div className="now">
          {formatBaht(now)} <small>/เดือน</small>
        </div>
        {showWas && (
          <div style={{ marginTop: 8 }}>
            <span className="was">{formatBaht(p.monthlyPrice)}/เดือน</span>
            {pct !== null && <span className="save-badge">ลด {pct}%</span>}
          </div>
        )}
        {p.promoLabel && <div className="promo-line">🔥 {p.promoLabel}</div>}
        {showWas && <div className="after-line">หลังโปรโมชัน {formatBaht(p.monthlyPrice)}/เดือน</div>}
        <div className="cta-col">
          <a className="btn btn-line btn-lg" href={site.line} target="_blank" rel="noopener">
            <span className="line-dot">LINE</span> สนใจ — สอบถามผ่าน LINE
          </a>
          <a className="btn btn-outline" href={site.phoneHref}>
            ☎ โทร {site.phone}
          </a>
          <Link className="btn btn-outline" href={`/calculator?slug=${encodeURIComponent(p.slug)}`}>
            🧮 เทียบราคากับซื้อขาด
          </Link>
          <div className="cta-note">ปรึกษาฟรี ไม่มีค่าใช้จ่าย ตอบทุกวัน</div>
        </div>
      </div>
    </>
  );
}
