import type { Metadata } from "next";
import { nonEmptyCategories, productsInCategory, site } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "บริการ LG Care Service — ดูแล ล้าง ซ่อม อะไหล่ฟรีตลอดสัญญา — LG Subscribe Thailand",
  description:
    "ทีมช่าง LG Care Service เข้าดูแลถึงบ้านตามรอบ ล้างฟรี ซ่อมฟรี อะไหล่ฟรี เปลี่ยนเครื่องใหม่ถ้าซ่อมไม่ได้ — รวมในค่ารายเดือนแล้วทั้งหมด",
  alternates: { canonical: "/careship/" },
};

const FREE_SERVICES = [
  {
    em: "🧼",
    title: "ล้าง + บำรุงรักษาตามรอบ",
    text: "ช่างเข้าบ้านตามรอบแผนที่เลือก ล้างใหญ่ ตรวจเช็คครบระบบ",
    tag: "ฟรีตลอดสัญญา",
  },
  {
    em: "🛠",
    title: "ซ่อมทุกอาการ",
    text: "เครื่องมีปัญหา ทักไลน์แจ้งได้เลย เราประสานช่างให้ ไม่มีค่าแรง",
    tag: "ฟรีตลอดสัญญา",
  },
  {
    em: "⚙️",
    title: "อะไหล่ + ไส้กรองแท้",
    text: "อะไหล่แท้จากศูนย์ LG รวมไส้กรอง แผ่นกรอง น้ำยา ไม่ต้องซื้อเอง",
    tag: "ฟรีตลอดสัญญา",
  },
  {
    em: "🔄",
    title: "เปลี่ยนเครื่องใหม่",
    text: "ถ้าเสียจนซ่อมไม่ได้ เปลี่ยนเครื่องใหม่ให้ตามเงื่อนไขสัญญา",
    tag: "ฟรี ไม่มีเงื่อนไขแอบแฝง",
  },
];

const TIMELINE = [
  { yr: "วันแรก", what: "ติดตั้งฟรีโดยช่าง LG พร้อมใช้งานทันที" },
  { yr: "เดือนที่ 6", what: "ล้างใหญ่ + ตรวจเช็คระบบครั้งที่ 1" },
  { yr: "เดือนที่ 12", what: "ล้างใหญ่ + เปลี่ยนไส้กรอง/อะไหล่ตามรอบ" },
  { yr: "ปีที่ 2–4", what: "ดูแลต่อเนื่องทุกรอบ ซ่อมฟรีเมื่อมีอาการ" },
  { yr: "ปีที่ 5", what: "ดูแลจนวันสุดท้ายของสัญญา" },
  { yr: "ครบสัญญา", what: "เลือกได้: เปลี่ยนรุ่นใหม่ / ซื้อต่อราคาพิเศษ / คืนเครื่อง" },
];

/** Most frequent value among a category's products, e.g. the typical service interval. */
function mostCommon(values: string[]): string {
  const counts = new Map<string, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  let top = "-";
  let topCount = 0;
  for (const [v, count] of counts) {
    if (count > topCount) {
      top = v;
      topCount = count;
    }
  }
  return top;
}

