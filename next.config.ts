import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Frontend-only site: export static files (same deployment model as the
  // original hand-written HTML — any static host works, no Node server).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
