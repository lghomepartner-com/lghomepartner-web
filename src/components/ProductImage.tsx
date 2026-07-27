"use client";

import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  /** Emoji shown when the image is missing or fails to load. */
  fallbackEmoji: string;
  loading?: "lazy" | "eager";
  id?: string;
}

/** <img> that degrades to the category emoji when the file is missing. */
export default function ProductImage({ src, alt, fallbackEmoji, loading, id }: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className="fallback">{fallbackEmoji}</div>;
  return <img id={id} src={src} alt={alt} loading={loading} onError={() => setFailed(true)} />;
}
