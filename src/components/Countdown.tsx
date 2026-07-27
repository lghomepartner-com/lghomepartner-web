"use client";

import { useEffect, useState } from "react";

const UNITS = ["วัน", "ชม.", "นาที", "วินาที"] as const;

function remainingParts(): [number, number, number, number] {
  const now = new Date();
  // Promo runs to the end of the current month.
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
  let ms = Math.max(0, end.getTime() - now.getTime());
  const d = Math.floor(ms / 864e5);
  ms -= d * 864e5;
  const h = Math.floor(ms / 36e5);
  ms -= h * 36e5;
  const m = Math.floor(ms / 6e4);
  ms -= m * 6e4;
  const s = Math.floor(ms / 1e3);
  return [d, h, m, s];
}

/** Live countdown to the end of the month's promo. Starts ticking after mount. */
export default function Countdown() {
  // Fixed placeholder on the server render keeps hydration deterministic.
  const [parts, setParts] = useState<[number, number, number, number] | null>(null);

  useEffect(() => {
    const tick = () => setParts(remainingParts());
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown">
      {UNITS.map((unit, i) => (
        <div className="count-cell" key={unit}>
          <b>{parts ? String(parts[i]).padStart(2, "0") : "--"}</b>
          <span>{unit}</span>
        </div>
      ))}
    </div>
  );
}
