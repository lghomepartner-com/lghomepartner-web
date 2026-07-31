import type { Metadata } from "next";
import Link from "next/link";
import { categories, categoryImage, featuredProducts, imageSrc, reviews, site } from "@/lib/catalog";
import Countdown from "@/components/Countdown";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const USPS = [
  { ico: "✓", title: "ไม่ล็อกวงเงินบัตร", text: "ตัดบัตรเฉพาะยอดรายเดือน วงเงินที่เหลือใช้ต่อได้ตามปกติ" },
  { ico: "🛠", title: "ดูแลครบจบ", text: "ล้าง ซ่อม เปลี่ยนอะไหล่ ฟรีตลอดสัญญา โดยทีมช่าง LG" },
  { ico: "📅", title: "จ่ายเท่าเดิมทุกเดือน", text: "ค่าใช้จ่ายคงที่ วางแผนการเงินได้ ไม่มีค่าใช้จ่ายแอบแฝง" },
  { ico: "🏠", title: "ครบทั้งบ้าน", text: "แอร์ ตู้เย็น เครื่องซักผ้า ทีวี และอีกกว่า 70 รุ่นให้เลือก" },
];

const STEPS = [
  { num: "01", title: "ทักไลน์ บอกรุ่นที่สนใจ", text: "แจ้งสินค้า ขนาด และพื้นที่ใช้งาน ทีมงานตอบทุกวัน" },
  { num: "02", title: "รับใบเสนอราคาชัดเจน", text: "ราคารายเดือนตรงไปตรงมา ไม่มีค่าใช้จ่ายแอบแฝง" },
  { num: "03", title: "ยืนยันด้วยบัตรเครดิต", text: "ตัดเฉพาะยอดรายเดือน ไม่ล็อกวงเงินก้อนใหญ่" },
  { num: "04", title: "ช่าง LG ติดตั้งฟรีถึงบ้าน", text: "นัดวันติดตั้งที่คุณสะดวก พร้อมใช้งานทันที" },
];

const WHY_ITEMS = [
  { ico: "🛡️", title: "ประกันยาว 5–7 ปี", text: "ครอบคลุมทุกชิ้นส่วน นานกว่าซื้อขาดหลายเท่า" },
  { ico: "🔧", title: "ซ่อมฟรีตลอดสัญญา", text: "ทีม LG Care Service เข้าดูแลถึงบ้าน ไม่มีค่าซ่อม ค่าอะไหล่" },
  { ico: "💳", title: "ไม่ล็อกวงเงินบัตร", text: "ตัดแค่ยอดรายเดือน ต่างจากการผ่อนที่ล็อกวงเงินเต็มจำนวน" },
  { ico: "📦", title: "เครื่องใหม่ 100%", text: "ส่งตรงจาก LG Electronics Thailand ทุกเครื่อง" },
  { ico: "🏡", title: "ติดตั้งฟรีถึงบ้าน", text: "ช่าง LG มาตรฐานโรงงาน ติดตั้งเรียบร้อยพร้อมใช้" },
  { ico: "🔄", title: "เสียแล้วซ่อมไม่ได้ เปลี่ยนใหม่", text: "หากซ่อมไม่ได้ เปลี่ยนเครื่องใหม่ให้ฟรีตามเงื่อนไขสัญญา" },
];

const TRUST_BADGES = [
  { em: "🏅", text: "ตัวแทนทางการ · Dealer F217023" },
  { em: "🛡️", text: "ประกันศูนย์ LG 5–7 ปี" },
  { em: "📦", text: "เครื่องใหม่ 100% จาก LG Thailand" },
  { em: "🔧", text: "ดูแลโดยทีมช่าง LG Care Service" },
  { em: "💳", text: "ไม่ล็อกวงเงินบัตรเครดิต" },
];