export default function CareshipPage() {
  const scheduleRows = nonEmptyCategories().map((c) => {
    const prods = productsInCategory(c.slug);
    return {
      category: c,
      interval: mostCommon(prods.map((p) => p.serviceInterval).filter(Boolean)),
      warranty: mostCommon(prods.map((p) => p.warranty).filter(Boolean)),
    };
  });

  return (
    <main>
      <div className="svc-hero">
        <div className="container">
          <div className="kicker">After-sales peace of mind</div>
          <h1>LG Care Service — จ่ายรายเดือนจบ ที่เหลือเรื่องของเรา</h1>
          <p>
            ทุกแพ็กเกจ Subscribe รวมบริการดูแลถึงบ้านโดยทีมช่าง LG ไว้แล้ว ไม่มีค่าเดินทาง
            ไม่มีค่าแรง ไม่มีค่าอะไหล่ — ตลอดอายุสัญญา
          </p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="section-head" style={{ justifyContent: "center", textAlign: "center" }}>
            <div>
              <div className="kicker">Watch</div>
              <h2>รู้จักบริการดูแลจาก LG ใน 1 นาที</h2>
            </div>
          </div>
          <div className="video-wrap">
            <iframe
              src="https://www.youtube-nocookie.com/embed/L40MmCb1uDE"
              title="LG Subscribe : การดูแลเครื่องใช้ไฟฟ้าจะไม่ใช่เรื่องยุ่งยากอีกต่อไป"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">รวมในค่ารายเดือนแล้ว</div>
              <h2>4 บริการหลัก ฟรีทั้งหมด</h2>
            </div>
          </div>
          <div className="free-grid">
            {FREE_SERVICES.map((sv) => (
              <div className="free-card" key={sv.title}>
                <div className="em">{sv.em}</div>
                <h3>{sv.title}</h3>
                <p>{sv.text}</p>
                <span className="free-tag">{sv.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Service schedule</div>
              <h2>รอบดูแลของแต่ละหมวดสินค้า</h2>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="svc-table">
              <thead>
                <tr>
                  <th>หมวดสินค้า</th>
                  <th>รอบเข้าดูแล</th>
                  <th>ประกัน</th>
                  <th>ค่าซ่อม / อะไหล่</th>
                </tr>
              </thead>
              <tbody>
                {scheduleRows.map((r) => (
                  <tr key={r.category.slug}>
                    <td>{r.category.nameTh}</td>
                    <td>
                      <span className="pill">{r.interval}</span>
                    </td>
                    <td>{r.warranty}</td>
                    <td>ฟรีตลอดสัญญา</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 12 }}>
            * แอร์และเครื่องกรองน้ำเลือกแผนดูแลถี่ขึ้น (ทุก 6 เดือน) ได้
            เพราะใช้งานต่อเนื่องและมีไส้กรองต้องเปลี่ยนบ่อย — รอบจริงของแต่ละรุ่นแสดงบนหน้าสินค้า
          </p>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">ตัวอย่างสัญญา 5 ปี (แผนดูแลทุก 6 เดือน)</div>
              <h2>เส้นทางการดูแลตลอดสัญญา</h2>
            </div>
          </div>
          <div className="timeline">
            {TIMELINE.map((t) => (
              <div className="tl-cell" key={t.yr}>
                <div className="yr">{t.yr}</div>
                <div className="what">{t.what}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Visit vs Self</div>
              <h2>เลือก package การบริการ</h2>
            </div>
          </div>
          <div className="pay-grid" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
            <div className="pay-card">
              <img className="card-photo" src="/images/careship/visit-service.png" alt="ช่าง LG เข้าดูแลเครื่องใช้ไฟฟ้าถึงบ้าน" />
              <h3>Visit Service — ช่างเข้าบ้าน</h3>
              <p>
                ช่างผู้เชี่ยวชาญ LG เข้าดูแลถึงบ้านตามรอบ ล้าง ตรวจเช็ค เปลี่ยนอะไหล่ให้ครบ
                จบในที่เดียว
              </p>
            </div>
            <div className="pay-card">
              <img className="card-photo" src="/images/careship/self-service.jpg" alt="LG จัดส่งอะไหล่และไส้กรองถึงบ้าน" />
              <h3>Self Service — ส่งอะไหล่ถึงบ้าน</h3>
              <p>
                LG จัดส่งไส้กรอง อะไหล่ และน้ำยาแท้ถึงบ้านพร้อมคู่มือ
                เหมาะกับคนสะดวกดูแลเองตามรอบ
              </p>
            </div>
          </div>
          <p className="center" style={{ marginTop: 18, fontSize: 14 }}>
            ทั้งสองแบบ<b style={{ color: "var(--green)" }}>รวมอยู่ในค่ารายเดือนแล้ว</b> —
            เลือกแผนได้ตอนสมัคร
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-band">
            <div className="kicker" style={{ color: "#fbd5e2" }}>
              นัดหมาย · แจ้งซ่อม · สอบถามรอบบริการ
            </div>
            <h2>เรื่องดูแลเครื่อง ทักเรามาได้ทุกวัน</h2>
            <p>
              ลูกค้าปัจจุบันแจ้งซ่อม-นัดล้างผ่านไลน์ได้เลย
              ลูกค้าใหม่สอบถามแผนดูแลของรุ่นที่สนใจได้ฟรี
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a className="btn btn-line btn-lg" href={site.line} target="_blank" rel="noopener">
                <img className="line-dot" src="/line-icon.svg" alt="" /> ทักไลน์ LG Care Service
              </a>
              <a className="btn btn-outline btn-lg" href={site.phoneHref}>
                ☎ {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
