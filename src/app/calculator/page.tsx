import type { Metadata } from "next";
import { Suspense } from "react";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "คำนวณเทียบราคา Subscribe vs ซื้อขาด — LG Subscribe Thailand",
  description:
    "เครื่องมือเปรียบเทียบค่าใช้จ่ายจริง — LG Subscribe รายเดือน เทียบกับซื้อขาด + ค่าดูแลเอง เห็นตัวเลขชัดทุกบาทตลอดสัญญา",
  alternates: { canonical: "/calculator/" },
};

export default function CalculatorPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="kicker">The closing tool</div>
          <h1>🧮 คำนวณเทียบราคา: Subscribe vs ซื้อขาด</h1>
          <p>
            เลือกสินค้า ใส่ราคาหน้าร้านที่ลูกค้าเจอมา —
            ระบบสรุปค่าใช้จ่ายจริงตลอดสัญญาให้เห็นชัดทุกบาท ทั้งสองทาง
          </p>
        </div>
      </div>
      <Suspense>
        <Calculator />
      </Suspense>
    </>
  );
}