const PAYMENTS = [
  { ico: "💳", title: "บัตรเครดิต", text: "ตัดรายเดือนอัตโนมัติ ไม่ล็อกวงเงินก้อนใหญ่" },
  { ico: "🏦", title: "บัตรเดบิต", text: "ตัดตรงจากบัญชีธนาคารของคุณทุกเดือน" },
  { ico: "🏢", title: "องค์กร / นิติบุคคล", text: "รองรับบริษัทและสำนักงาน ออกเอกสารครบถ้วน" },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero-video">
        <div className="hv-bg" aria-hidden="true">
          <iframe
            src="https://www.youtube-nocookie.com/embed/HmArynscjAA?autoplay=1&mute=1&controls=0&loop=1&playlist=HmArynscjAA&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1"
            title="LG Subscribe : วิธีที่ฉลาดกว่าในการเป็นเจ้าของเครื่องใช้ไฟฟ้า"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
        </div>
        <div className="hv-veil" aria-hidden="true" />
        <div className="container hv-content">
          <div className="hv-badge">✓ ตัวแทนจำหน่ายอย่างเป็นทางการ · Dealer F217023</div>
          <h1>
            เช่าเครื่องใช้ไฟฟ้า LG รายเดือน
            <span>เริ่ม ฿149/เดือน · ไม่ล็อกวงเงินบัตรเครดิต</span>
          </h1>
          <p className="hv-lead">
            เครื่องใหม่ 100% ส่งตรงจาก LG Thailand ติดตั้งฟรีถึงบ้าน
            พร้อมทีมช่าง LG ดูแล ล้าง ซ่อม อะไหล่ฟรีตลอดสัญญา
          </p>
          <div className="hv-ctas">
            <a className="btn btn-line btn-lg" href={site.line} target="_blank" rel="noopener">
              <span className="line-dot">LINE</span> สมัครผ่าน LINE — ปรึกษาฟรี
            </a>
            <Link className="btn btn-ghost btn-lg" href="/products">ดูสินค้า + ราคาทั้งหมด</Link>
            <a className="hv-phone" href={site.phoneHref}>☎ {site.phone}</a>
          </div>
          <div className="hv-trust">
            <span className="hv-chip">
              <span className="star">★</span> {reviews.rating} · {reviews.count} รีวิวจากลูกค้าจริง
            </span>
            {["ติดตั้งฟรี", "ล้าง ซ่อม อะไหล่ฟรี", "ประกัน 5–7 ปี", "เครื่องใหม่ 100%"].map((t) => (
              <span className="hv-chip" key={t}>✓ {t}</span>
            ))}
          </div>
        </div>
        <div className="hv-scroll" aria-hidden="true">เลื่อนดูเพิ่มเติม ↓</div>
      </section>

      <section style={{ padding: "28px 0 0" }}>
        <div className="container badge-strip">
          {TRUST_BADGES.map((b) => (
            <span className="trust-badge" key={b.text}>
              <span className="em">{b.em}</span> {b.text}
            </span>
          ))}
        </div>
        <div className="container">
          <div className="warning-note">
            <b>⚠ โปรดระวังมิจฉาชีพ</b> — ติดต่อผ่านช่องทางทางการของเราเท่านั้น · {site.dealer}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 36, paddingBottom: 0 }}>
        <div className="container usp-grid">
          {USPS.map((u) => (
            <div className="usp" key={u.title}>
              <div className="ico">{u.ico}</div>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Popular this month</div>
              <h2>สินค้าแนะนำ</h2>
            </div>
            <Link className="see-all" href="/products">ดูทั้งหมด →</Link>
          </div>
          <div className="product-grid">
            {featuredProducts().map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">ครบทั้งบ้าน</div>
              <h2>เลือกหมวดสินค้า</h2>
            </div>
            <Link className="see-all" href="/products">ดูทั้งหมด →</Link>
          </div>
          <div className="cat-grid">
            {categories.map((c) => {
              const photo = categoryImage(c.slug);
              return (
                <Link className="cat-tile" href={`/products?category=${c.slug}`} key={c.slug}>
                  {photo ? (
                    <div className="ph">
                      <img src={imageSrc(photo)} alt={c.nameTh} loading="lazy" />
                    </div>
                  ) : (
                    <div className="em">{c.emoji}</div>
                  )}
                  <div className="nm">{c.nameTh}</div>
                  <div className="ct">{c.productCount} รุ่น</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="alt" id="how">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">4 ขั้นตอน</div>
              <h2>สมัคร Subscribe ง่ายๆ แค่ 4 ขั้นตอน</h2>
            </div>
          </div>
          <div className="steps-grid">
            {STEPS.map((s) => (
              <div className="step" key={s.num}>
                <div className="num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Why us</div>
              <h2>ทำไมต้อง LG Subscribe?</h2>
            </div>
          </div>
          <div className="why-grid">
            {WHY_ITEMS.map((w) => (
              <div className="why-item" key={w.title}>
                <div className="ico">{w.ico}</div>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Customer voices</div>
              <h2>เสียงจากลูกค้าจริง</h2>
              <div className="rating-summary">
                <span className="stars">★★★★★</span> {reviews.rating} · {reviews.count}{" "}
                รีวิวจากลูกค้าจริง
              </div>
            </div>
            <a className="see-all" href={site.line} target="_blank" rel="noopener">
              สอบถามเพิ่มเติมทาง LINE →
            </a>
          </div>
          <div className="review-grid">
            {reviews.items.map((r) => (
              <div className="review-card" key={r.name}>
                <div className="head">
                  <div className="avatar">{r.name.replace("คุณ", "").charAt(0)}</div>
                  <div>
                    <div className="who">
                      {r.name} <span className="verified">✓ ลูกค้าจริง</span>
                    </div>
                    <div className="meta">
                      {r.when} · รีวิวผ่าน {r.via}
                    </div>
                  </div>
                </div>
                <p>“{r.text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Payment</div>
              <h2>รองรับการชำระเงินหลายรูปแบบ</h2>
            </div>
          </div>
          <div className="pay-grid">
            {PAYMENTS.map((p) => (
              <div className="pay-card" key={p.title}>
                <div className="ico">{p.ico}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container count-wrap">
          <div className="kicker">โปรเดือนนี้</div>
          <h2 style={{ fontSize: "clamp(24px,3vw,34px)", marginTop: 6 }}>
            โปรลด 50% สิ้นสุดในอีก…
          </h2>
          <p style={{ marginTop: 8 }}>ตัดบัตรเครดิตเฉพาะรายเดือน · ติดตั้งฟรี · ดูแลตลอดสัญญา</p>
          <Countdown />
        </div>
      </section>

      <section id="contact" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <div className="kicker" style={{ color: "#fbd5e2" }}>
              คุยกับเราเลย · ปรึกษาฟรี
            </div>
            <h2>พร้อมเริ่มใช้เครื่องใหม่ โดยไม่ต้องจ่ายก้อนใหญ่?</h2>
            <p>
              ทักไลน์บอกรุ่นที่สนใจ ทีมงานคำนวณราคาและแนะนำแพ็กเกจที่คุ้มที่สุดสำหรับบ้านคุณ
              — ปรึกษาฟรี ไม่มีข้อผูกมัด
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a className="btn btn-line btn-lg" href={site.line} target="_blank" rel="noopener">
                <span className="line-dot">LINE</span> สมัครผ่าน LINE
              </a>
              <a className="btn btn-outline btn-lg" href={site.phoneHref}>
                ☎ {site.phone}
              </a>
            </div>
            <p style={{ marginTop: 22, marginBottom: 0, fontSize: "13.5px" }}>
              หรือ{" "}
              <Link href="/products" style={{ textDecoration: "underline", color: "#fff" }}>
                ดูสินค้าก่อน →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
