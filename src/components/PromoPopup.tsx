"use client";

import { useEffect, useState } from "react";

/** Bump the key when swapping in a new campaign so visitors see it again. */
const STORAGE_KEY = "promo-popup-birthday-aug2026";

/** Full-screen promo dialog shown once per visit on the homepage. */
export default function PromoPopup() {
  const [open, setOpen] = useState(false);

  // Only decide after mount — sessionStorage doesn't exist during SSR.
  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  if (!open) return null;
  return (
    <div
      className="promo-popup-overlay"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="โปรโมชันพิเศษ"
    >
      <div className="promo-popup" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="promo-popup-close" aria-label="ปิด" onClick={close}>
          ×
        </button>
        <img
          src="/images/promo/birthday-popup.jpg"
          alt="LG Birthday — ลดสูงสุด 15% ทุกรอบบิล 15-23 ส.ค. 69"
        />
      </div>
    </div>
  );
}
