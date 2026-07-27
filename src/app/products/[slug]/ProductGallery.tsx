"use client";

import { useRef, useState } from "react";

interface ProductGalleryProps {
  name: string;
  /** Resolved image URLs, in display order. */
  gallery: string[];
  fallbackEmoji: string;
  discountPct: number | null;
  featured: boolean;
}

/**
 * Main photo with prev/next arrows, position counter, thumbnail strip and
 * arrow-key navigation. With 0–1 images it collapses to a static photo.
 */
export default function ProductGallery({
  name,
  gallery,
  fallbackEmoji,
  discountPct,
  featured,
}: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const thumbsRef = useRef<HTMLDivElement>(null);
  const thumbButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);
  const multi = gallery.length > 1;

  function showImage(i: number) {
    const next = (i + gallery.length) % gallery.length; // wrap around both ends
    setIndex(next);
    // Keep the active thumb visible — scroll the strip only, never the page.
    const strip = thumbsRef.current;
    const active = thumbButtonRefs.current[next];
    if (strip && active) {
      const c = strip.getBoundingClientRect();
      const a = active.getBoundingClientRect();
      if (a.left < c.left) strip.scrollLeft -= c.left - a.left + 12;
      else if (a.right > c.right) strip.scrollLeft += a.right - c.right + 12;
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!multi) return;
    if (e.key === "ArrowLeft") {
      showImage(index - 1);
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      showImage(index + 1);
      e.preventDefault();
    }
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (!multi || touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    // Horizontal flick swaps the photo, like a native carousel.
    if (Math.abs(dx) > 40) showImage(index + (dx < 0 ? 1 : -1));
  }

  return (
    <div className="detail-gallery" tabIndex={multi ? 0 : undefined} onKeyDown={onKeyDown}>
      <div className="detail-main" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="detail-badges">
          {discountPct !== null && <span className="b">-{discountPct}%</span>}
          {featured && <span className="b orange">แนะนำ</span>}
        </div>
        {gallery.length === 0 || failed.has(index) ? (
          <div className="fallback">{fallbackEmoji}</div>
        ) : (
          <img
            src={gallery[index]}
            alt={name}
            // The main photo is the page's LCP element — fetch it first.
            fetchPriority="high"
            onError={() => setFailed((prev) => new Set(prev).add(index))}
          />
        )}
        {multi && (
          <>
            <button
              type="button"
              className="gallery-nav prev"
              aria-label="ภาพก่อนหน้า"
              onClick={() => showImage(index - 1)}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              className="gallery-nav next"
              aria-label="ภาพถัดไป"
              onClick={() => showImage(index + 1)}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
            <span className="gallery-counter">
              {index + 1} / {gallery.length}
            </span>
          </>
        )}
      </div>
      {multi && (
        <div className="detail-thumbs" ref={thumbsRef}>
          {gallery.map((src, i) => (
            <button
              key={src + i}
              type="button"
              className={`thumb${i === index ? " active" : ""}`}
              aria-label={`ภาพที่ ${i + 1}`}
              onClick={() => showImage(i)}
              ref={(el) => {
                thumbButtonRefs.current[i] = el;
              }}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
