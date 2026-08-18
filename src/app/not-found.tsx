import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "ไม่พบหน้าที่ค้นหา — LG Subscribe Thailand",
};

export default function NotFound() {
  return (
    <main>
      <section>
        <div className="container empty-state">
          <div style={{ fontSize: 64 }}>🔍</div>
          <h1 className="mt-2" style={{ fontSize: "clamp(22px,3vw,30px)" }}>
            ไม่พบหน้าที่คุณต้องการ
          </h1>
          <p className="mt-2">
            ลิงก์อาจถูกย้ายหรือพิมพ์ไม่ถูกต้อง — ลองเริ่มจากหน้าหลัก
            หรือดูสินค้าทั้งหมดได้เลย
          </p>
          <div
            className="mt-2"
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link className="btn btn-red" href="/">
              กลับหน้าหลัก
            </Link>
            <Link className="btn btn-outline" href="/products">
              ดูสินค้าทั้งหมด
            </Link>
            <a className="btn btn-line" href={site.line} target="_blank" rel="noopener">
              <img className="line-dot" src="/line-icon.svg" alt="" /> ถามทีมงาน
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
