"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { SiteConfig } from "@/lib/types";

const NAV_ITEMS = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/products", label: "สินค้าทั้งหมด" },
  { href: "/calculator", label: "คำนวณเทียบราคา" },
  { href: "/careship", label: "Care service" },
  { href: "/faq", label: "ถาม–ตอบ" },
];

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

// `site` comes in as a prop (not imported from catalog.ts) so this client
// component doesn't pull the whole product JSON into every page's JS bundle.
export default function SiteHeader({ site }: { site: SiteConfig }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="promo-bar">
        🔥 ลด 50% 6 เดือนแรก — แอร์เริ่มต้น ฿299/เดือน · ติดตั้งฟรีทุกสินค้า{" "}
        <Link href="/products">ดูสินค้าทั้งหมด →</Link>
      </div>
      <div className="container inner">
        <Link className="logo" href="/" aria-label="LG Subscribe">
          <img src="/logo.svg" alt="LG Subscribe" className="logo-img" />
        </Link>
        <nav className="main-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(pathname, item.href) ? "active" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          className="btn btn-line btn-sm header-line-btn"
          href={site.line}
          target="_blank"
          rel="noopener"
        >
          <span className="line-dot">LINE</span> ปรึกษาฟรี
        </a>
        <button
          className="hamburger"
          aria-label="เมนู"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <nav className={`mobile-nav${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.href === "/calculator" ? `🧮 ${item.label}` : item.label}
          </Link>
        ))}
        <a href={site.phoneHref}>☎ {site.phone}</a>
      </nav>
    </header>
  );
}
