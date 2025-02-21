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

// import dotenv from "dotenv";
// dotenv.config();

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     optimizeFonts: true, // Next.js에서 폰트 최적화 활성화
//   },
//   env: {
//     API_KEY: String(process.env.API_KEY), // 환경 변수 로드
//   },
// };

// module.exports = nextConfig;
