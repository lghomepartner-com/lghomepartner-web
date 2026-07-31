import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { site } from "@/lib/catalog";
import { siteUrl } from "@/lib/site-url";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL at build time so absolute URLs resolve to the real domain.
  metadataBase: new URL(siteUrl),
  title: "LG Subscribe Thailand — เช่าเครื่องใช้ไฟฟ้า LG รายเดือน เริ่มต้น ฿149/เดือน",
  description:
    "เช่าเครื่องใช้ไฟฟ้า LG แบบรายเดือน ไม่ล็อกวงเงินบัตรเครดิต ติดตั้งฟรี ดูแลซ่อมบำรุงฟรีตลอดสัญญา ประกัน 5–7 ปี ปรึกษาฟรีทาง LINE",
  keywords: [
    "เช่าเครื่องใช้ไฟฟ้า",
    "LG Subscribe",
    "เช่าแอร์รายเดือน",
    "เช่าตู้เย็น",
    "เช่าเครื่องซักผ้า",
    "เครื่องใช้ไฟฟ้ารายเดือน",
    "LG Thailand",
  ],
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "LG Subscribe Thailand",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

// Organization info for search engines: name, logo, phone, and official
// social profiles (LINE OA, Facebook, Instagram).
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  telephone: site.phone,
  sameAs: [site.facebook, site.instagram, site.line],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={notoSansThai.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader site={site} />
        {children}
        <SiteFooter />
        <a
          className="float-line"
          href={site.line}
          target="_blank"
          rel="noopener"
          aria-label="ปรึกษาทาง LINE"
        >
          LINE
        </a>
      </body>
    </html>
  );
}
