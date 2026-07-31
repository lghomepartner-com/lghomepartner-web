import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogBrowser from "./CatalogBrowser";

export const metadata: Metadata = {
  title: "สินค้าทั้งหมด — LG Subscribe Thailand",
  description:
    "เลือกดูเครื่องใช้ไฟฟ้า LG ให้เช่ารายเดือนกว่า 70 รุ่น 16 หมวด — แอร์ ตู้เย็น เครื่องซักผ้า ทีวี และอื่นๆ ติดตั้งฟรี ดูแลตลอดสัญญา",
  alternates: { canonical: "/products/" },
};

export default function ProductsPage() {
  return (
    <Suspense>
      <CatalogBrowser />
    </Suspense>
  );
}
