import Link from "next/link";
import { categories, site } from "@/lib/catalog";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="logo" href="/" style={{ marginBottom: 14 }} aria-label="LG Subscribe">
              <img src="/logo.svg" alt="LG Subscribe" className="logo-img footer-logo-img" />
            </Link>
            <p style={{ marginTop: 12 }}>{site.tagline}</p>
            <p style={{ marginTop: 10, fontSize: "12.5px", color: "#9ca3af" }}>{site.dealer}</p>
          </div>
          <div>
            <h4>หมวดสินค้ายอดนิยม</h4>
            {categories.slice(0, 8).map((c) => (
              <Link key={c.slug} href={`/products?category=${c.slug}`}>
                {c.nameTh}
              </Link>
            ))}
          </div>
          <div>
            <h4>เมนู</h4>
            <Link href="/">หน้าหลัก</Link>
            <Link href="/products">สินค้าทั้งหมด</Link>
            <Link href="/calculator">คำนวณเทียบราคา</Link>
            <Link href="/careship">LG Care Service</Link>
            <Link href="/faq">ถาม–ตอบ</Link>
          </div>
          <div>
            <h4>ติดต่อเรา</h4>
            <a href={site.line} target="_blank" rel="noopener">
              <img className="line-ico-sm" src="/line-icon.svg" alt="" /> LINE Official {site.lineId}
            </a>
            <span className="footer-phones">
              ☎ <a href={site.phoneHref}>{site.phone}</a>
              {site.phone2 && (
                <>
                  {" "},
                  <br />
                  <a href={site.phone2Href}>{site.phone2}</a>
                </>
              )}
            </span>
            <a href={site.facebook} target="_blank" rel="noopener">
              <img className="line-ico-sm" src="/facebook-icon.svg" alt="" /> Facebook
            </a>
            <a href={site.instagram} target="_blank" rel="noopener">
              <img className="line-ico-sm" src="/instagram-icon.svg" alt="" /> Instagram
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 LG Subscribe Thailand — ตัวแทนจำหน่ายอย่างเป็นทางการ</span>
          <span>โปรดติดต่อผ่านช่องทางทางการของเราเท่านั้น</span>
        </div>
      </div>
    </footer>
  );
}
