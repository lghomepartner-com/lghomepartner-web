"use client";

import { useState } from "react";

interface ProductImageProps {
  /** One URL or an ordered list of candidates — the first that loads is shown. */
  src: string | Array<string | null | undefined>;
  alt: string;
  /** Emoji shown only when every candidate is missing or fails to load. */
  fallbackEmoji: string;
  loading?: "lazy" | "eager";
  id?: string;
}

/** <img> that falls through the candidate list on error; emoji only as a last resort. */
export default function ProductImage({ src, alt, fallbackEmoji, loading, id }: ProductImageProps) {
  const sources = [...new Set((Array.isArray(src) ? src : [src]).filter(Boolean))] as string[];
  const [attempt, setAttempt] = useState(0);
  if (attempt >= sources.length) return <div className="fallback">{fallbackEmoji}</div>;
  const current = sources[attempt];
  const skip = () => setAttempt((n) => (sources[n] === current ? n + 1 : n));
  return (
    <img
      id={id}
      src={current}
      alt={alt}
      loading={loading}
      onError={skip}
      // A 404 during initial HTML load fires before hydration attaches
      // onError — catch that case when the element mounts.
      ref={(el) => {
        if (el && el.complete && el.naturalWidth === 0) skip();
      }}
    />
  );
}
