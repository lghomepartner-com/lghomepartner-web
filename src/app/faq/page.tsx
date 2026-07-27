import type { Metadata } from "next";
import { faqs, site } from "@/lib/catalog";
import FaqBrowser from "./FaqBrowser";

export const metadata: Metadata = {
  title: "ถาม–ตอบ & ปิดทุกข้อสงสัย — LG Subscribe Thailand",
  description:
    "รวมคำตอบข้อสงสัยยอดฮิต — หมดสัญญาเครื่องเป็นของใคร ไม่มีบัตรเครดิตสมัครได้ไหม ย้ายบ้านทำยังไง เครื่องเสียใครซ่อม — ตอบชัดทุกข้อ",
};

export default function FaqPage() {
  const objections = faqs.filter((f) => f.closing);

  return (
    <main>
      <div className="page-head">
        <div className="container">
          <div className="kicker">Handling objections</div>
          <h1>❓ ถาม–ตอบ ปิดทุกข้อสงสัย</h1>
          <p>คำถามที่ลูกค้าถามบ่อยที่สุด พร้อมคำตอบสั้น ชัด ตรงประเด็น — โชว์ให้ลูกค้าดูได้ทันที</p>
        </div>
      </div>

      <section style={{ paddingTop: 36 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Top 6 · ตอบใน 10 วินาที</div>
              <h2>ข้อกังวลยอดฮิต</h2>
            </div>
          </div>
          <div className="objection-grid">
            {objections.map((f) => (
              <div className="objection-card" key={f.q}>
                <div className="em">{f.icon ?? "❓"}</div>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">All questions</div>
              <h2>คำถามทั้งหมด</h2>
            </div>
          </div>
          <FaqBrowser faqs={faqs} />
          <div className="calc-panel center" style={{ marginTop: 26 }}>
            <h3>ยังมีคำถามเฉพาะเคสของคุณ?</h3>
            <p style={{ fontSize: 14 }}>
              ทักไลน์ถามได้เลย ทีมงานตอบทุกวัน — ปรึกษาฟรี ไม่มีข้อผูกมัด
            </p>
            <a className="btn btn-line btn-lg mt-2" href={site.line} target="_blank" rel="noopener">
              <span className="line-dot">LINE</span> ถามทาง LINE เลย
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
