import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { site } from "@/lib/catalog";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL at build time so OG image URLs resolve to the real domain.
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: "LG Subscribe Thailand — เช่าเครื่องใช้ไฟฟ้า LG รายเดือน เริ่มต้น ฿149/เดือน",
  description:
    "เช่าเครื่องใช้ไฟฟ้า LG แบบรายเดือน ไม่ล็อกวงเงินบัตรเครดิต ติดตั้งฟรี ดูแลซ่อมบำรุงฟรีตลอดสัญญา ประกัน 5–7 ปี ปรึกษาฟรีทาง LINE",
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "LG Subscribe Thailand",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={notoSansThai.className}>
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
