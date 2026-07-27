"use client";

import { useState } from "react";
import type { Faq, FaqTopic } from "@/lib/types";

type TabId = "all" | FaqTopic;

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "ทั้งหมด" },
  { id: "money", label: "💳 การเงิน / บัตร" },
  { id: "contract", label: "📄 สัญญา / การสมัคร" },
  { id: "service", label: "🛠 บริการ / ซ่อม" },
  { id: "product", label: "📦 สินค้า / ติดตั้ง" },
];

/** Topic tabs + expandable question list. */
export default function FaqBrowser({ faqs }: { faqs: Faq[] }) {
  const [active, setActive] = useState<TabId>("all");
  const list = faqs.filter((f) => active === "all" || f.cat === active);

  return (
    <>
      <div className="faq-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`filter-chip${active === t.id ? " active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>
        {list.map((f) => (
          <details className="faq-item" key={f.q}>
            <summary>
              <span>{f.icon ?? "❓"}</span> {f.q} <span className="chev">›</span>
            </summary>
            <div className="ans">{f.a}</div>
          </details>
        ))}
      </div>
    </>
  );
}
