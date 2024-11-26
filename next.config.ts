import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  experimental: {
    optimizeFonts: true, // Next.js에서 폰트 최적화를 활성화
  },
};

export default nextConfig;
